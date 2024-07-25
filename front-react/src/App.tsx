import { useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Query, Todo } from "./generated/graphql";

const GET_ALL_TODOS = gql`
  query GetAllTodos {
    getAllTodo {
      id
      text
      done
    }
  }
`;

const UPDATE_TODO = gql`
  mutation UpdateTodo($id: Int!, $text: String!, $done: Boolean!) {
    updateTodoStatus(id: $id, text: $text, done: $done) {
      id
      text
      done
    }
  }
`;

const ADD_TODO = gql`
  mutation AddTodo($text: String!, $done: Boolean!) {
    createTodo(text: $text, done: $done) {
      id
      text
      done
    }
  }
`;

const DELETE_TODO = gql`
  mutation DeleteTodo($deleteTodoId: Int!) {
    deleteTodo(id: $deleteTodoId)
  }
`;

type Props = {
  todo: Todo;
  setIsEditing: (id: number | null) => void;
};

function TodoItem({ todo, setIsEditing }: Props) {
  const [deleteTodo] = useMutation(DELETE_TODO, {
    refetchQueries: [{ query: GET_ALL_TODOS }],
  });
  const [updateTodo] = useMutation(UPDATE_TODO, {
    refetchQueries: [{ query: GET_ALL_TODOS }],
  });

  const handleDelete = async (id: number) => {
    try {
      const res = await deleteTodo({
        variables: { deleteTodoId: id },
      });
      console.log(res);
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  };

  const handleToggleDone = async () => {
    try {
      await updateTodo({
        variables: {
          id: todo.id,
          text: todo.text,
          done: !todo.done,
        },
      });
    } catch (error) {
      console.error("Failed to update todo status:", error);
    }
  };

  return (
    <div className="todo-item">
      <p className="todo-text">{todo.text}</p>
      <div className="todo-actions">
        <input
          type="checkbox"
          name="isdone"
          checked={todo.done}
          onChange={handleToggleDone}
        />
        <button onClick={() => handleDelete(todo.id)}>Delete</button>
        <button onClick={() => setIsEditing(todo.id)}>Edit</button>
      </div>
    </div>
  );
}

function EditTodoItem({ todo, setIsEditing }: Props) {
  const [formData, setFormData] = useState<{ text: string; done: boolean }>({
    text: todo.text,
    done: todo.done,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const [updateTodo, { loading }] = useMutation(UPDATE_TODO, {
    update(cache, { data: { updateTodoStatus } }) {
      const existingTodos = cache.readQuery<Query>({ query: GET_ALL_TODOS });
      if (existingTodos) {
        const updatedTodos = existingTodos.getAllTodo.map((t) =>
          t.id === updateTodoStatus.id ? updateTodoStatus : t
        );
        cache.writeQuery({
          query: GET_ALL_TODOS,
          data: { getAllTodo: updatedTodos },
        });
      }
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updateTodo({
        variables: {
          id: todo.id,
          text: formData.text,
          done: formData.done,
        },
      });
      setIsEditing(null);
    } catch (error) {
      alert("Failed to update todo:");
    }
  };

  return (
    <form className="todo-item" onSubmit={handleSubmit}>
      {loading && <div className="loading">Loading...</div>}
      <input
        name="text"
        type="text"
        className="todo-text"
        disabled={loading}
        value={formData.text}
        onChange={handleChange}
      />
      <div className="todo-actions">
        <input
          name="done"
          type="checkbox"
          checked={formData.done}
          onChange={handleChange}
        />
        <button type="submit">Update</button>
      </div>
    </form>
  );
}

function TodoList() {
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const { loading, error, data } = useQuery<Query>(GET_ALL_TODOS);

  if (loading) return <h1>Loading ....</h1>;
  if (error) return <h1>Error : {error?.message}</h1>;

  return (
    <ul>
      {data?.getAllTodo.length === 0 ? (
        <li style={{ color: "black" }}>No todos items</li>
      ) : (
        data?.getAllTodo?.map((todo) => (
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

function App() {
  const [formData, setFormData] = useState<{ text: string; done: boolean }>({
    text: "",
    done: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const [addTodo] = useMutation(ADD_TODO, {
    update(cache, { data: { createTodo } }) {
      const existingTodos = cache.readQuery<Query>({ query: GET_ALL_TODOS });
      if (existingTodos) {
        cache.writeQuery({
          query: GET_ALL_TODOS,
          data: { getAllTodo: [...existingTodos.getAllTodo, createTodo] },
        });
      }
    },
  });

  const addNewTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      variables: {
        text: formData.text,
        done: formData.done,
      },
    };
    await addTodo(data);
    setFormData({ text: "", done: false });
  };

  return (
    <div className="container">
      <form className="header" onSubmit={addNewTodo}>
        <input
          type="text"
          name="text"
          onChange={handleChange}
          value={formData.text}
        />
        <input
          type="checkbox"
          name="done"
          onChange={handleChange}
          checked={formData.done}
        />
        <button type="submit">Add</button>
      </form>
      <div className="body">
        <TodoList />
      </div>
    </div>
  );
}

export default App;
