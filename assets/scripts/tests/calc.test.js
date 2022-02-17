/**
 * @jest-environment jsdom
 */

// getting the file we're testing 
const addition = require("../calc");

// creating the describe for the parent function and its 'children'
describe("Calculator", () =>{
    describe("Addition", () =>{
        test("should return 42 for 20 + 22", () => {
            expect(addition(20, 22)).toBe(42);
        });
        test("should return 73 for 42 + 31", () => {
            expect(addition(31, 42)).toBe(73);
        });
    });
    describe("Subtraction", () =>{

    });
    describe("Multiply", () =>{

    });
    describe("Division", () =>{

    });
});