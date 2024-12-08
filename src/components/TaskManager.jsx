import { db } from "../firebaseConfig";
import { doc, setDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

export default function TaskManager({
  user,
  tasks,
  setTasks,
  completedTasks,
  setCompletedTasks,
  popup,
  setPopup,
  error,
  joke,
}) {

  const handleCompleteTask = async (taskIndex) => {
    if (!user) {
      console.error("No user authenticated.");
      return;
    }
    const taskToComplete = tasks[taskIndex];
    try {
      const userTasksRef = doc(db, "tasks", user.uid);
      const userCompletedTasksRef = doc(db, "completed_tasks", user.uid);

      await updateDoc(userTasksRef, {
        tasks: arrayRemove(taskToComplete)
      });

      await setDoc(userCompletedTasksRef, 
        { completedTasks: arrayUnion({
          ...taskToComplete,
          status: "completed",
          })
        },
        { merge: true } 
      );

      setTasks((prevTasks) => prevTasks.filter((_, index) => index !== taskIndex));
      setCompletedTasks((prevCompleted) => [...prevCompleted, taskToComplete]);

      setPopup(true); 
    } catch (error) {
      console.error("Error completing task: ", error);
    }
  };

  function closePopup() {
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