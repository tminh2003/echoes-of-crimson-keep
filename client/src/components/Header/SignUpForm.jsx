import axios from "axios";
import { useState } from "react";

export const SignUpForm = ({ setShowForm }) => {
  const [error, setError] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Get the values from the form fields
    const form = e.target;
    const username = form.elements.username.value;
    const password = form.elements.password.value;

    try {
      const response = await axios.post("http://localhost:3000/signUp", {
        username,
        password,
      });

      if (response.data.error) {
        setError("Sign up failed: " + response.data.error);
      } else {
        setShowForm(null);
      }
    } catch (err) {
      setError("Sign up failed: " + err);
    }
  };

  return (
    <div>
      <div>
        <h2>Sign Up</h2>
        <form onSubmit={handleSignUp}>
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
          </div>
          {error && <p>{error}</p>}
        </form>
      </div>
    </div>
  );
};
