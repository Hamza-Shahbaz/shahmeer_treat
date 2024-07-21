import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [timeLeft, setTimeLeft] = useState({});
  const [overdue, setOverdue] = useState(false);

  const calculateTimeLeft = () => {
    const targetDate = new Date("2024-08-03T21:00:00");
    const now = new Date();
    const difference = targetDate - now;

    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
      setOverdue(false);
    } else {
      const overdue = -difference;
      timeLeft = {
        days: Math.floor(overdue / (1000 * 60 * 60 * 24)),
        hours: Math.floor((overdue / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((overdue / 1000 / 60) % 60),
        seconds: Math.floor((overdue / 1000) % 60),
      };
      setOverdue(true);
    }

    return timeLeft;
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    timerComponents.push(
      <span key={interval}>
        {timeLeft[interval]} {interval}{" "}
      </span>
    );
  });

  return (
    <div className="App">
      <h1>Shahmeer Treat Date: August 3, 2024, 9:00 PM</h1>
      {overdue ? <span>Overdue by: </span> : <span>Due In: </span>}
      {timerComponents.length ? (
        timerComponents
      ) : (
        <span>Due by August 3, 2024, 9:00 PM</span>
      )}
    </div>
  );
}

export default App;
