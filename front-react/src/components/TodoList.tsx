import { useQuery } from "@apollo/client";
import { useState } from "react";
import { Query } from "../generated/graphql";
import { GET_ALL_TODOS, SEARCH_TODOS } from "../graghql";
import EditTodoItem from "./EditTodoItem";
import TodoItem from "./TodoItem";

type TodoListProps = {
  searchParams?: { text?: string; done?: boolean };
};

export default function TodoList({ searchParams }: TodoListProps) {
  const [isEditing, setIsEditing] = useState<number | null>(null);

  const isSearching =
    searchParams && (searchParams.text || searchParams.done !== undefined);

  const { loading, error, data } = useQuery<Query>(
    isSearching ? SEARCH_TODOS : GET_ALL_TODOS,
    {
      variables: isSearching ? searchParams : undefined,
    }
  );

  if (loading) return <h1>Loading ....</h1>;
  if (error) return <h1>Error : {error?.message}</h1>;

  const todos = isSearching ? data?.searchTodos : data?.getAllTodo;

  return (
    <ul>
      {todos && todos.length === 0 ? (
        <li style={{ color: "black" }}>No todos items</li>
      ) : (
        todos?.map((todo) => (
          <li key={todo.id}>
            {isEditing === todo.id ? (
              <EditTodoItem todo={todo} setIsEditing={setIsEditing} />
            ) : (
              <TodoItem todo={todo} setIsEditing={setIsEditing} />
            )}
          </li>
        ))
      )}
    </ul>
  );
}
