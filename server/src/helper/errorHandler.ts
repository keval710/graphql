import { GraphQLError } from "graphql"

export const errorType = {
    BAD_REQUEST: {
        statusCode: 400,
        message: "Bad Request"
    },
    UNAUTHORIZED: {
        statusCode: 401,
        message: "Unauthorized"
    },
    NOT_FOUND: {
        statusCode: 404,
        message: "Not Found"
    },
    INTERNAL_SERVER_ERROR: {
        statusCode: 500,
        message: "Internal Server Error"
    },
    FORBIDDEN: {
        statusCode: 403,
        message: "Forbidden"
    },
    FAILED_CREATE: {
        statusCode: 400,
        message: "Failed to create"
    },
    FAILED_FETCH: {
        statusCode: 400,
        message: "Failed to fetch"
    },
    INVALID_INPUT: {
        statusCode: 400,
        message: "Invalid input"
    }
}

interface ErrorType {
    statusCode: number,
    message: string
}

export default (errorMessage: string, errorType: ErrorType) => {
    throw new GraphQLError(errorMessage, {
        extensions: {
            code: errorType,
            http: {
                status: errorType.statusCode
            }
        }
    })
}