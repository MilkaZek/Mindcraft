export default function Task_Input({ task, setTask, setTasks, user }) {
    function taskset(event) {
      setTask(event.target.value);
    }
    function handleAddTask() {
      if (task.trim() !== "") {
        setTasks((prevTasks) => [...prevTasks, task]);
        setTask("");
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