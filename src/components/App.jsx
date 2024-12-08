import { useState, useEffect } from "react";
import TimerInput from "./TimerInput.jsx";
import TaskInput from "./TaskInput.jsx";
import Background from "./Background.jsx";
import Minigame from "./Minigame.jsx";
import Timer from "./Timer.jsx";
import TaskManager from "./TaskManager.jsx";
import "./App.css";
import { useAuthentication } from "../services/authService";
import { SignIn, SignOut } from "./Auth.jsx";
import { db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

export default function App() {
  const [pokemonData, setPokemonData] = useState({});
  const [streak, setStreak] = useState(0);
  const [num, setNum] = useState(1);
  const [joke, setJoke] = useState("");
  const [error, setError] = useState("");
  const [time, setTime] = useState(15);
  const [timeLeft, setTimeLeft] = useState(time * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isWorkPeriod, setIsWorkPeriod] = useState(true);
  const [task, setTask] = useState("");
  const [tasksToDo, setTasksToDo] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [showJokePopup, setShowJokePopup] = useState(false);
  const [showPokemonPopup, setShowPokemonPopup] = useState(true);
  const [message, setMessage] = useState("");
  const workTime = time * 60;
  const restTime = 5 * 60;
  const user = useAuthentication();

  useEffect(() => {
    const url = `https://pokeapi.co/api/v2/pokemon/${num}/`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => setPokemonData(data))
      .catch((error) => console.error("Error fetching Pokémon data:", error));
  }, [num]);

  useEffect(() => {
    const url = "https://v2.jokeapi.dev/joke/Any";
    fetch(url)
      .then((response) => response.json())
      .then((data) =>
        setJoke(
          data.type === "twopart"
            ? `${data.setup} - ${data.delivery}`
            : data.joke
        )
      )
      .catch((error) => console.error("Error fetching Pokémon data:", error));
  }, [showJokePopup]);

  useEffect(() => {
    const fetchTasks = async () => {
      if (user) {
        try {
          const userTasksRef = doc(db, "tasks", user.uid);
          const tasksDoc = await getDoc(userTasksRef);
          if (tasksDoc.exists()) {
            setTasksToDo(tasksDoc.data().tasks || []);
          }

          const userCompletedTasksRef = doc(db, "completed_tasks", user.uid);
          const completedTasksDoc = await getDoc(userCompletedTasksRef);
          if (completedTasksDoc.exists()) {
            setCompletedTasks(completedTasksDoc.data().completedTasks || []);
          }
        } catch (error) {
          console.error("Error fetching tasks from Firestore:", error);
        }
      } else {
        setTasksToDo([]);
        setCompletedTasks([]);
      }
    };

    fetchTasks();
  }, [user]);

  return (
    <div className="App">
      <h1>Pomodoro Timer</h1>

      <div className="auth-container">
        {!user ? <SignIn /> : <SignOut user={user}/>}
      </div>

      <Timer
        workTime={workTime}
        restTime={restTime}
        work={isWorkPeriod}
        setWork={setIsWorkPeriod}
        time={timeLeft}
        setTime={setTimeLeft}
        running={isRunning}
        setRunning={setIsRunning}
        setPopup={setShowPokemonPopup}
      />
      <TimerInput time={setTime} setTime={setTimeLeft} />

      <Background />
      <div className="task-section">
        <h2>Tasks To Do</h2>
        <TaskInput task={task} setTask={setTask} setTasks={setTasksToDo} user={user}/>
        <TaskManager
          tasks={tasksToDo}
          setTasks={setTasksToDo}
          completedTasks={completedTasks}
          setCompletedTasks={setCompletedTasks}
          popup={showJokePopup}
          setPopup={setShowJokePopup}
          error={error}
          joke={joke}
          user={user}
        />
      </div>

      {isWorkPeriod === false && showPokemonPopup && (
        <div className="popup">
          <Minigame
            data={pokemonData}
            action={setNum}
            popup={showPokemonPopup}
            setpopup={(value) => {
              setShowPokemonPopup(value);
              if (!value) setIsWorkPeriod(true);
            }}
            message={setMessage}
            msg={message}
            streak={streak}
            setstreak={setStreak}
            work={isWorkPeriod}
            setWork={setIsWorkPeriod}
          />
        </div>
      )}
    </div>
  );
}