import { useState } from "react";
import { useTodo } from "../Context/TodoContext";

function TodoForm() {
  const [todo, setTodo] = useState("");

  const { addTodo } = useTodo();

  const add = (e) => {
    e.preventDefault();

    if (!todo.trim()) {
      return;
    }

    addTodo({
      todo: todo,
      completed: false,
    });

    setTodo("");
  };

  return (
    <form
      onSubmit={add}
      className="flex gap-2"
    >

      <input
        type="text"
        placeholder="Write Todo..."
        className="w-full border border-gray-500 rounded-lg p-2 outline-none bg-white"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />

      <button
        type="submit"
        className="rounded-lg px-4 py-2 bg-green-600 text-white"
      >
        Add
      </button>

    </form>
  );
}

export default TodoForm;