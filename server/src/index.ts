import express, { RequestHandler } from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import { schema } from './graphql/schema';
import throwError, { errorType } from './helper/errorHandler';
import './connection/conn';
import { ApolloServerErrorCode } from '@apollo/server/errors';
import { graphqlUploadExpress } from "graphql-upload-ts";

// Initialize Express
const app = express();
app.use("/files", express.static("files"));

// Create Apollo Server with context
const server = new ApolloServer<{}>({
    schema,
    csrfPrevention: false,
    formatError: (formattedError, error) => {
        // Return a different error message
        if (formattedError?.extensions?.code === ApolloServerErrorCode.BAD_REQUEST) {
            return {
                ...formattedError,
                message: "Your query doesn't match the schema. Try double-checking it!",
            };
        }
        return formattedError;
    },
    validationRules: []
});

// Middleware setup
app.use(express.json());
app.use(cors());

// Ensure the file upload middleware runs before Apollo Server middleware
app.use(graphqlUploadExpress());

const getUserFromReq = async (req: any) => {
    return req.headers.authorization ?? false;
}

// Start Apollo Server
async function startServer() {
    await server.start();

    // Apollo Server middleware with typed context
    app.use('/graphql', expressMiddleware(server, {
        context: async ({ req }) => {
            const user = await getUserFromReq(req);
            if (!user) {
                throw throwError('User is not authenticated', errorType.UNAUTHORIZED);
            }
            return { user };
        },
    }) as unknown as RequestHandler);

    // Start the Express server
    app.listen(4000, () => console.log("Server started on port 4000"));
}

startServer();
