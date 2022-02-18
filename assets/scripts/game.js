// game object (contains everything we need for the game)
let game = {
    score: 0,
    currentGame: [],
    playerMoves: [],
    choices: ["button1", "button2", "button3", "button4"],
};

// resets game.score and the currentGame/playerMoves arrays
function newGame(){
    game.score = 0;
    game.currentGame = [];
    game.playerMoves = [];
    showScore();
    addTurn();
};

function addTurn(){
    game.playerMoves = [];
    // pushing a random choice from the choices array
    game.currentGame.push(game.choices[Math.floor(Math.random()*4)]);
    // showTurns()
};

// shows the score to the user
function showScore(){
    document.getElementById("score").innerText = game.score;
};

// temporarily adds the light class to the triggered circle
function lightsOn(circleId){
    document.getElementById(circleId).classList.add("light");
    setTimeout(() => {
        document.getElementById(circleId).classList.remove("light");
    }, 400);
};


// exporting game functions for testing
module.exports = {game, newGame, showScore, addTurn, lightsOn};  // using {} since we're exporting more than 1 object