import React, { useState, useEffect } from "react";
import Time from "./Time";

const Counter = () => {
  const [days, setDays] = useState(100);
  const [hours, setHours] = useState(60);
  const [minutes, setMinutes] = useState(60);
  const [seconds, setSeconds] = useState(60);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    let interval = null;

    if (isRunning) {
      interval = setInterval(() => {
        // Decrement seconds
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    // Update hours, minutes, days when seconds reach 0
    if (seconds === 0) {
      if (minutes > 0) {
        setMinutes((prevMinutes) => prevMinutes - 1);
        setSeconds(59);
      } else {
        if (hours > 0) {
          setHours((prevHours) => prevHours - 1);
          setMinutes(59);
          setSeconds(59);
        } else {
          if (days > 0) {
            setDays((prevDays) => prevDays - 1);
            setHours(23);
            setMinutes(59);
            setSeconds(59);
          } else {
            clearInterval(interval);
          }
        }
      }
    }

    // Clear interval when component unmounts
    return () => clearInterval(interval);
  }, [days, hours, minutes, seconds, isRunning]);

  // Format the time with leading zeroes
  const formatTime = (value) => {
    return value.toString().padStart(2, "0");
  };

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setDays(100);
    setHours(60);
    setMinutes(60);
    setSeconds(60);
    setIsRunning(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "days") {
      setDays(parseInt(value));
    } else if (name === "hours") {
      setHours(parseInt(value));
    } else if (name === "minutes") {
      setMinutes(parseInt(value));
    } else if (name === "seconds") {
      setSeconds(parseInt(value));
    }
  };

  return (
    <div style={{ paddingTop: "20px" }}>
      {/* <h1>Countdown</h1>
      <div>
        <label>Days:</label>
        <input
          type="number"
          name="days"
          value={days}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Hours:</label>
        <input
          type="number"
          name="hours"
          value={hours}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Minutes:</label>
        <input
          type="number"
          name="minutes"
          value={minutes}
          onChange={handleInputChange}
        />
      </div>  <div>
        <label>Seconds:</label>
        <input
          type="number"
          name="seconds"
          value={seconds}
          onChange={handleInputChange}
        />
      </div>
      <p> */}
      {/* {formatTime(days)}:{formatTime(hours)}:{formatTime(minutes)}:
        {formatTime(seconds)} */}
      <Time days={days} hours={hours} minutes={minutes} seconds={seconds} />
      {/* </p>
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
      <button onClick={handleReset}>Reset</button> */}
    </div>
  );
};

export default Counter;
