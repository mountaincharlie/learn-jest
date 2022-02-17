// game object (contains everything we need for the game)
let game = {
    score: 0,
    currentGame: [],
    playerMoves: [],
    choices: ["button1", "button2", "button3", "button4"],
};

// exporting game functions for testing
module.exports = {game};  // using {} since we're exporting more than 1 object