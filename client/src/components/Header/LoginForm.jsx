import axios from "axios";
import { useState } from "react";

export const LoginForm = ({
  setUsername,
  setShowForm,
  setGameLog,
  setChoiceList,
  setScore,
  setHighScore,
}) => {
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    // Get the values from the form fields
    const form = e.target;
    const username = form.elements.username.value;
    const password = form.elements.password.value;

    try {
      const response = await axios.post("http://localhost:3000/login", {
        username,
        password,
      });

      console.log(response.data); // Log the response data

      if (response.data.error) {
        setError("Log in failed: " + response.data.error);
      } else {
        setGameLog(response.data.gameLog);
        setChoiceList(response.data.choices);
        setUsername(username);
        setShowForm(null);
        setScore(response.data.score || 0);
        setHighScore(response.data.highScore || 0); // Set high score if available
      }
    } catch (err) {
      setError("Login failed: " + err.message); // Use err.message for cleaner error
    }
  };

  return (
    <div>
      <div>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input type="text" name="username" placeholder="Username" required />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
          />
          <div>
            <button type="submit">Submit</button>
            <button type="button" onClick={() => setShowForm(null)}>
              Cancel
            </button>
            {error && <p>{error}</p>}
          </div>
        </form>
      </div>
    </div>
  );
};
