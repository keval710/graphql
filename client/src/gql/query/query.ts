import { gql } from "@apollo/client";

const GET_TODOS_AND_USERS = gql`
  query GetTodos {
    getAllTodos {
      id
      title
      completed
    }
    getAllUsers {
    id
    name
    email
    todos {
        id
        title
        completed
      }
  }
  }
`;

const ADD_TODO = gql`
mutation AddTodo($userId: ID!, $title: String!) {
  createTodo(userId: $userId, title: $title) {
    id
  }
}
`
const ADD_USER = gql`
mutation AddTodo($name: String!, $email: String!) {
  createUser(name: $name, email: $email) {
    id
  }
}
`

export {
  GET_TODOS_AND_USERS,
  ADD_TODO,
  ADD_USER
}