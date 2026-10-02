import { useEffect, useState } from "react";
import { TodoProvider } from "./Context/TodoContext";
import TodoForm from "./Components/TodoForm";
import TodoItem from "./Components/TodoItem";

function App() {
  const [todos, setTodo] = useState([]);

  // ADD TODO
  const addTodo = (todo) => {
    setTodo((prev) => [
      {
        id: Date.now(),
        ...todo,
      },
      ...prev,
    ]);
  };

  // UPDATE TODO
  const updateTodo = (id, todo) => {
    setTodo((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id ? todo : prevTodo
      )
    );
  };

  // DELETE TODO
  const deleteTodo = (id) => {
    setTodo((prev) =>
      prev.filter((todo) => todo.id !== id)
    );
  };

  // TOGGLE COMPLETE
  const toggleComplete = (id) => {
    setTodo((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id
          ? {
              ...prevTodo,
              completed: !prevTodo.completed,
            }
          : prevTodo
      )
    );
  };

  // GET TODOS FROM LOCAL STORAGE
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));

    if (todos && todos.length > 0) {
      setTodo(todos);
    }
  }, []);

  // SAVE TODOS TO LOCAL STORAGE
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoProvider
      value={{
        todos,
        addTodo,
        updateTodo,
        deleteTodo,
        toggleComplete,
      }}
    >
      <div className="min-h-screen bg-gray-100 py-10">

        <div className="max-w-xl mx-auto px-4">

          <h1 className="text-3xl font-bold text-center mb-6">
            Todo App
          </h1>

          <TodoForm />

          <div className="mt-5 space-y-3">

            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
              />
            ))}

          </div>

        </div>

      </div>
    </TodoProvider>
  );
}

export default App;