import "./../../css/general.css";
import "./../../css/Footer.css";
import { RefreshOutline, LogOutOutline, SaveOutline } from "react-ionicons";
import axios from "axios";

const Footer = ({
  username,
  setChoiceList,
  setGameLog,
  setHighScore,
  setScore,
}) => {
  console.log("in footer");
  console.log("Username: " + username);
  return (
    <>
      {username && (
        <div className="menu">
          <button
            className="icon-container"
            onClick={() => {
              axios
                .post("http://localhost:3000/save")
                .then((response) => {
                  console.log(response.data.message);
                })
                .catch((error) => {
                  console.error("Error saving", error);
                });
            }}
          >
            <SaveOutline className="icon" />
          </button>
          <button
            className="icon-container"
            onClick={() => {
              axios
                .post("http://localhost:3000/reset")
                .then((response) => {
                  console.log(response.data.message);
                  setGameLog(response.data.gameLog);
                  setChoiceList(response.data.choices);
                  setScore(response.data.score);
                  setHighScore(response.data.highScore);
                })
                .catch((error) => {
                  console.error("Error resetting", error);
                });
            }}
          >
            <RefreshOutline className="icon" />
          </button>
        </div>
      )}
    </>
  );
};

export default Footer;
