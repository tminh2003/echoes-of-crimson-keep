const chapter1 = require("./chapters/chapter1.js");
const chapter2 = require("./chapters/chapter2.js");
const chapter3 = require("./chapters/chapter3.js");
const chapter4 = require("./chapters/chapter4.js");

const chapterMap = {
  chapter1,
  chapter2,
  chapter3,
  chapter4,
};

function resetGameLog(gameLog) {
  return ["Welcome to the game!"];
}

function resetGameState(gamestate) {
  return {
    currentChapter: "chapter1",
    displayMessage: "Welcome to the game!",
    availableChoices: ["Start"],
    weapons: [],
    inventory: [],
    score: 100,
    highScore: gamestate.highScore || 0,
  };
}

function processInput(choice, gameState) {
  const handler = chapterMap[gameState.currentChapter || "chapter1"];

  if (gameState.score > 0) {
    gameState.score -= 1;
  }

  const result = handler(choice, gameState);

  if (!gameState.isGameOver && result[1] && result[1] == "The End") {
    if (gameState.score > gameState.highScore) {
      gameState.highScore = gameState.score;
    }
  }

  return result;
}

module.exports = { resetGameLog, processInput, resetGameState };
