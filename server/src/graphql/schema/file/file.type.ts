import gql from "graphql-tag";

export const fileType = gql`
scalar Upload

type ResponseMessage {
    message: String!
    fileName: String!
}
type Mutation {
    uploadFile(file: Upload!): ResponseMessage
}
`;