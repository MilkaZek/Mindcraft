import { db } from "../firebaseConfig";
import { doc, setDoc, arrayUnion, arrayRemove, updateDoc } from "firebase/firestore"; // <-- Add updateDoc here

export const addTask = async (userId, task) => {
  if (!userId) throw new Error("User ID is required to add a task.");

  const userTasksRef = doc(db, "tasks", userId);

  const taskObj = {
    task: task,
    timestamp: new Date(),
    status: "pending",
  };

  await setDoc(
    userTasksRef,
    { tasks: arrayUnion(taskObj) },
    { merge: true }
  );

  return taskObj; 
};

export const completeTask = async (userId, task) => {
    if (!userId) throw new Error("User ID is required to complete a task.");
  
    const userTasksRef = doc(db, "tasks", userId);
    const userCompletedTasksRef = doc(db, "completed_tasks", userId);
  
    await updateDoc(userTasksRef, {
      tasks: arrayRemove(task),
    });
  
    await setDoc(
      userCompletedTasksRef,
      { completedTasks: arrayUnion({ ...task, status: "completed" }) },
      { merge: true }
    );
  
  };
