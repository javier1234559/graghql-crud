import { useMutation } from "@apollo/client";
import { useState } from "react";
import { Query } from "../generated/graphql";
import { ADD_TODO, GET_ALL_TODOS } from "../graghql";

export default function FormAdd() {
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
      console.log(existingTodos);
      if (existingTodos && existingTodos.getAllTodo) {
        cache.writeQuery({
          query: GET_ALL_TODOS,
          data: { getAllTodo: [...existingTodos.getAllTodo, createTodo] },
        });
      }
    },
    onError: (error) => {
      alert("Failed to add todo: " + error.message);
    },
  });

  const addNewTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await addTodo({
        variables: {
          text: formData.text,
          done: formData.done,
        },
      });
      setFormData({ text: "", done: false });
    } catch (error) {
      console.error("Failed to add todo:", error);
    }
  };

  return (
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
  );
}
