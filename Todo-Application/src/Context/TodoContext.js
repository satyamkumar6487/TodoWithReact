import { createContext, useContext } from "react";

export const todoContext = createContext({
  todos: [],

  addTodo: () => {},
  updateTodo: () => {},
  deleteTodo: () => {},
  toggleComplete: () => {},
});

export const useTodo = () => {
  return useContext(todoContext);
};

export const TodoProvider = todoContext.Provider;