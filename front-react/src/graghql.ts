import { gql } from "@apollo/client";

export const SEARCH_TODOS = gql`
  query SearchTodos($done: Boolean, $text: String) {
    searchTodos(done: $done, text: $text) {
      id
      text
      done
    }
  }
`;

export const GET_ALL_TODOS = gql`
  query GetAllTodos {
    getAllTodo {
      id
      text
      done
    }
  }
`;

export const UPDATE_TODO = gql`
  mutation UpdateTodo($id: Int!, $text: String!, $done: Boolean!) {
    updateTodoStatus(id: $id, text: $text, done: $done) {
      id
      text
      done
    }
  }
`;

export const ADD_TODO = gql`
  mutation AddTodo($text: String!, $done: Boolean!) {
    createTodo(text: $text, done: $done) {
      id
      text
      done
    }
  }
`;

export const DELETE_TODO = gql`
  mutation DeleteTodo($deleteTodoId: Int!) {
    deleteTodo(id: $deleteTodoId)
  }
`;
