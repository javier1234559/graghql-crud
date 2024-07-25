import { useState } from "react";
import { Query, Todo } from "../generated/graphql";
import { useMutation } from "@apollo/client";
import { GET_ALL_TODOS, UPDATE_TODO } from "../graghql";

type Props = {
  todo: Todo;
  setIsEditing: (id: number | null) => void;
};

export default function EditTodoItem({ todo, setIsEditing }: Props) {
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
