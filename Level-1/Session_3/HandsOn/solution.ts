/**
 * TypeScript Fundamentals - Async & Callbacks Practice Task
 */

// =========================
// Part 1: Callbacks
// =========================
function greet(name: string, callback: (msg: string) => void): void {
    const message = `Hello, ${name}!`;
    callback(message);
}

// Test Part 1
greet("Ahmed", (msg) => console.log(msg)); // Hello, Ahmed!

// =========================
// Part 2: Promises
// =========================
function fetchNumber(): Promise<number> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const num = Math.floor(Math.random() * 100);
            if (num >= 0) resolve(num);
            else reject("Error generating number");
        }, 1000);
    });
}

// Test Part 2
fetchNumber()
    .then((num) => console.log("Fetched number:", num))
    .catch((err) => console.error(err));

// =========================
// Part 3: Async / Await
// =========================
async function calculateDouble(): Promise<void> {
    try {
        const num = await fetchNumber();
        console.log("Double:", num * 2);
    } catch (error) {
        console.error("Error:", error);
    }
}

// Test Part 3
calculateDouble();

// =========================
// Part 4: Chaining Promises
// =========================
function addFive(num: number): Promise<number> {
    return new Promise((resolve) => {
        setTimeout(() => resolve(num + 5), 500);
    });
}

function multiplyByTwo(num: number): Promise<number> {
    return new Promise((resolve) => {
        setTimeout(() => resolve(num * 2), 500);
    });
}

// Test Part 4
addFive(10)
    .then((res) => {
        console.log("After addFive:", res);
        return multiplyByTwo(res);
    })
    .then((res) => console.log("After multiplyByTwo:", res));

// =========================
// Part 5: Bonus Challenge 🌟
// =========================
function processData(num: number): Promise<string> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (num % 2 === 0) resolve(`Even number: ${num}`);
            else reject(`Odd number: ${num}`);
        }, 500);
    });
}

// Test Part 5
async function handleProcessData(num: number): Promise<void> {
    try {
        const result = await processData(num);
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

handleProcessData(8); // Even number: 8
handleProcessData(7); // Odd number: 7
