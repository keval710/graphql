import { gql } from 'graphql-tag';

export const todoTypeDefs = gql`
  type Todo {
    id: ID!
    title: String!
    completed: Boolean
    user: User
  }

  type DeleteTodoResponse {
    message: String!
  }

  type Query {
    getAllTodos: [Todo!]!
    getTodoById(id: ID!): Todo
  }

  type Mutation {
    createTodo(userId: ID!, title: String!): Todo
    deleteTodo(id: ID!): DeleteTodoResponse
  }
`;
