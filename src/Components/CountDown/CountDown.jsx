import React, { useEffect, useState } from "react";

const CountDown = ({ contest }) => {
  const deadline = new Date(contest?.date);

  const calculateTimeLeft = () => {
    const timeLeft = Math.max(deadline - Date.now(), 0); // Ensure non-negative values
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
    return { timeLeft, days, hours, minutes, seconds };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => {
      const updatedTime = calculateTimeLeft();
      setTimeLeft(updatedTime);

      // Stop the timer if timeLeft is zero
      if (updatedTime.timeLeft <= 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  // Display message if the contest is no longer available
  if (timeLeft.timeLeft <= 0) {
    return (
      <div className="text-red-500 font-bold text-lg">
        Contest is no longer available!
      </div>
    );
  }

  // Otherwise, display the countdown timer
  return (
    <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
      <div className="flex flex-col">
        <span className="countdown font-mono text-5xl">
          <span style={{ "--value": timeLeft.days }}></span>
        </span>
        days
      </div>
      <div className="flex flex-col">
        <span className="countdown font-mono text-5xl">
          <span style={{ "--value": timeLeft.hours }}></span>
        </span>
        hours
      </div>
      <div className="flex flex-col">
        <span className="countdown font-mono text-5xl">
          <span style={{ "--value": timeLeft.minutes }}></span>
        </span>
        min
      </div>
      <div className="flex flex-col">
        <span className="countdown font-mono text-5xl">
          <span style={{ "--value": timeLeft.seconds }}></span>
        </span>
        sec
      </div>
    </div>
  );
};

export default CountDown;
