import React, { useEffect } from "react";

export default function Timer({
  workTime,
  restTime,
  work,
  setWork,
  time,
  setTime,
  running,
  setRunning,
  setPopup,
}) {
  // Format time as mm:ss
  function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }

  // Start or pause the timer
  function handleStartPause() {
    setRunning((prev) => !prev);
  }

  // Reset the timer to the initial value
  function handleReset() {
    setRunning(false);
    setWork(true);
    setTime(workTime);
  }

  // Timer countdown effect
  useEffect(() => {
    let timer;
    if (running && time > 0) {
      timer = setInterval(() => setTime((prev) => prev - 1), 1000);
    } else if (running && time === 0) {
      skipToNextState();
    }
    return () => clearInterval(timer);
  }, [running, time]);

  function skipToNextState() {
    setRunning(false);
    if (work) {
      setWork(false);
      setTime(restTime);
      setPopup(true);
    } else {
      setWork(true);
      setTime(workTime);
      setPopup(false);
    }
  }

  return (
    <section className="timer">
      <h2>{work ? "Work Time" : "Rest Time"}</h2>
      <h2>{formatTime(time)}</h2>
      <button onClick={handleStartPause}>{running ? "Pause" : "Start"}</button>
      <button onClick={handleReset}>Reset</button>
      <button onClick={skipToNextState}>Fast Forward</button>
    </section>
  );
}
