import { randomBytes } from "crypto";
import {
    createWriteStream,
    existsSync,
    mkdirSync,
    readdirSync,
    unlink,
} from "fs";
import { GraphQLUpload } from "graphql-upload-ts";
import path from "path";

export const fileResolver = {
    Upload: GraphQLUpload,
    Query: {
        getFileUrls: async () => {
            if (existsSync("files")) {
                const files = readdirSync("files");
                const urls = files.map((n) => `http://localhost:4000/files/${n}`);
                return {
                    urls
                }
            } else {
                return {
                    urls: []
                }
            };
        }
    },
    Mutation: {
        uploadFile: async (_: any, { file }: any) => {
            try {
                const { createReadStream, filename } = await file;
                const fileStream = createReadStream();
                const uploadPath = "files";
                const uploadFileName = `${randomBytes(6).toString("hex")}_${filename}`;
                const uploadFileUrl = path.join(uploadPath, uploadFileName);
                mkdirSync(uploadPath, { recursive: true });
                const output = createWriteStream(uploadFileUrl);
                fileStream.pipe(output);
                fileStream.on("error", (error: any) => output.destroy(error));
                await new Promise(function (resolve, reject) {
                    output.on("close", () => {
                        console.log("File uploaded");
                        resolve(() => { });
                    });
                    output.on("error", (err) => {
                        console.log(err);
                        unlink(uploadFileUrl, () => {
                            reject(err);
                        });
                    });
                });
                return {
                    message: 'File Uploaded Successfully',
                    fileName: filename
                }
            } catch (error) {
                throw new Error('Failed to upload file');
            }
        }
    }
}