import { useState } from "react";
import { useTodo } from "../Context/TodoContext";

const TodoItem = ({ todo }) => {

  const [isTodoEditable, setIsTodoEditable] = useState(false);

  const [todoMsg, setTodoMsg] = useState(todo.todo);

  const {
    updateTodo,
    deleteTodo,
    toggleComplete,
  } = useTodo();

  // EDIT / SAVE
  const editTodo = () => {

    updateTodo(todo.id, {
      ...todo,
      todo: todoMsg,
    });

    setIsTodoEditable(false);
  };

  // TOGGLE COMPLETE
  const toggledCompleted = () => {
    toggleComplete(todo.id);
  };

  return (
    <div
      className={`
        flex items-center gap-3
        border border-black/10
        rounded-lg
        px-3 py-2
        shadow-sm
        duration-300
        ${
          todo.completed
            ? "bg-green-200"
            : "bg-purple-200"
        }
      `}
    >

      {/* CHECKBOX */}

      <input
        type="checkbox"
        className="cursor-pointer"
        checked={todo.completed}
        onChange={toggledCompleted}
      />

      {/* TODO INPUT */}

      <input
        type="text"
        className={`
          border
          outline-none
          w-full
          bg-transparent
          rounded-lg
          px-2
          ${
            isTodoEditable
              ? "border-black/10"
              : "border-transparent"
          }
        `}
        value={todoMsg}
        readOnly={!isTodoEditable}
        onChange={(e) => setTodoMsg(e.target.value)}
      />

      {/* EDIT / SAVE */}

      <button
        className="px-3 py-1 rounded-lg border bg-white"
        onClick={() => {

          if (todo.completed) {
            return;
          }

          if (isTodoEditable) {
            editTodo();
          } else {
            setIsTodoEditable((prev) => !prev);
          }

        }}
        disabled={todo.completed}
      >
        {isTodoEditable ? "Save" : "Edit"}
      </button>

      {/* DELETE */}

      <button
        className="px-3 py-1 rounded-lg border bg-white"
        onClick={() => deleteTodo(todo.id)}
      >
        Delete
      </button>

    </div>
  );
};

export default TodoItem;