import gql from "graphql-tag";


export const userTypeDefs = gql`
  type User {
  """
  Description for field Supports multi-line description
  """
  id: ID!
  name: String!
  userName: String!
  email: String!
  todos: [Todo]!
}

type DeleteResponse {
  message: String!
}

type Query {
  getAllUsers: [User!]!
  getUserById(id: ID!): User
}

type Mutation {
  createUser(name: String!, email: String!): User
  deleteUser(id: ID!): DeleteResponse
}
`;
