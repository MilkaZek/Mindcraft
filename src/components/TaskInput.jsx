import { db } from "../firebaseConfig";
import { doc, setDoc, arrayUnion } from "firebase/firestore";

export default function Task_Input({ task, setTask, setTasks, user }) {
  function taskset(event) {
    setTask(event.target.value);
  }

  async function handleAddTask() {
    try {
      const userTasksRef = doc(db, "tasks", user.uid);
  
      const taskObj = {
        task: task,
        timestamp: new Date(),
        status: "pending",
      };
  
      await setDoc(userTasksRef, {
        tasks: arrayUnion(taskObj),
      }, { merge: true });
  
      setTasks((prevTasks) => {
        const updatedTasks = [...prevTasks, taskObj];
        return updatedTasks;
      });
  
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
