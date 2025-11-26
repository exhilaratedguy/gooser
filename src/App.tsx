import { differenceInSeconds } from "date-fns";
import { useEffect, useState } from "react";
import "./App.css";

// 23rd April 2037 17:39:00
const endDate = new Date(2037, 3, 23, 17, 39);

function App() {
  const [countdown, setCountdown] = useState(
    differenceInSeconds(endDate, new Date())
  );
  const [showHonk, setShowHonk] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(differenceInSeconds(endDate, new Date()));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const triggerHonk = () => {
    console.log("trigger");

    setShowHonk((prev) => !prev);
  };

  return (
    <div className="root">
      <div className="goose-container">
        <img
          src="goose.gif"
          className="goose"
          alt="goose"
          onClick={triggerHonk}
        />
        {showHonk && (
          <video
            className="honked"
            autoPlay
            muted
            playsInline
            onEnded={triggerHonk}
          >
            <source src="honked.webm" type="video/webm" />
          </video>
        )}
      </div>
      <div className="countdown">{formatTime(countdown)}</div>
    </div>
  );
}

export default App;

const formatTime = (seconds: number) => {
  const years = Math.floor(seconds / 31536000);
  seconds %= 31536000;
  const days = Math.floor(seconds / 86400);
  seconds %= 86400;
  const hours = Math.floor(seconds / 3600);
  seconds %= 3600;
  const minutes = Math.floor(seconds / 60);
  seconds %= 60;

  return `${years}y ${days}d ${hours}h ${minutes}m ${seconds}s`;
};
