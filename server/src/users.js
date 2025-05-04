const sqlite3 = require("sqlite3").verbose();
const { DB_PATH } = require("../config.js");
const { resetGameState } = require("./game.js");

// Initialize database
const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("Connected to SQLite database.");
    db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            gamestate TEXT DEFAULT '{}'
        )`);
  }
});

// Function to register a new user
function signUp(username, password) {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO users (username, password, gamestate) VALUES (?, ?, ?)`,
      [username, password, JSON.stringify(resetGameState({}))],
      function (err) {
        if (err) {
          console.log("Error registering user:", username);
          reject(err);
        } else {
          console.log("User registered successfully with gamestate:", username);
          resolve(true);
        }
      }
    );
  });
}

// Function to verify login credentials
async function login(username, password) {
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT password FROM users WHERE username = ?`,
      [username],
      async (err, row) => {
        if (err) {
          console.log("Error authenticating user " + username);
          return reject(err);
        }

        if (!row) {
          console.log("User not found: " + username);
          return resolve(false);
        }

        try {
          if (password == row.password) {
            console.log("Authentication successful for " + username);
            resolve(true);
          } else {
            console.log("Incorrect password for " + username);
            resolve(false);
          }
        } catch (compareErr) {
          reject(compareErr);
        }
      }
    );
  });
}

//For saving users with the gamestate
function save(username, gamestate) {
  return new Promise((resolve, reject) => {
    db.run(
      `UPDATE users SET gamestate = ? WHERE username = ?`,
      [JSON.stringify(gamestate), username],
      function (err) {
        if (err) {
          console.log("Error saving game state for " + username);
          reject(err);
        } else {
          console.log("Game state saved successfully for " + username);
          resolve(true);
        }
      }
    );
  });
}

//For getting the saved gamestate
function load(username) {
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT gamestate FROM users WHERE username = ?`,
      [username],
      (err, row) => {
        if (err) {
          console.log("Error loading game state for " + username);
          reject(err);
        } else if (!row) {
          console.log("No game state found for " + username);
          resolve(null);
        } else {
          console.log("Game state loaded successfully for " + username);
          resolve(JSON.parse(row.gamestate));
        }
      }
    );
  });
}

module.exports = { signUp, login, save, load };
