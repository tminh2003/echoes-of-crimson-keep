const path = require("path");

// Define constants
const PROJECT_ROOT = path.resolve(__dirname, "");
const DB_PATH = path.join(PROJECT_ROOT, "database", "users.db");
const PORT = 3000;

// Export constants
module.exports = {
  PROJECT_ROOT,
  DB_PATH,
  PORT,
};
