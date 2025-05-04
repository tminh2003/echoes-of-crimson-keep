function chapter1(choice, gameState) {
  console.log("User choice:", choice);

  let message = "";

  switch (choice) {
    case "Start":
      message =
        "You wake up in a dark dungeon cell. There's a straw bed, a loose stone in the wall, and a heavy wooden door.";
      gameState.availableChoices = [];
      gameState.availableChoices.push(
        "Inspect the wall",
        "Check the bed",
        "Try the door"
      );
      break;
    case "Inspect the wall":
      if (!gameState.hasNail) {
        gameState.hasNail = true;
        message =
          "You pry out a loose stone and find a rusty nail hidden behind it.";
        if (gameState.hasNail && gameState.hasWire) {
          gameState.availableChoices.push("Craft a lockpick");
        }
      } else {
        message = "You’ve already taken the nail from behind the stone.";
      }
      break;

    case "Check the bed":
      if (!gameState.hasWire) {
        gameState.hasWire = true;
        message = "You search the straw and find a thin wire. Might be useful.";
        if (gameState.hasNail && gameState.hasWire) {
          gameState.availableChoices.push("Craft a lockpick");
        }
      } else {
        message = "You already found the wire hidden in the bed.";
      }
      break;

    case "Craft a lockpick":
      if (gameState.hasNail && gameState.hasWire) {
        message = "You craft a makeshift lockpick using the nail and wire.";
        //Remove craft a lockpick choice
        const index = gameState.availableChoices.indexOf("Craft a lockpick");
        if (index !== -1) {
          gameState.availableChoices.splice(index, 1);
        }
        gameState.availableChoices.push("Attempt to pick the lock");
      }
      break;

    case "Try the door":
      if (gameState.doorUnlocked) {
        message =
          "The door is already unlocked. You can step into the hallway.";
        gameState.availableChoices.push("Step into the hallway");
        if (gameState.hasNail && gameState.hasWire) {
          gameState.availableChoices.push("Attempt to pick the lock");
        }
      } else {
        message = "The door is locked. You'll need something to pick it.";
      }
      break;

    case "Attempt to pick the lock":
      if (gameState.hasNail || gameState.hasWire) {
        gameState.doorUnlocked = true;
        gameState.availableChoices = []; // Clear previous choices
        message =
          "With a bit of effort, the lock gives way. The door creaks open into a dim corridor.";
        gameState.availableChoices.push("Step into the hallway");
      } else {
        message = "You need something to pick the lock with.";
      }
      break;

    case "Step into the hallway":
      if (!gameState.inArmory) {
        gameState.inArmory = true;
        message =
          "You enter a hallway and spot an abandoned guardroom. Inside are three weapons resting on a rack.";
        gameState.availableChoices.push(
          "Take the bow",
          "Take the sword",
          "Take the staff"
        );
        const index = gameState.availableChoices.indexOf(
          "Step into the hallway"
        );
        if (index !== -1) {
          gameState.availableChoices.splice(index, 1); // Remove the choice to step into the hallway
        }
      }
      break;

    case "Take the bow":
    case "Take the sword":
    case "Take the staff":
      if (!gameState.weapon) {
        gameState.weapon = [choice.replace("Take the ", "")];
        message = `You grab the ${gameState.weapon} and ready yourself for what lies ahead.`;
        gameState.availableChoices = []; // Clear previous choices
      }
      gameState.availableChoices.push("Proceed into the tunnel");
      break;

    case "Proceed into the tunnel":
      gameState.currentChapter = "chapter2";
      message = `You disappear into the darkness, armed with your ${gameState.weapon}. Chapter 2 awaits...`;
      gameState.availableChoices = []; // Clear previous choices
      gameState.availableChoices.push("To chapter 2");
      break;

    default:
      message = "That's not a valid action.";
      break;
  }

  return [message, ...gameState.availableChoices];
}

module.exports = chapter1;
