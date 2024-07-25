import { useMutation } from "@apollo/client";
import { Todo } from "../generated/graphql";
import { DELETE_TODO, GET_ALL_TODOS, UPDATE_TODO } from "../graghql";

type Props = {
  todo: Todo;
  setIsEditing: (id: number | null) => void;
};

export default function TodoItem({ todo, setIsEditing }: Props) {
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
