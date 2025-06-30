import { useState } from "react";
import { addTask } from "../services/api";

export default function AddTaskForm({ onAdd }) {
  const [url, setUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const task = {
      url,
      createdAt: new Date().toISOString(),
      status: "pending",
    };
    await addTask(task);
    setUrl("");
    onAdd(); // Refresh the list
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row items-center gap-4 bg-white p-4 shadow rounded-md"
    >
      <input
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter a task link (e.g., LeetCode)"
        required
        className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        type="submit"
        className="bg-yellow-600 text-white px-5 py-2 rounded-md hover:bg-yellow-700 transition"
      >
        ➕ Add Task
      </button>
    </form>
  );
}
