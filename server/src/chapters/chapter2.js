function chapter2(choice, gameState) {
  console.log("User choice (Chapter 2):", choice);

  let message = "";

  if (!gameState.sphinx) {
    gameState.sphinx = {
      attempts: 0,
      riddle: "What has an eye, but cannot see?",
      answer: "a needle",
    };
    message =
      "You emerge from the tunnel into a large cavern. In the center, a majestic sphinx sits guarding the path forward. It speaks in a booming voice, 'Halt, traveler! Answer my riddle if you wish to proceed.'";
    gameState.availableChoices = [
      "Attempt to answer the riddle",
      "Attempt to attack the sphinx",
    ];
    return [message, ...gameState.availableChoices];
  }

  switch (choice) {
    case "Attempt to answer the riddle":
      message = `The sphinx asks: "${gameState.sphinx.riddle}" What is your answer?`;
      gameState.availableChoices = [
        "Answer: a tree",
        "Answer: the wind",
        "Answer: a needle",
        "Answer: a person",
      ]; // Provide some choices
      break;

    case "Answer: a tree":
    case "Answer: the wind":
    case "Answer: a person":
      gameState.sphinx.attempts++;
      message = `The sphinx shakes its head. "Incorrect! You have ${
        3 - gameState.sphinx.attempts
      } attempts remaining."`;
      if (gameState.sphinx.attempts >= 3) {
        message +=
          " The sphinx lets out a deafening roar, and you feel your life force drain away. Game Over.";
        gameState.availableChoices = []; // Remove all choices
        gameState.isGameOver = true;
      } else {
        gameState.availableChoices = [
          "Attempt to answer the riddle",
          "Attempt to attack the sphinx",
        ];
      }
      break;

    case "Answer: a needle":
      message =
        "The sphinx nods slowly. 'Correct. You may pass.' The path ahead opens.";
      gameState.availableChoices = ["Proceed further into the cavern"];
      break;

    case "Attempt to attack the sphinx":
      if (gameState.weapon.includes("bow")) {
        // Check if the weapon list includes "bow"
        message =
          "You raise your bow, and with a well-aimed shot, strike the Sphinx. It cries out as the arrow finds its mark, then slowly descends, defeated. The path forward is now clear, and it drops a staff. Which you picked up";
        gameState.sphinxDefeated = true;
        if (!gameState.weapon.includes("staff")) {
          // add the staff to the weapon list if its not already there
          gameState.weapon.push("staff");
        }
        gameState.availableChoices = ["Proceed further into the cavern"];
      } else {
        message =
          "You attempt to attack the powerful sphinx. It gracefully takes flight, its massive wings catching the cavern air. From above, its voice booms, 'Only those who strike from afar may challenge me!' With a swift gesture, it unleashes a wave of energy that instantly obliterates you. Game Over.";
        gameState.availableChoices = [];
        gameState.isGameOver = true;
      }
      break;

    case "Proceed further into the cavern":
      message =
        "The path forward is open, but you hesitate. There is a strange sound behind you...";
      gameState.availableChoices = ["Move forward", "Look back"];
      break;

    case "Look back":
      message =
        "You see a hooded figure watching you from the shadows. It vanishes as you turn to face it. It leaves behind a small flask-like object.";
      gameState.availableChoices = ["Move forward", "Pick up the object"];

      break;

    case "Pick up the object":
      message =
        "You pick up the object. It's a strange flask of yellow liquid. Behind the bottle, you see a note that reads: 'Drink me to turn back time.'";

      gameState.inventory.push("flask of liquid");
      gameState.availableChoices = ["Move forward", "Drink the yellow liquid"];
      break;

    case "Drink the yellow liquid":
      gameState.sphinx = {
        attempts: 0,
        riddle: "What has an eye, but cannot see?",
        answer: "a needle",
      };
      message =
        "You emerge from the tunnel into a large cavern. In the center, a majestic sphinx sits guarding the path forward. It speaks in a booming voice, 'Halt, traveler! Answer my riddle if you wish to proceed.'";
      gameState.availableChoices = [
        "Attempt to answer the riddle",
        "Attempt to attack the sphinx",
      ];
      break;

    case "Move forward":
      message =
        "You step forward cautiously, the cavern's shadows shifting around you. The path ahead is dark and uncertain.";
      gameState.currentChapter = "chapter3";
      gameState.availableChoices = ["The End"];
      break;

    default:
      message = "That's not a valid action here.";
      gameState.availableChoices = [
        "Attempt to answer the riddle",
        "Attempt to attack the sphinx",
      ];
      break;
  }

  return [message, ...gameState.availableChoices];
}

module.exports = chapter2;
