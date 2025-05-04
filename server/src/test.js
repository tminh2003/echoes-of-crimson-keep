const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const { signUp, login } = require("./users");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);

// -------- ROUTES --------

// Home
app.get("/", (req, res) => {
  res.send("Welcome to the Calculator App");
});

// Sign Up
app.post("/signup", (req, res) => {
  const { username, password } = req.body;
  if (signUp(username, password)) {
    res.json({ success: true, message: "Signup successful" });
  } else {
    res.status(400).json({ success: false, message: "Username taken" });
  }
});

// Login
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (login(username, password)) {
    req.session.user = username;
    req.session.number = 0; // Start their number at 0
    res.json({ success: true, message: "Login successful" });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});

// Add to number
app.post("/add", (req, res) => {
  if (!req.session.user)
    return res.status(403).json({ message: "Not logged in" });

  const { amount } = req.body;
  req.session.number += parseInt(amount);
  res.json({ number: req.session.number });
});

// Subtract from number
app.post("/subtract", (req, res) => {
  if (!req.session.user)
    return res.status(403).json({ message: "Not logged in" });

  const { amount } = req.body;
  req.session.number -= parseInt(amount);
  res.json({ number: req.session.number });
});

// Get current value
app.get("/current", (req, res) => {
  if (!req.session.user)
    return res.status(403).json({ message: "Not logged in" });

  res.json({ number: req.session.number });
});

// Logout
app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ message: "Logout failed" });
    res.json({ message: "Logged out successfully" });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
