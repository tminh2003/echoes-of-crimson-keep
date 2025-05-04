import React, { useState } from "react";
import "./../../css/general.css";
import "./../../css/Header.css";
import { RefreshOutline, LogOutOutline, SaveOutline } from "react-ionicons";

import { SignUpForm } from "./SignUpForm";
import { LoginForm } from "./LoginForm";
import axios from "axios";

const Header = ({
  username,
  setUsername,
  setChoiceList,
  setGameLog,
  score,
  highScore,
  setHighScore,
  setScore,
}) => {
  const [showLoginForm, setShowLoginForm] = useState(null);
  const [showSignUpForm, setShowSignUpForm] = useState(null);

  console.log(username);

  return (
    <div className="header">
      <h1 className="title">Echoes of The Crimson Keep</h1>
      {username ? (
        <div className="user-info">
          <p>
            Logged in as <strong className="username">{username}</strong>
          </p>
          <button
            className="logout-button"
            onClick={() => {
              axios
                .post("http://localhost:3000/logout")
                .then((response) => {
                  console.log(response.data.message);
                  setUsername(null);
                  setChoiceList([]);
                  setGameLog([""]);
                })
                .catch((error) => {
                  console.error("Error logging out", error);
                });
            }}
          >
            Logout
          </button>
          <p>Score: {score} </p>
          <p>High Score: {highScore}</p>
        </div>
      ) : (
        <div className="login-and-signup">
          {!showLoginForm && (
            <button onClick={() => setShowLoginForm(true)}>Login</button>
          )}
          {showLoginForm && (
            <LoginForm
              setUsername={setUsername}
              setShowForm={setShowLoginForm}
              setChoiceList={setChoiceList}
              setGameLog={setGameLog}
              setScore={setScore}
              setHighScore={setHighScore}
            />
          )}

          {!showSignUpForm && (
            <button onClick={() => setShowSignUpForm(true)}>Sign up</button>
          )}
          {showSignUpForm && <SignUpForm setShowForm={setShowSignUpForm} />}
        </div>
      )}
    </div>
  );
};

export default Header;
