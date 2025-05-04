import React, { useEffect, useState } from "react";
import axios from "axios";
import "./css/App.css";
import ActionControls from "./components/ActionControls";
import MainDisplay from "./components/MainDisplay";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
const App = () => {
  // States
  const [gameLog, setGameLog] = useState("");
  const [choiceList, setChoiceList] = useState([]);
  const [username, setUsername] = useState("");
  const [highScore, setHighScore] = useState(0);
  const [score, setScore] = useState(0);

  //Mounting the component
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/session");
        if (response.data.loggedIn) {
          setUsername(response.data.username);
          setGameLog(response.data.gameLog);
          setChoiceList(response.data.choices);
          setScore(response.data.score);
          setHighScore(response.data.highScore);
        } else {
          setGameLog(["Please Login"]);
        }
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    };

    fetchInitialData();
  }, []);

  // Function to process player choice using axios
  const processPlayerChoice = async (choice) => {
    try {
      const response = await axios.get(`http://localhost:3000/processInput`, {
        params: { userChoice: choice },
      });

      // Update the message and choices with the server response
      setGameLog(response.data.gameLog);
      setChoiceList(response.data.choices);
      setScore(response.data.score);
      setHighScore(response.data.highScore);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  //HTML structure
  return (
    <div className="app">
      <Header
        username={username}
        setUsername={setUsername}
        setChoiceList={setChoiceList}
        setGameLog={setGameLog}
        score={score}
        highScore={highScore}
        setHighScore={setHighScore}
        setScore={setScore}
      />
      <div className="app-container">
        <MainDisplay username={username} gameLog={gameLog} />

        <ActionControls
          processPlayerChoice={processPlayerChoice}
          choiceList={choiceList}
        />
      </div>
      <Footer
        username={username}
        setChoiceList={setChoiceList}
        setGameLog={setGameLog}
        setHighScore={setHighScore}
        setScore={setScore}
      />
    </div>
  );
};

export default App;
