/**
 * @jest-environment jsdom
 */

// getting the file we're testing 
const {game, newGame, showScore, addTurn, lightsOn, showTurns, playerTurn} = require("../game");

// adding a 'spy' to wait for an alert to be displayed
jest.spyOn(window, "alert").mockImplementation(() => {});

// bringing in the mock DOM
beforeAll(() => {
    let fs = require("fs");
    let fileContents = fs.readFileSync("index.html", "utf-8");
    document.open();
    document.write(fileContents);
    document.close();
});

// checking if the right keys exist in the 'game' object
describe("game object contains correct keys", () => {
    test("score key exists", () => {
        expect("score" in game).toBe(true);
    });
    test("currentGame key exists", () => {
        expect("currentGame" in game).toBe(true);
    });
    test("playerMoves key exists", () => {
        expect("playerMoves" in game).toBe(true);
    });
    test("choices key exists", () => {
        expect("choices" in game).toBe(true);
    });
    test("choices contains correct ids", () => {
        expect(game.choices).toEqual(["button1", "button2", "button3", "button4"]);
    });
    test("turnNumber key exists", () => {
        expect("turnNumber" in game).toEqual(true);
    });
});

// tests for the newGame function
describe("newGame works correctly", () => {
    // setting up some pretend code to see if the reset works
    beforeAll(() => {
        game.score = 42;
        game.currentGame = ["button1", "button3"];
        game.playerMoves = ["button4", "button2"];
        document.getElementById("score").innerText = "42";
        newGame();
    });
    test("should reset game score to 0", () => {
        expect(game.score).toEqual(0);
    });
    test("should be one move in PCs game array", () => {
        expect(game.currentGame.length).toEqual(1);
    });
    test("should clear playerMoves array", () => {
        expect(game.playerMoves.length).toEqual(0);
    });
    test("should display 0 for element with id = score", () => {
        expect(document.getElementById("score").innerText).toEqual(0);
    });
    test("data-listener should be true", () => {
        const circleElements = document.getElementsByClassName("circle");
        for (let element of circleElements){
            expect(element.getAttribute("data-listener")).toEqual("true");
        };
    });
});

// tests for the lights on functionality
// using before/afterEach allows tests to be 'isolated'
describe("gameplay works correctly", () => {
    // before each TEST
    beforeEach(() => {
        game.score = 0;
        game.currentGame = [];
        game.playerMoves = [];
        addTurn();
    });
    // after each TEST
    afterEach(() => {
        game.score = 0;
        game.currentGame = [];
        game.playerMoves = [];
    });
    test("addTurn adds a new turn to the game", () => {
        addTurn();
        expect(game.currentGame.length).toEqual(2);
    });
    test("should add correct class to light up button", () => {
        // always at least one random button id in currentGame
        let button = document.getElementById(game.currentGame[0]);
        lightsOn(game.currentGame[0]);
        // checking the button's class list includes the light class
        expect(button.classList).toContain("light");
    });
    test("showTurns should update game.turnNumber", () => {
        game.turnNumber = 42;
        showTurns()
        expect(game.turnNumber).toEqual(0);
    });
    test("should increment score if turn is correct", () => {
        game.playerMoves.push(game.currentGame[0]);
        playerTurn();
        expect(game.score).toEqual(1);
    });
    test("should call an alert if the guess is wrong", () => {
        game.playerMoves.push("wrong");
        playerTurn();
        expect(window.alert).toBeCalledWith("Wrong move!");
    });
});
