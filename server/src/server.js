const express = require("express");
const http = require("http");
const app = express();
const { resetGameLog, resetGameState, processInput } = require("./game.js");
const server = http.createServer(app);
const cors = require("cors");
const { PORT } = require("../config.js");
const { signUp, login, save, load } = require("./users.js");
const path = require("path");
const session = require("express-session");

const allowedOrigins = ["http://localhost:3000", "http://localhost:5173"]; // Add all your frontend origins

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
// Serve the React build folder
app.use(express.static(path.join(__dirname, "../../client/dist")));
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.json()); // Parse JSON bodies

app.use(
  session({
    secret: "your-secret-key",
    saveUninitialized: true,
    resave: true,
    secure: false, // Set to true if using HTTPS
    cookie: { secure: false },
  })
);

//For processing player choice
app.get("/processInput", function (req, res) {
  //Check for session
  console.log("User: " + req.session.username);
  if (!req.session.username) {
    return res.status(401).json({ message: "User not logged in" });
  }

  let responseList = processInput(req.query.userChoice, req.session.gamestate);

  //Add to game log the user choice and display message
  req.session.gameLog.push(req.query.userChoice, responseList[0]);

  let response = {
    gameLog: req.session.gameLog,
    choices: responseList.slice(1), // Get the rest as choices
    score: req.session.gamestate.score, // Current score
    highScore: req.session.gamestate.highScore, // High score
  };

  //For saving and loading
  req.session.gamestate.displayMessage = responseList[0];

  res.json(response);
});

//For checking if the user is logged in
app.get("/session", (req, res) => {
  if (req.session.username) {
    res.json({
      loggedIn: true,
      username: req.session.username,
      choices: req.session.gamestate.availableChoices,
      gameLog: req.session.gameLog,
    });
  } else {
    res.json({ loggedIn: false });
  }
});

//For handling login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const isValid = await login(username, password);
    if (isValid) {
      req.session.username = username;

      // Load the gamestate from the database
      req.session.gamestate = await load(username);
      console.log("User logged in: " + req.session.username);

      // Initialize gamestate in session if it doesn't exist
      if (!req.session.gamestate) {
        req.session.gamestate = resetGameState(req.session.gamestate); // Reset to initial gamestate
      }

      //Initialize game log
      req.session.gameLog = [req.session.gamestate.displayMessage];

      console.log(req.session.gamestate);

      res.json({
        success: true,
        message: "Login successful",
        // Returns the gamestate to the client
        gameLog: req.session.gameLog,
        choices: req.session.gamestate.availableChoices,
        score: req.session.gamestate.score,
        highScore: req.session.gamestate.highScore,
      });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

//For handling sign up
app.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  try {
    const isValid = await signUp(username, password);
    console.log("isValid: " + isValid);
    if (isValid) {
      console.log("valid");
      res.json({ success: true, message: "Sign up successful" });
    } else {
      console.log("invalid");
      res.status(401).json({ success: false, message: "Failed to sign up" });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

//Route for saving the game state with session
app.post("/save", (req, res) => {
  const username = req.session.username;
  const gamestate = req.session.gamestate;
  console.log("Saving game state for user: " + username);

  save(username, gamestate);

  res.json({ success: true, message: "Game state saved successfully" });
});

//Route for logging out
app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Failed to log out" });
    }
    res.json({ message: "Logged out successfully" });
  });
});

//Route for resetting the game state
app.post("/reset", (req, res) => {
  const username = req.session.username;
  console.log("Resetting game state for user: " + username);

  // Reset the gamestate to initial values
  req.session.gamestate = resetGameState(req.session.gamestate);

  //Reset the game log
  req.session.gameLog = resetGameLog(req.session.gameLog);

  res.json({
    success: true,
    message: "Reset successful",
    // Returns the gamestate to the client
    gameLog: req.session.gameLog,
    choices: req.session.gamestate.availableChoices,
    score: req.session.gamestate.score,
    highScore: req.session.gamestate.highScore,
  });
});

// Catch-all route to serve index.html
app.get("", (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/dist", "index.html"));
});

server.listen(PORT, () => {
  console.log("Server is running on " + PORT);
});
