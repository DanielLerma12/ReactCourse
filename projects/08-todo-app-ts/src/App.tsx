import { useState } from "react";
import type { JSX } from "react/jsx-runtime";
import { Todos } from "./components/Todos.tsx";
import {
  type FilterValue,
  type TodoChangeCompleted,
  type TodoId,
} from "./types.d";
import { Footer } from "./components/Footer.tsx";
import { TODO_FILTERS } from "./consts.ts";

const mockTodos = [
  {
    id: "1",
    title: "Ver el twitch de Midu",
    completed: true,
  },
  {
    id: "2",
    title: "Aprender react con typeScript",
    completed: false,
  },
  {
    id: "3",
    title: "Sacar ticket de la midu fest",
    completed: false,
  },
];

const App = (): JSX.Element => {
  const [todos, setTodos] = useState(mockTodos);
  const [filterSelected, setFilterSelected] = useState<FilterValue>(
    TODO_FILTERS.ALL,
  );

  const handleRemove = ({ id }: TodoId): void => {
    // Destructuring, TodoId es Todo[id] o un objeto
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  const handleCompleted = ({ id, completed }: TodoChangeCompleted): void => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed,
        };
      }
      return todo;
    });
    console.log(newTodos);
    setTodos(newTodos);
  };

  const handleFilterChange = (filter: FilterValue): void => {
    setFilterSelected(filter);
  };

  const activeCount = todos.filter((todo) => !todo.completed).length;
  const completedCount = todos.length - activeCount;

  const filteredTodos = todos.filter((todo) => {
    if (filterSelected === TODO_FILTERS.ACTIVE) return !todo.completed;
    if (filterSelected === TODO_FILTERS.COMPLETED) return todo.completed;
    return todo;
  });

  return (
    <>
      <div className="todoapp">
        <Todos
          todos={filteredTodos}
          onRemoveTodo={handleRemove}
          onToggleCompleted={handleCompleted}
        />
      </div>
      <Footer
        activeCount={activeCount}
        completedCount={completedCount}
        filterSelected={filterSelected}
        onClearCompleted={() => {}}
        handleFilterChange={handleFilterChange}
      />
    </>
  );
};

export default App;
