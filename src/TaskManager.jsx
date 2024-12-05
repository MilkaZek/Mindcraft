export default function TaskManager({
    tasks,
    setTasks,
    completedTasks,
    setCompletedTasks,
    popup,
    setPopup,
    error,
    joke,
  }) {
    function handleCompleteTask(index) {
      const taskToComplete = tasks[index];
      setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
      setCompletedTasks((prevCompleted) => [...prevCompleted, taskToComplete]);
      setPopup(true);
    }
  
    function closePopup() {
      setPopup(false);
    }
  
    return (
      <div className="task-manager">
        <div className="task-section">
          <ul>
            {tasks.map((t, index) => (
              <li key={index}>
                {t} <button onClick={() => handleCompleteTask(index)}>✓</button>
              </li>
            ))}
          </ul>
        </div>
  
        <div className="task-section">
          <h2>Completed Tasks</h2>
          <ul>
            {completedTasks.map((t, index) => (
              <li key={index}>{t}</li>
            ))}
          </ul>
        </div>
  
        {popup && (
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
  