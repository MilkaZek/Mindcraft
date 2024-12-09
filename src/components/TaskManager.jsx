export default function TaskManager({
  user,
  tasks,
  completedTasks,
  popup,
  setPopup,
  completeTask,
  error,
  joke,
  setJoke
}) {

  const handleCompleteTask = async (taskIndex) => {
    setPopup(true)
    if (!user) {
      console.error("No user authenticated.");
      return;
    }
    const taskToComplete = tasks[taskIndex];
    try {
      await completeTask(taskToComplete);
    } catch (error) {
      console.error("Error completing task: ", error);
    }
  };

  function closePopup() {
    setJoke("")
    setPopup(false);
  }

  return (
    <div className="task-manager">
      <div className="task-section">
        <ul>
          {tasks.map((task, index) => (
            <li key={index}>
              {task.task} <button onClick={() => handleCompleteTask(index)}>✓</button>
            </li>
          ))}
        </ul>
      </div>

      <div className="task-section">
        <h2>Completed Tasks</h2>
        <ul>
          {completedTasks.map((task, index) => (
            <li key={index}>{task.task}</li>
          ))}
        </ul>
      </div>

      {popup && joke && (
        <div className="popup">
          <div className="popup-content">
            <h2>🎉 Task Completed!</h2>
            {error ? <p style={{ color: "red" }}>{error}</p> : <p>{joke}</p>}
            
            <button onClick={closePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}