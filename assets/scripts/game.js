// game object (contains everything we need for the game)
let game = {
    score: 0,
    currentGame: [],
    playerMoves: [],
    turnNumber: 0,
    lastButton: "",
    turnInProgress: false,
    choices: ["button1", "button2", "button3", "button4"],
};

// resets game.score and the currentGame/playerMoves arrays
function newGame(){
    game.score = 0;
    game.currentGame = [];
    game.playerMoves = [];
    // setting all the data-listener attributes to true (to check EvList. have been added)
    for (let circle of document.getElementsByClassName("circle")){
        if (circle.getAttribute("data-listener") !== "true"){
            circle.addEventListener("click", (e) => {
                    if (game.currentGame.length > 0 && !game.turnInProgress){
                    let move = e.target.getAttribute("id");
                    game.lastButton = move; // storing the last move
                    lightsOn(move);
                    game.playerMoves.push(move);
                    playerTurn();
                };
            });
            circle.setAttribute("data-listener", "true");
        };
    };
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
    game.turnInProgress = true;  // while the user is having their go
    game.turnNumber = 0;
    let turns = setInterval(function(){
        lightsOn(game.currentGame[game.turnNumber]);
        game.turnNumber++;
        if (game.turnNumber >= game.currentGame.length){
            clearInterval(turns);
            game.turnInProgress = false;  // the users go is finished
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

// reacting to correct/incorrect user guesses
function playerTurn(){
    // getting final index
    let ind = game.playerMoves.length - 1;
    // comparing to currentGame to check if correct
    if (game.currentGame[ind] === game.playerMoves[ind]){
        // checking if theyre at the end of the sequence
        if (game.currentGame.length === game.playerMoves.length){
            game.score++;  // increases score
            showScore();  // shows score
            addTurn();  // creates next turn
        };
    } else {
        alert("Wrong move!");
        newGame();  // restarting the game
    };
};


// exporting game functions for testing
module.exports = {game, newGame, showScore, addTurn, lightsOn, showTurns, playerTurn};  
// using {} since we're exporting more than 1 object