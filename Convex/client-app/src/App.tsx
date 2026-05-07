import { useState } from "react";
import type { FormEvent } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "./convexApi.ts";
import "./App.css";

type Task = {
  _id: string;
  text: string;
  isCompleted: boolean;
  source?: string;
};

const expressUrl = import.meta.env.VITE_EXPRESS_API_URL ?? "http://localhost:3000";

function App() {
  const tasks = useQuery(api.tasks.get) as Task[] | undefined;
  const createTask = useMutation(api.tasks.create);
  const toggleTask = useMutation(api.tasks.toggle);
  const deleteTask = useMutation(api.tasks.deleteTask);
  const [newTaskText, setNewTaskText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isExpressSubmitting, setIsExpressSubmitting] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = newTaskText.trim();
    if (!trimmed || isSubmitting) return;
    setIsSubmitting(true);
    try {
      await createTask({ text: trimmed });
      setNewTaskText("");
    } finally {
      setIsSubmitting(false);
    }
  };

  const addViaExpress = async () => {
    const trimmed = newTaskText.trim();
    if (!trimmed || isExpressSubmitting) return;
    setIsExpressSubmitting(true);
    try {
      await fetch(`${expressUrl}/debug/add-task`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: trimmed }),
      });
      setNewTaskText("");
    } finally {
      setIsExpressSubmitting(false);
    }
  };

  return (
    <main className="app">
      <h1 className="title">My Tasks</h1>
      <p className="subtitle">Live updates from Convex (no polling).</p>
      <form className="add-task" onSubmit={onSubmit}>
        <input
          className="task-input"
          type="text"
          value={newTaskText}
          onChange={(event) => setNewTaskText(event.target.value)}
          placeholder="Add a new task"
          maxLength={120}
        />
        <button className="task-button" type="submit" disabled={isSubmitting}>
          Add (Client)
        </button>
        <button
          className="task-button secondary"
          type="button"
          disabled={isExpressSubmitting}
          onClick={() => void addViaExpress()}
        >
          Add via Express
        </button>
      </form>
      {tasks === undefined ? (
        <p className="empty">Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <p className="empty">No tasks yet. Add one to get started.</p>
      ) : (
        <ul className="tasks">
          {tasks.map((task) => (
            <li key={task._id} className="task-item">
              <p className="task-text">
                {task.text} {task.source ? <span className="source">({task.source})</span> : null}
              </p>
              <button
                type="button"
                className={`status ${task.isCompleted ? "done" : "todo"} status-button`}
                onClick={() =>
                  void toggleTask({
                    taskId: task._id,
                    isCompleted: !task.isCompleted,
                  })
                }
              >
                {task.isCompleted ? "Completed" : "Pending"}
              </button>
              <button
                type="button"
                className="delete-button"
                onClick={() =>
                  void deleteTask({
                    taskId: task._id,
                  })
                }
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

export default App;
