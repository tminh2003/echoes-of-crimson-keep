const playerMap = document.querySelector(".player-map");
let North_Map = 'url("Assets/North_Map.png")';
let South_Map = 'url("Assets/South_Map.png")';
let East_Map = 'url("Assets/East_Map.png")';
let West_Map = 'url("Assets/West_Map.png")';
let Default_Map = 'url("Assets/Default_Map.png")';
playerMap.style.backgroundImage = Default_Map;

function updateMap(Direction) {
    // Update the background image of the playerMap based on the direction
   const initImg = playerMap.style.backgroundImage;
    console.log("Current Map: " + initImg);
    console.log("Direction: " + Direction);
    if (initImg === Default_Map || initImg === "") {
        if (Direction === "North") {
            playerMap.style.backgroundImage = North_Map;
            console.log("Map changed to North");
            return;
            }
            if (Direction === "South") {
                playerMap.style.backgroundImage = South_Map;
                console.log("Map changed to South");
            return;
            }
            if (Direction === "East") {
                playerMap.style.backgroundImage = East_Map;
                console.log("Map changed to East");
            return;
            }
            if (Direction === "West") {
                playerMap.style.backgroundImage = West_Map;
                console.log("Map changed to West");
            return; 
            }
    }
    else if (initImg === North_Map) {
        if (Direction === "North") {
            console.log("Already at North");
            return;
        }
        if (Direction === "South") {
            playerMap.style.backgroundImage = Default_Map;
            console.log("Moved South to default position");
            return;
        }
        console.log("Invalid direction from North");
        return;
    } 
    else if (initImg === South_Map) {
        if (Direction === "South") {
            console.log("Already at South");
            
            return;
        }
        if (Direction === "North") {
            playerMap.style.backgroundImage = Default_Map;
            console.log("Moved North to default position");
            return;
        }
        console.log("Invalid direction from South");
        return;
    }
    else if (initImg === East_Map) {
        if (Direction === "East") {
            console.log("Already at East");
            return;
        }
        if (Direction === "West") {
            playerMap.style.backgroundImage = Default_Map;
            console.log("Moved West to default position");
            return;
        }
        console.log("Invalid direction from East");
        return;
    }
    else if (initImg === West_Map) {
        if (Direction === "West") {
            console.log("Already at West");
            return;
        }
        if (Direction === "East") {
            playerMap.style.backgroundImage = Default_Map;
            console.log("Moved East to default position");
            return;
        }
        console.log("Invalid direction from West");
        return;
    }
    console.log("Invalid direction");
    return;
    
}
const North = document.querySelector("#North");
const South = document.querySelector("#South");
const East = document.querySelector("#East");
const West = document.querySelector("#West");

North.onclick = function() { updateMap("North"); };
South.onclick = function() { updateMap("South"); };
East.onclick = function() { updateMap("East"); };
West.onclick = function() { updateMap("West"); };