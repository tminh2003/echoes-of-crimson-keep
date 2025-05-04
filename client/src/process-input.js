//Takes in choice the player made, return a list of choices and the display message
function processInput(playerChoice) {
  return {
    choices: ["fight", "steal", "talk"],
    displayMessage: "You have entered a dungeon",
  };
}

export default processInput;
