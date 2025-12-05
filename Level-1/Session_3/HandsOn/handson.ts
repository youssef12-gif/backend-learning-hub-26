/**
 * TypeScript Fundamentals - Async & Callbacks Practice Task
 *
 * Overview:
 * Build small examples to practice Callbacks, Promises, and Async/Await in TypeScript.
 * Follow instructions and implement each part step by step.
 *
 */

// =========================
// Part 1: Callbacks
// =========================
/*
Task:
1. Create a function `greet` that takes a name and a callback function.
2. The callback should log a greeting message with the name.
3. Test it with different names.
*/

// Example:

// your code here

//Test here

// =========================
// Part 2: Promises
// =========================
/*
Task:
1. Create a function `fetchNumber` that returns a Promise.
2. The promise should resolve with a random number after 1 second.
3. Use .then and .catch to handle success and errors.
*/

// Example:
// function fetchNumber(): Promise<number> {
//     // your code here
// }

// =========================
// Part 3: Async / Await
// =========================
/*
Task:
1. Create an async function `calculateDouble` that:
   - Awaits the result of `fetchNumber`
   - Returns double the number
2. Handle errors using try/catch
3. Call the function and log the result
*/

// Example:
// async function calculateDouble() {
//     // your code here
// }

// =========================
// Part 4: Chaining Promises
// =========================
/*
Task:
1. Create two functions that return promises:
   - `addFive(num: number)` resolves with num + 5
   - `multiplyByTwo(num: number)` resolves with num * 2
2. Chain them to get final result
3. Log each step
*/

// =========================
// Part 5: Bonus Challenge 
// =========================
/*
Task:
1. Create a function `processData` that:
   - Accepts a number
   - Returns a promise
   - Inside the promise:
       - Wait 500ms
       - If number is even, resolve with "Even number: X"
       - If number is odd, reject with "Odd number: X"
2. Call the function with async/await and handle errors
*/
