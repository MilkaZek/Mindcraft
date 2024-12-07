import React, { useState, useEffect } from "react";
import TimerInput from "./TimerInput.jsx";
import TaskInput from "./TaskInput.jsx";
import Background from "./Background.jsx";
import Minigame from "./Minigame.jsx";
import Timer from "./Timer.jsx";
import TaskManager from "./TaskManager.jsx";
import "./App.css";
import { useAuthentication } from "../services/authService";
import { SignIn, SignOut } from "./Auth.jsx";

export default function App() {
  const [pokemonData, setPokemonData] = useState({});
  const [streak, setStreak] = useState(0);
  const [num, setNum] = useState(1);
  const [joke, setJoke] = useState("");
  const [error, setError] = useState("");
  const [time, setTime] = useState(15);
  const [timeLeft, setTimeLeft] = useState(time * 60); // 25 minutes
  const [isRunning, setIsRunning] = useState(false);
  const [isWorkPeriod, setIsWorkPeriod] = useState(true);
  const [task, setTask] = useState("");
  const [tasksToDo, setTasksToDo] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [showJokePopup, setShowJokePopup] = useState(false);
  const [showPokemonPopup, setShowPokemonPopup] = useState(true); // Popup visibility state
  const [message, setMessage] = useState(""); // Message to display in the popup // State to control pop-up visibility
  const workTime = time * 60; // 25 minutes
  const restTime = 5 * 60; // 5 minutes
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

  return (
    <div className="App">
      <h1>Pomodoro Timer</h1>

      <div className = "auth-container">
        {!user ? <SignIn /> : <SignOut />}
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
              if (!value) setIsWorkPeriod(true); // Return to normal screen after closing popup
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
