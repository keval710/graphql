import express, { RequestHandler } from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import { schema } from './graphql/schema';
import throwError, { errorType } from './helper/errorHandler';
import './connection/conn';
import { ApolloServerErrorCode } from '@apollo/server/errors';

// Initialize Express
const app = express();

// Create Apollo Server with context
const server = new ApolloServer<{}>({
    schema,
    formatError: (formattedError, error) => {
        // Return a different error message
        if (formattedError?.extensions?.code === ApolloServerErrorCode.BAD_REQUEST) {
            return {
                ...formattedError,
                message: "Your query doesn't match the schema. Try double-checking it!",
            };
        }
        // console.log('formattedError............', formattedError)

        // Otherwise return the formatted error. This error can also
        // be manipulated in other ways, as long as it's returned.
        return formattedError;
    },
    validationRules: []
});

// Middleware setup
app.use(express.json());
app.use(cors());

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
