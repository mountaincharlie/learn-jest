// game object (contains everything we need for the game)
let game = {
    score: 0,
    currentGame: [],
    playerMoves: [],
    turnNumber: 0,
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
    showTurns()
};

// shows the players turn for a set interval
function showTurns(){
    game.turnNumber = 0;
    let turns = setInterval(function(){
        lightsOn(game.currentGame[game.turnNumber]);
        game.turnNumber++;
        if (game.turnNumber >= game.currentGame.length){
            clearInterval(turns);
        }
    }, 800);
};

// temporarily adds the light class to the triggered circle
function lightsOn(circleId){
    document.getElementById(circleId).classList.add("light");
    setTimeout(function(){
        document.getElementById(circleId).classList.remove("light");
    }, 400);
};

// shows the score to the user
function showScore(){
    document.getElementById("score").innerText = game.score;
};


// exporting game functions for testing
module.exports = {game, newGame, showScore, addTurn, lightsOn, showTurns};  
// using {} since we're exporting more than 1 object