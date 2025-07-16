import { useState, useEffect } from "react";
import type { ChangeEvent, FormEvent } from "react";

// This defines the shape of a single to-do item
type ToDo = {
  id: string;
  title: string;
  completed: boolean;
};

export default function TodoApp() {
  // Stores the input from the user when typing a new task
  const [newItem, setNewItem] = useState<string>("");

  // Stores the full list of to-dos
  // ✅ This version loads to-dos from localStorage when the app first loads
  const [toDos, setToDos] = useState<ToDo[]>(() => {
    const stored = localStorage.getItem("todos");
    return stored ? JSON.parse(stored) : [];
  });

  // ✅ Whenever the list of to-dos changes, save it to localStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(toDos));
  }, [toDos]);

  // 🔹 Called when the user submits the form to add a new task
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); // Prevent the page from refreshing

    if (!newItem.trim()) return; // Ignore empty input

    // Add the new task to the list
    setToDos((current) => [
      ...current,
      {
        id: crypto.randomUUID(), // Generate a unique ID
        title: newItem.trim(),   // Use trimmed text
        completed: false,        // New tasks start as incomplete
      },
    ]);

    setNewItem(""); // Clear the input field
  }

  // 🔹 Called when a task is checked/unchecked
  function handleToggle(id: string) {
    setToDos((current) =>
      current.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  // 🔹 Called when the user deletes a specific task
  function handleDelete(id: string) {
    if (confirm("Are you sure you want to delete this task?")) {
      setToDos((current) => current.filter((todo) => todo.id !== id));
    }
  }

  // 🔹 Removes all completed tasks from the list
  function handleClearCompleted() {
    setToDos((current) => current.filter((todo) => !todo.completed));
  }

  // 🔹 Bonus UX: Pressing Escape clears the input field
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setNewItem("");
    }

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  // Count how many tasks are still active (not completed)
  const activeCount = toDos.filter((todo) => !todo.completed).length;

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Page Title */}
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">📝 Todo List</h1>

      {/* Form to add a new task */}
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          value={newItem}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setNewItem(e.target.value)}
          type="text"
          placeholder="Add a new task..."
          className="flex-1 border border-gray-400 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Add
        </button>
      </form>

      {/* Task count and Clear Completed button */}
      {toDos.length > 0 && (
        <div className="flex justify-between items-center mb-2 text-sm text-gray-600">
          <span>{activeCount} task{activeCount !== 1 && "s"} left</span>
          <button
            onClick={handleClearCompleted}
            className="text-red-500 hover:underline"
          >
            Clear completed
          </button>
        </div>
      )}

      {/* To-Do List */}
      <ul className="space-y-3">
        {/* Message when there are no tasks */}
        {toDos.length === 0 && (
          <li className="text-center text-gray-400">No tasks yet. Add one above!</li>
        )}

        {/* List of all to-do items */}
        {toDos.map((toDo) => (
          <li
            key={toDo.id}
            className={`flex items-center justify-between px-4 py-3 bg-white rounded shadow border border-gray-200 transition-all duration-300 ${
              toDo.completed ? "opacity-70" : ""
            }`}
          >
            <div className="flex items-center gap-3 w-full">
              {/* Checkbox to toggle completion */}
              <input
                type="checkbox"
                checked={toDo.completed}
                onChange={() => handleToggle(toDo.id)}
                className="accent-blue-600 w-5 h-5 transition"
              />

              {/* Task title with line-through if completed */}
              <span
                className={`flex-1 text-gray-800 ${
                  toDo.completed ? "line-through text-gray-500" : ""
                }`}
              >
                {toDo.title}
              </span>

              {/* Delete button */}
              <button
                onClick={() => handleDelete(toDo.id)}
                className="text-gray-400 hover:text-red-600 transition"
                aria-label="Delete"
              >
                🗑️
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
