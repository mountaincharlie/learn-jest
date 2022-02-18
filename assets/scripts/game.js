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
    showScore()
};

// shows the score to the user
function showScore(){
    document.getElementById("score").innerText = game.score;
};


// exporting game functions for testing
module.exports = {game, newGame, showScore};  // using {} since we're exporting more than 1 object