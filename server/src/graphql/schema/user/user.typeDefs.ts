import gql from "graphql-tag";


export const userTypeDefs = gql`
  type User {
  id: ID!
  name: String!
  userName: String!
  email: String!
  todos: [Todo]!
}

type Query {
  getAllUsers: [User!]!
  getUserById(id: ID!): User
}

type Mutation {
  createUser(name: String!, email: String!): User
}
`;
