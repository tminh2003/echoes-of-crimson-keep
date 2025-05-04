import React from "react";

import "./../css/general.css";
import "./../css/MainDisplay.css";

const MainDisplay = ({ username, gameLog }) => {
  console.log("game log: " + gameLog);
  return (
    <>
      {username ? (
        <div className="main-display">
          {gameLog.map((text, index) => (
            <p
              key={index}
              className={
                index % 2 === 0 ? "game-log-message" : "game-log-choice"
              }
            >
              {text}
            </p>
          ))}
        </div>
      ) : (
        <div className="welcome-messages">
          <h1>A text-based adventure game</h1>
          <h2>Please log in or sign up to start your adventure.</h2>
        </div>
      )}
    </>
  );
};

export default MainDisplay;
