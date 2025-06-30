import { useEffect } from "react";
import { deleteTask, updateTask } from "../services/api";

export default function TaskList({ tasks, onUpdate }) {
  const now = new Date();

  const getDiffDays = (createdAt) =>
    Math.floor((now - new Date(createdAt)) / (1000 * 60 * 60 * 24));

  const getCurrentPhase = (createdAt) => {
    const days = getDiffDays(createdAt);
    return [3, 5, 7].includes(days) ? days : null;
  };

  const handleMarkDone = async (task, phase) => {
    const updatedPhases = [...(task.completedPhases || []), phase];
    await updateTask(task.id, { completedPhases: updatedPhases });
    onUpdate();
  };

  const handleRemoveOverdue = async (taskId) => {
    await deleteTask(taskId);
    onUpdate();
  };

  const allPhases = [3, 5, 7];

  const overdueTasks = tasks.filter((task) => {
    const diffDays = getDiffDays(task.createdAt);
    const completed = task.completedPhases || [];
    return diffDays >= 7 && !allPhases.every((p) => completed.includes(p));
  });

  const activeTasks = tasks.filter((task) => {
    const phase = getCurrentPhase(task.createdAt);
    return phase && !(task.completedPhases || []).includes(phase);
  });

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4 text-orange-600">📌 Pending Tasks</h2>

      {activeTasks.length === 0 && (
        <p className="text-gray-500">No pending tasks for today 🎉</p>
      )}

      <div className="space-y-4">
        {activeTasks.map((task) => {
          const phase = getCurrentPhase(task.createdAt);
          return (
            <div
              key={task.id}
              className="p-4 border rounded-md shadow-sm bg-white flex justify-between items-center"
            >
              <div>
                <a
                  href={task.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-500 underline break-all"
                >
                  {task.url}
                </a>
                <p className="text-sm text-gray-600">Show (Day {phase})</p>
              </div>
              <button
                onClick={() => handleMarkDone(task, phase)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              >
                ✅ Done (Day {phase})
              </button>
            </div>
          );
        })}
      </div>

      {overdueTasks.length > 0 && (
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4 text-red-600">⚠️ Overdue Tasks</h2>
          <div className="space-y-4">
            {overdueTasks.map((task) => (
              <div
                key={task.id}
                className="p-4 border border-red-400 bg-red-50 rounded-md flex justify-between items-center"
              >
                <div>
                  <a
                    href={task.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-red-600 underline break-all"
                  >
                    {task.url}
                  </a>
                  <p className="text-sm text-red-500">
                    Overdue – Created {getDiffDays(task.createdAt)} days ago
                  </p>
                </div>
                <button
                  onClick={() => handleRemoveOverdue(task.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                >
                  🗑 Mark Done & Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
