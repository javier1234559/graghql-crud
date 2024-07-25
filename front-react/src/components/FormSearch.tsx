import React, { useState } from "react";

type FormSearchProps = {
  setSearchParams: (params: { text?: string; done?: boolean }) => void;
};

export default function FormSearch({ setSearchParams }: FormSearchProps) {
  const [formData, setFormData] = useState<{ text: string; done: string }>({
    text: "",
    done: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchParams({
      text: formData.text || undefined,
      done: formData.done === "" ? undefined : formData.done === "true",
    });
  };

  return (
    <form className="header" onSubmit={handleSubmit}>
      <input
        type="text"
        name="text"
        onChange={handleChange}
        value={formData.text}
        placeholder="Search text"
      />
      <select name="done" onChange={handleChange} value={formData.done}>
        <option value="">All</option>
        <option value="true">Completed</option>
        <option value="false">Incomplete</option>
      </select>
      <button type="submit">Search</button>
    </form>
  );
}
