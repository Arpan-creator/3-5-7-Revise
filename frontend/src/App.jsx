import { useEffect, useState } from "react";
import AddTaskForm from "./components/AddTaskForm";
import TaskList from "./components/TaskList";
import { getTasks } from "./services/api";

function App() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const res = await getTasks();
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* Header */}
      <header className="bg-white shadow py-4 mb-6">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-green-700 text-center">
            📚 3-5-7 Reminder App
          </h1>
          <p className="text-center text-sm text-gray-500 mt-1">
            Review tasks on days 3, 5, and 7 — spaced repetition made simple
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4">
        <div className="mb-6">
          <AddTaskForm onAdd={fetchTasks} />
        </div>
        <TaskList tasks={tasks} onUpdate={fetchTasks} />
      </main>

      {/* Footer (optional) */}
      <footer className="text-center text-sm text-gray-400 mt-12 mb-4">
        Built with 💡 by You
      </footer>
    </div>
  );
}

export default App;
