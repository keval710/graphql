import mongoose from "mongoose"
import env from "dotenv"

env.config();

mongoose.connect(process.env.DB_URL as string)
    .then(() => console.log("DB connected"))
    .catch((error) => {
        if (error)
            throw new Error(error)
    })