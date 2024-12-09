export default function TaskInput({ task, setTask, createTask, user }) {
  function taskset(event) {
    setTask(event.target.value);
  }

  async function handleAddTask() {
    if (!task.trim()) return;
    try {
      await createTask(task);
      setTask("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  }
  

  return (
      <div>
          <input
              onChange={taskset}
              type="text"
              value={task}
              placeholder="Enter a task..."
          />

          {user ? (
              <button onClick={handleAddTask}>Add Task</button>
          ) : (
              <button disabled>Sign in to add task</button>
          )}
      </div>
  );
}
