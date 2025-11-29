# Session 3: Asynchronous JavaScript & Node.js Fundamentals

## 📋 Session Agenda

**Part 1: Asynchronous JavaScript Patterns**
1. Why Asynchronous Programming? 
2. Callbacks 
3. Timers: setTimeout & setInterval 
4. Promises 
5. Async/Await 


**Part 2: Node.js Fundamentals**
1. Node.js Runtime Deep Dive 
2. File System Operations 
3. Path & Environment

---

## 📚 Session Objectives

By the end of this session, you will be able to:

1. Understand the difference between synchronous and asynchronous code
2. Master callback patterns and understand callback hell
3. Work with timers (setTimeout, setInterval)
4. Use Promises to handle async operations
5. Write clean async code with async/await
6. Understand how Node.js runtime works (Event Loop)
7. Perform file system operations
8. Work with paths and environment variables

---

# Part 1: Asynchronous JavaScript Patterns

## 1️⃣ Why Asynchronous Programming?

### The Problem with Synchronous Code

Imagine you're cooking dinner:

**Synchronous Approach (Blocking):**
```
1. Put water on stove → WAIT until it boils 
2. Cut vegetables → WAIT until done
3. Cook rice → WAIT until done 
Total: 35 minutes of standing around!
```

**Asynchronous Approach (Non-blocking):**
```
1. Put water on stove (starts boiling in background)
2. While water boils → Cut vegetables
3. While vegetables cook → Prepare rice
Total: 20 minutes, everything done in parallel!
```

### Code Example: The Difference

**Synchronous (Blocking):**
```typescript
// This blocks everything until done
function processFile() {
  console.log("Start reading file...");
  const data = readFileSync("large-file.txt"); // WAIT HERE
  console.log("File read complete!");
  console.log("Do other work");
}

// Output:
// Start reading file...
// [5 seconds pass... nothing else can happen]
// File read complete!
// Do other work
```

**Asynchronous (Non-blocking):**
```typescript
// This doesn't block, code continues
function processFile() {
  console.log("Start reading file...");
  readFileAsync("large-file.txt", (data) => {
    console.log("File read complete!");
  });
  console.log("Do other work");
}

// Output:
// Start reading file...
// Do other work
// [file reading happens in background]
// File read complete!
```

---

### Real-World Examples

**When You NEED Async:**
- 🌐 Making API calls (fetching data from servers)
- 📁 Reading/writing files
- 💾 Database queries
- ⏰ Setting timers or delays
- 👥 Handling multiple user requests

**Why Backend Needs Async:**
- Backend servers handle **hundreds/thousands** of requests simultaneously
- Without async, server would freeze waiting for each operation
- Async allows server to handle multiple operations at once
- Better performance and user experience

---

### Key Terminology

| Term | Meaning |
|------|---------|
| **Synchronous** | Code executes line by line, waits for each operation |
| **Asynchronous** | Code continues without waiting, operations happen in background |
| **Blocking** | Operation that stops code execution until complete |
| **Non-blocking** | Operation that allows code to continue while it works |

---

## 2️⃣ Callbacks

### What is a Callback?

A **callback** is simply a function passed as an argument to another function, to be executed later when something is done.

**Simple Analogy:**
Think of a callback like ordering food delivery:
1. You place an order (start async operation)
2. You give them your phone number (callback function)
3. You do other things while waiting
4. They call you when food arrives (callback is executed)

### Basic Callback Pattern

```typescript
// Simple callback example
function greet(name: string, callback: () => void) {
  console.log(`Hello ${name}!`);
  callback(); // Execute the callback
}

greet("Mohsen", () => {
  console.log("Callback executed!");
});

// Output:
// Hello Mohsen!
// Callback executed!
```

---

### Real Callback Example: File Reading

```typescript
import fs from 'fs';

// Reading a file with callback
fs.readFile('data.txt', 'utf8', (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }
  console.log("File content:", data);
});

console.log("This runs immediately!");

// Output:
// This runs immediately!
// [file reading happens...]
// File content: [file data here]
```

---

### Error-First Callback Convention

In Node.js, callbacks follow a standard pattern:
- **First parameter:** error object (null if no error)
- **Second parameter:** result data

```typescript
// Error-first callback pattern
function fetchData(callback: (err: Error | null, data?: string) => void) {
  // Simulate async operation
  setTimeout(() => {
    const success = Math.random() > 0.5;
    
    if (success) {
      callback(null, "Data fetched successfully!");
    } else {
      callback(new Error("Failed to fetch data"));
    }
  }, 1000);
}

// Using the callback
fetchData((err, data) => {
  if (err) {
    console.error("Error:", err.message);
    return;
  }
  console.log("Success:", data);
});
```

---

### The Problem: Callback Hell 🔥

When you have multiple async operations that depend on each other, callbacks get nested deeply:

```typescript
// Callback Hell Example (Pyramid of Doom)
fs.readFile('user.json', 'utf8', (err, userData) => {
  if (err) {
    console.error(err);
    return;
  }
  
  const user = JSON.parse(userData);
  
  fs.readFile(`posts/${user.id}.json`, 'utf8', (err, postsData) => {
    if (err) {
      console.error(err);
      return;
    }
    
    const posts = JSON.parse(postsData);
    
    fs.readFile(`comments/${posts[0].id}.json`, 'utf8', (err, commentsData) => {
      if (err) {
        console.error(err);
        return;
      }
      
      const comments = JSON.parse(commentsData);
      console.log(comments);
      
      // This is getting ridiculous! 😱
    });
  });
});
```

**Problems with Callback Hell:**
- ❌ Hard to read (pyramid shape)
- ❌ Difficult to maintain
- ❌ Error handling is repetitive
- ❌ Hard to debug

**Solution?** → Promises and Async/Await! (coming up next)

---

## 3️⃣ Timers: setTimeout & setInterval

### setTimeout() - Delay Execution

Execute code **once** after a specified delay.

```typescript
// Basic setTimeout
setTimeout(() => {
  console.log("This runs after 2 seconds");
}, 2000);

// setTimeout with parameters
function greet(name: string, age: number) {
  console.log(`Hello ${name}, you are ${age} years old`);
}

setTimeout(greet, 3000, "Mohsen", 28);
```

**Syntax:**
```typescript
setTimeout(callback, delayInMilliseconds, arg1, arg2, ...);
```

---

### clearTimeout() - Cancel Delayed Execution

```typescript
// Set a timeout and save its ID
const timeoutId = setTimeout(() => {
  console.log("This will never run!");
}, 5000);

// Cancel it before it executes
clearTimeout(timeoutId);
console.log("Timeout cancelled!");
```

**Use Case:** Cancel operations when user navigates away or conditions change.

---

### setInterval() - Repeat Execution

Execute code **repeatedly** at specified intervals.

```typescript
// Basic setInterval
let count = 0;
const intervalId = setInterval(() => {
  count++;
  console.log(`Count: ${count}`);
  
  // Stop after 5 times
  if (count === 5) {
    clearInterval(intervalId);
    console.log("Interval stopped!");
  }
}, 1000);

// Output:
// Count: 1 (after 1 sec)
// Count: 2 (after 2 sec)
// Count: 3 (after 3 sec)
// Count: 4 (after 4 sec)
// Count: 5 (after 5 sec)
// Interval stopped!
```

---

### Practical Timer Examples

**Example 1: Rate Limiting**
```typescript
// Limit API calls to once per second
let lastCallTime = 0;

function makeApiCall() {
  const now = Date.now();
  
  if (now - lastCallTime < 1000) {
    console.log("Rate limited! Please wait...");
    return;
  }
  
  lastCallTime = now;
  console.log("API call made!");
  // Make actual API call here
}
```

**Example 2: Simple Polling**
```typescript
// Check for updates every 5 seconds
function pollForUpdates() {
  setInterval(async () => {
    console.log("Checking for updates...");
    // Check server for new data
    const hasUpdates = await checkServer();
    
    if (hasUpdates) {
      console.log("New updates available!");
    }
  }, 5000);
}
```

**Example 3: Countdown Timer**
```typescript
function countdown(seconds: number) {
  let remaining = seconds;
  
  const intervalId = setInterval(() => {
    console.log(`${remaining} seconds remaining...`);
    remaining--;
    
    if (remaining < 0) {
      clearInterval(intervalId);
      console.log("Time's up!");
    }
  }, 1000);
}

countdown(5);
```

---

### ⚠️ Common Timer Pitfalls

**1. Not Clearing Intervals (Memory Leaks)**
```typescript
// ❌ BAD: Interval never stops
function startPolling() {
  setInterval(() => {
    console.log("Polling...");
  }, 1000);
}
startPolling(); // Runs forever!

// ✅ GOOD: Save ID and clear when done
function startPolling() {
  const intervalId = setInterval(() => {
    console.log("Polling...");
  }, 1000);
  
  return () => clearInterval(intervalId); // Return cleanup function
}

const stopPolling = startPolling();
// Later...
stopPolling(); // Properly cleaned up
```

**2. Zero Delay Doesn't Mean Immediate**
```typescript
console.log("1");

setTimeout(() => {
  console.log("2");
}, 0); // Zero delay!

console.log("3");

// Output: 1, 3, 2 (not 1, 2, 3!)
// Why? Event loop processes setTimeout after current code
```

---

## 4️⃣ Promises

### What Problems Do Promises Solve?

Remember callback hell? Promises make async code:
- ✅ Easier to read (no pyramid of doom)
- ✅ Easier to error handle
- ✅ Easier to chain operations
- ✅ Composable and reusable

---

### Promise States

A Promise is always in one of three states:

```typescript
// 1. PENDING - Initial state, operation not completed yet
const promise = new Promise((resolve, reject) => {
  // Operation in progress...
});

// 2. FULFILLED - Operation completed successfully
const promise = new Promise((resolve, reject) => {
  resolve("Success!");
});

// 3. REJECTED - Operation failed
const promise = new Promise((resolve, reject) => {
  reject(new Error("Failed!"));
});
```

**State Transition:**
```
PENDING → FULFILLED (success)
   ↓
   → REJECTED (failure)
```

Once a Promise is fulfilled or rejected, its state **cannot change**.

---

### Creating Promises

```typescript
// Basic Promise creation
const myPromise = new Promise<string>((resolve, reject) => {
  // Simulate async operation
  setTimeout(() => {
    const success = true;
    
    if (success) {
      resolve("Operation successful!"); // Fulfill the promise
    } else {
      reject(new Error("Operation failed!")); // Reject the promise
    }
  }, 1000);
});
```

---

### Using Promises: .then() and .catch()

```typescript
// Using .then() for success
myPromise
  .then((result) => {
    console.log("Success:", result);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

// Chaining multiple .then()
fetchUser()
  .then((user) => {
    console.log("Got user:", user);
    return fetchUserPosts(user.id); // Return another promise
  })
  .then((posts) => {
    console.log("Got posts:", posts);
    return fetchPostComments(posts[0].id); // Return another promise
  })
  .then((comments) => {
    console.log("Got comments:", comments);
  })
  .catch((error) => {
    console.error("Error in chain:", error);
  });
```

**Key Benefit:** No more callback hell! Code flows top-to-bottom.

---

### Converting Callbacks to Promises

```typescript
// Old callback style
fs.readFile('data.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});

// Convert to Promise
const readFilePromise = (path: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

// Use the Promise
readFilePromise('data.txt')
  .then(data => console.log(data))
  .catch(err => console.error(err));
```

---

### Promise Utility Methods

#### 1. Promise.all() - Wait for All

Execute multiple promises in parallel and wait for **all** to complete.

```typescript
// Run multiple operations in parallel
const promise1 = fetch('/api/users');
const promise2 = fetch('/api/posts');
const promise3 = fetch('/api/comments');

Promise.all([promise1, promise2, promise3])
  .then(([users, posts, comments]) => {
    console.log("All data fetched!");
    console.log({ users, posts, comments });
  })
  .catch((error) => {
    console.error("At least one failed:", error);
  });
```

**Behavior:**
- ✅ All succeed → Returns array of all results
- ❌ Any fails → Entire Promise.all rejects

**Use Case:** When you need all operations to succeed.

---

#### 2. Promise.race() - First to Finish

Returns the result of the **first** promise to settle (fulfill or reject).

```typescript
const slowPromise = new Promise((resolve) => {
  setTimeout(() => resolve("Slow result"), 3000);
});

const fastPromise = new Promise((resolve) => {
  setTimeout(() => resolve("Fast result"), 1000);
});

Promise.race([slowPromise, fastPromise])
  .then((result) => {
    console.log("Winner:", result); // "Fast result"
  });
```

**Use Case:** Timeout patterns, fastest data source wins.

---

#### 3. Promise.allSettled() - Wait for All, Regardless

Waits for all promises, but doesn't fail if some reject.

```typescript
const promises = [
  Promise.resolve("Success 1"),
  Promise.reject("Error 1"),
  Promise.resolve("Success 2"),
];

Promise.allSettled(promises)
  .then((results) => {
    results.forEach((result) => {
      if (result.status === "fulfilled") {
        console.log("Success:", result.value);
      } else {
        console.log("Failed:", result.reason);
      }
    });
  });

// Output:
// Success: Success 1
// Failed: Error 1
// Success: Success 2
```

**Use Case:** When you want results from all attempts, even if some fail.

---

#### 4. Promise.any() - First Success

Returns the first promise that **fulfills**, ignoring rejections.

```typescript
const promises = [
  Promise.reject("Error 1"),
  Promise.resolve("Success 1"),
  Promise.resolve("Success 2"),
];

Promise.any(promises)
  .then((result) => {
    console.log("First success:", result); // "Success 1"
  })
  .catch((error) => {
    console.log("All failed:", error);
  });
```

**Use Case:** Multiple fallback sources, use first successful one.

---

### Promise Comparison Table

| Method | Behavior | Use Case |
|--------|----------|----------|
| `Promise.all()` | Fails if any fails | Need all operations to succeed |
| `Promise.race()` | Returns first to settle | Timeout patterns, fastest wins |
| `Promise.allSettled()` | Never fails, returns all results | Want results from all attempts |
| `Promise.any()` | Returns first success | Multiple fallback options |

---

## 5️⃣ Async/Await

### What is Async/Await?

**Async/await** is syntactic sugar over Promises that makes async code **look and behave like synchronous code**.

**The Magic:**
- `async` keyword: Declares an async function
- `await` keyword: Pauses execution until Promise resolves
- Makes code easier to read and reason about

---

### Basic Async/Await Syntax

```typescript
// Traditional Promise
function fetchData(): Promise<string> {
  return fetch('/api/data')
    .then(response => response.json())
    .then(data => data.message);
}

// Async/Await version
async function fetchData(): Promise<string> {
  const response = await fetch('/api/data');
  const data = await response.json();
  return data.message;
}
```

**Key Rules:**
1. `await` can only be used inside `async` functions
2. `async` functions always return a Promise
3. `await` pauses execution until Promise resolves

---

### Error Handling with Try/Catch

```typescript
// Promise .catch() style
function fetchUser(id: number) {
  return fetch(`/api/users/${id}`)
    .then(response => response.json())
    .catch(error => {
      console.error("Error:", error);
      throw error;
    });
}

// Async/await with try/catch
async function fetchUser(id: number) {
  try {
    const response = await fetch(`/api/users/${id}`);
    const user = await response.json();
    return user;
  } catch (error) {
    console.error("Error:", error);
    throw error; // Re-throw or handle
  }
}
```

---

### Comparing All Patterns: The Evolution

Let's solve the same problem using all three patterns:

**Problem:** Read user file, then read their posts, then read comments.

#### Callback Hell Version
```typescript
fs.readFile('user.json', 'utf8', (err, userData) => {
  if (err) throw err;
  const user = JSON.parse(userData);
  
  fs.readFile(`posts/${user.id}.json`, 'utf8', (err, postsData) => {
    if (err) throw err;
    const posts = JSON.parse(postsData);
    
    fs.readFile(`comments/${posts[0].id}.json`, 'utf8', (err, commentsData) => {
      if (err) throw err;
      const comments = JSON.parse(commentsData);
      console.log(comments);
    });
  });
});
```

#### Promise Chain Version
```typescript
readFilePromise('user.json')
  .then(userData => {
    const user = JSON.parse(userData);
    return readFilePromise(`posts/${user.id}.json`);
  })
  .then(postsData => {
    const posts = JSON.parse(postsData);
    return readFilePromise(`comments/${posts[0].id}.json`);
  })
  .then(commentsData => {
    const comments = JSON.parse(commentsData);
    console.log(comments);
  })
  .catch(error => console.error(error));
```

#### Async/Await Version (Cleanest!)
```typescript
async function fetchUserComments() {
  try {
    const userData = await readFilePromise('user.json');
    const user = JSON.parse(userData);
    
    const postsData = await readFilePromise(`posts/${user.id}.json`);
    const posts = JSON.parse(postsData);
    
    const commentsData = await readFilePromise(`comments/${posts[0].id}.json`);
    const comments = JSON.parse(commentsData);
    
    console.log(comments);
  } catch (error) {
    console.error(error);
  }
}
```

**Winner:** Async/await! 🏆 Reads like synchronous code but executes asynchronously.

---

### Parallel Operations with Async/Await

```typescript
// ❌ Sequential (slow) - Each waits for previous
async function fetchAllDataSequential() {
  const users = await fetch('/api/users');      // Wait 1s
  const posts = await fetch('/api/posts');      // Wait 1s
  const comments = await fetch('/api/comments'); // Wait 1s
  // Total: 3 seconds
  return { users, posts, comments };
}

// ✅ Parallel (fast) - All start at once
async function fetchAllDataParallel() {
  const [users, posts, comments] = await Promise.all([
    fetch('/api/users'),      // All start
    fetch('/api/posts'),      // at the
    fetch('/api/comments'),   // same time!
  ]);
  // Total: 1 second (all run together)
  return { users, posts, comments };
}
```

---

### When to Use Async/Await vs Promises

**Use Async/Await When:**
- ✅ Code needs to read sequentially
- ✅ You want cleaner error handling with try/catch
- ✅ Complex logic with multiple async operations
- ✅ You want code that looks synchronous

**Use Promise.then() When:**
- ✅ Simple one-off operations
- ✅ Chaining operations functionally
- ✅ Working with Promise utilities (Promise.all, etc.)
- ✅ You prefer functional style

**Real Talk:** Async/await is preferred in modern code, but knowing both is essential!

---

### Common Async/Await Mistakes

#### Mistake 1: Forgetting to Await
```typescript
// ❌ BAD: Returns Promise, not value
async function getData() {
  const data = fetchData(); // Missing await!
  console.log(data); // Promise { <pending> }
}

// ✅ GOOD
async function getData() {
  const data = await fetchData();
  console.log(data); // Actual data
}
```

#### Mistake 2: Sequential Instead of Parallel
```typescript
// ❌ SLOW: Sequential (3 seconds)
async function fetchAll() {
  const user = await fetchUser();    // 1s
  const posts = await fetchPosts();  // 1s
  const likes = await fetchLikes();  // 1s
}

// ✅ FAST: Parallel (1 second)
async function fetchAll() {
  const [user, posts, likes] = await Promise.all([
    fetchUser(),
    fetchPosts(),
    fetchLikes(),
  ]);
}
```

#### Mistake 3: Not Handling Errors
```typescript
// ❌ BAD: Unhandled errors crash app
async function getData() {
  const data = await fetchData(); // What if this fails?
  return data;
}

// ✅ GOOD: Always handle errors
async function getData() {
  try {
    const data = await fetchData();
    return data;
  } catch (error) {
    console.error("Failed to fetch:", error);
    return null; // Or throw, depending on needs
  }
}
```

---

## 🎯 Part 1 Summary

### Pattern Evolution
```
Callbacks → Promises → Async/Await
(Hell)      (Better)    (Best!)
```

### Key Takeaways
1. ✅ **Async is essential** for backend (non-blocking operations)
2. ✅ **Callbacks** are the foundation but create "callback hell"
3. ✅ **Timers** (setTimeout/setInterval) for delays and repeating tasks
4. ✅ **Promises** solve callback hell with chainable operations
5. ✅ **Async/Await** makes async code look synchronous (cleanest!)

---

# Part 2: Node.js Fundamentals

## 6️⃣ Node.js Runtime Deep Dive

### What is Node.js?

**Simple Definition:**
Node.js is a JavaScript runtime that lets you run JavaScript **outside the browser**, on servers and computers.

**Technical Definition:**
```
Node.js = V8 Engine + libuv + Node APIs
```

**Components:**
1. **V8 Engine** - Google's JavaScript engine (compiles JS to machine code)
2. **libuv** - C library for async I/O, event loop, threading
3. **Node APIs** - Built-in modules (fs, http, path, etc.)

---

### Why Node.js is Special

**Traditional Server (PHP, Ruby):**
```
Request 1 → Server creates Thread 1 → Process → Response
Request 2 → Server creates Thread 2 → Process → Response
Request 3 → Server creates Thread 3 → Process → Response
```
- Each request = new thread
- Threads are expensive (memory, CPU)
- Limited scalability

**Node.js (Event-Driven):**
```
Request 1 → Event Loop → Queue → Process → Response
Request 2 → Event Loop → Queue → Process → Response
Request 3 → Event Loop → Queue → Process → Response
```
- Single thread handles all requests
- Non-blocking I/O
- Scales to thousands of requests

**Result:** Node.js can handle more requests with less resources! 🚀

---

### The Event Loop Explained

The **Event Loop** is the heart of Node.js - it's what makes async possible.

**How it Works:**

```
┌───────────────────────────┐
│       Call Stack          │ ← Your code runs here
└───────────────────────────┘
           ↓
┌───────────────────────────┐
│     Node APIs             │ ← setTimeout, fs, etc.
└───────────────────────────┘
           ↓
┌───────────────────────────┐
│    Callback Queue         │ ← Callbacks wait here
└───────────────────────────┘
           ↓
┌───────────────────────────┐
│      Event Loop           │ ← Moves callbacks to stack
└───────────────────────────┘
```

**Example:**
```typescript
console.log("1");

setTimeout(() => {
  console.log("2");
}, 0);

console.log("3");

// Output: 1, 3, 2
// Why? Event loop processes setTimeout after current code
```

**Step by Step:**
1. `console.log("1")` → Executes immediately
2. `setTimeout(...)` → Sent to Node APIs, callback queued
3. `console.log("3")` → Executes immediately
4. Event Loop moves callback to stack
5. `console.log("2")` → Executes

---

### Single-Threaded but Non-Blocking

**The Confusion:**
- "Node.js is single-threaded" ✅ TRUE (your JS runs on one thread)
- "Node.js can't do parallel work" ❌ FALSE! (libuv uses thread pool)

**How it Actually Works:**

```typescript
// Your code (single thread)
console.log("Start");

// File reading (sent to libuv thread pool)
fs.readFile("large-file.txt", (err, data) => {
  console.log("File read done!");
});

// Your code continues (non-blocking!)
console.log("End");

// Output:
// Start
// End
// File read done!
```

**Behind the Scenes:**
- Your JS runs on main thread
- Heavy operations (file I/O, network) → libuv thread pool
- When operation completes → callback added to event loop
- Main thread picks up and executes callback

**Result:** Single-threaded JS code, but parallel I/O operations! 🎯

---

### Global Objects in Node.js

Unlike browsers (where globals are `window`), Node.js has different globals:

```typescript
// __dirname - Current directory path
console.log(__dirname);
// Output: /home/user/project/src

// __filename - Current file path
console.log(__filename);
// Output: /home/user/project/src/index.ts

// process - Info about current Node.js process
console.log(process.version);    // Node version
console.log(process.platform);   // OS platform
console.log(process.pid);        // Process ID
console.log(process.env);        // Environment variables

// global - Like window in browser
global.myVar = "Hello";
console.log(global.myVar); // "Hello"
```

---

### Process Object Deep Dive

```typescript
// Exit codes
process.exit(0); // Success
process.exit(1); // Error

// Process events
process.on('exit', (code) => {
  console.log(`Exiting with code: ${code}`);
});

process.on('uncaughtException', (error) => {
  console.error('Unhandled error:', error);
  process.exit(1);
});

// Command line arguments
// Run: node app.ts arg1 arg2
console.log(process.argv);
// Output: ['/usr/bin/node', '/path/to/app.ts', 'arg1', 'arg2']

// Memory usage
console.log(process.memoryUsage());
// Output: { rss: 24000000, heapTotal: 6000000, ... }

// Current working directory
console.log(process.cwd());
// Output: /home/user/project
```

---

## 7️⃣ File System Operations

### The `fs` Module

Node.js provides the `fs` module for file system operations.

**Three Versions:**
1. **Callback-based** (old way)
2. **Promise-based** (modern way)
3. **Synchronous** (blocking, avoid in production)

---

### Sync vs Async Methods

#### Synchronous (Blocking) - Use Sparingly!

```typescript
import fs from 'fs';

console.log("Start");

// BLOCKS everything until file is read
const data = fs.readFileSync('data.txt', 'utf8');
console.log(data);

console.log("End");

// Output (sequential):
// Start
// [file content]
// End
```

**When to Use Sync:**
- ✅ Startup configuration (reading config files on app start)
- ✅ Simple scripts where performance doesn't matter
- ❌ NEVER in request handlers or production servers!

---

#### Asynchronous (Non-Blocking) - Best Practice!

**Method 1: Callback Style (Old)**
```typescript
import fs from 'fs';

console.log("Start");

fs.readFile('data.txt', 'utf8', (err, data) => {
  if (err) {
    console.error("Error:", err);
    return;
  }
  console.log(data);
});

console.log("End");

// Output (async):
// Start
// End
// [file content]
```

**Method 2: Promise Style (Modern!)**
```typescript
import { promises as fs } from 'fs';

console.log("Start");

fs.readFile('data.txt', 'utf8')
  .then(data => console.log(data))
  .catch(err => console.error("Error:", err));

console.log("End");

// Output (async):
// Start
// End
// [file content]
```

**Method 3: Async/Await (Best!)**
```typescript
import { promises as fs } from 'fs';

async function readData() {
  try {
    console.log("Start");
    const data = await fs.readFile('data.txt', 'utf8');
    console.log(data);
    console.log("End");
  } catch (err) {
    console.error("Error:", err);
  }
}

readData();
```

---

### Common File Operations

#### 1. Reading Files

```typescript
import { promises as fs } from 'fs';

// Read as string
async function readTextFile() {
  try {
    const data = await fs.readFile('file.txt', 'utf8');
    console.log(data);
  } catch (error) {
    console.error('Error reading file:', error);
  }
}

// Read as buffer (binary data)
async function readBinaryFile() {
  try {
    const buffer = await fs.readFile('image.png');
    console.log(buffer); // <Buffer 89 50 4e 47 ...>
  } catch (error) {
    console.error('Error reading file:', error);
  }
}

// Check if file exists
async function fileExists(path: string): Promise<boolean> {
  try {
    await fs.access(path);
    return true;
  } catch {
    return false;
  }
}
```

---

#### 2. Writing Files

```typescript
import { promises as fs } from 'fs';

// Write string to file (overwrites existing)
async function writeFile() {
  try {
    await fs.writeFile('output.txt', 'Hello, Node.js!');
    console.log('File written successfully');
  } catch (error) {
    console.error('Error writing file:', error);
  }
}

// Append to file (doesn't overwrite)
async function appendToFile() {
  try {
    await fs.appendFile('log.txt', 'New log entry\n');
    console.log('Content appended');
  } catch (error) {
    console.error('Error appending:', error);
  }
}

// Write JSON data
async function writeJSON() {
  const data = {
    name: 'Mohsen',
    age: 28,
    committee: 'Backend'
  };
  
  try {
    await fs.writeFile(
      'data.json',
      JSON.stringify(data, null, 2) // Pretty print with 2 spaces
    );
    console.log('JSON written successfully');
  } catch (error) {
    console.error('Error writing JSON:', error);
  }
}
```

---

#### 3. Copying Files

```typescript
import { promises as fs } from 'fs';

// Simple copy
async function copyFile() {
  try {
    await fs.copyFile('source.txt', 'destination.txt');
    console.log('File copied successfully');
  } catch (error) {
    console.error('Error copying file:', error);
  }
}

// Copy with overwrite protection
async function safeCopyFile(src: string, dest: string) {
  try {
    // Check if destination exists
    const exists = await fileExists(dest);
    
    if (exists) {
      console.log('Destination already exists!');
      return;
    }
    
    await fs.copyFile(src, dest);
    console.log('File copied successfully');
  } catch (error) {
    console.error('Error copying file:', error);
  }
}
```

---

#### 4. Deleting Files

```typescript
import { promises as fs } from 'fs';

// Delete a file
async function deleteFile(path: string) {
  try {
    await fs.unlink(path);
    console.log(`Deleted: ${path}`);
  } catch (error) {
    console.error('Error deleting file:', error);
  }
}

// Safe delete (check if exists first)
async function safeDeleteFile(path: string) {
  try {
    const exists = await fileExists(path);
    
    if (!exists) {
      console.log('File does not exist');
      return;
    }
    
    await fs.unlink(path);
    console.log(`Deleted: ${path}`);
  } catch (error) {
    console.error('Error deleting file:', error);
  }
}
```

---

#### 5. Getting File Information

```typescript
import { promises as fs } from 'fs';

async function getFileInfo(path: string) {
  try {
    const stats = await fs.stat(path);
    
    console.log({
      size: stats.size,           // Size in bytes
      isFile: stats.isFile(),     // Is it a file?
      isDirectory: stats.isDirectory(), // Is it a directory?
      created: stats.birthtime,   // Creation time
      modified: stats.mtime,      // Last modified time
    });
  } catch (error) {
    console.error('Error getting file info:', error);
  }
}
```

---

### Working with Directories

#### Creating Directories

```typescript
import { promises as fs } from 'fs';

// Create single directory
async function createDir() {
  try {
    await fs.mkdir('new-folder');
    console.log('Directory created');
  } catch (error) {
    console.error('Error creating directory:', error);
  }
}

// Create nested directories
async function createNestedDirs() {
  try {
    await fs.mkdir('path/to/nested/folder', { recursive: true });
    console.log('Nested directories created');
  } catch (error) {
    console.error('Error creating directories:', error);
  }
}
```

---

#### Reading Directories

```typescript
import { promises as fs } from 'fs';

// List files in directory
async function listFiles(dirPath: string) {
  try {
    const files = await fs.readdir(dirPath);
    console.log('Files:', files);
    // Output: ['file1.txt', 'file2.js', 'subfolder']
  } catch (error) {
    console.error('Error reading directory:', error);
  }
}

// Get detailed file information
async function listFilesDetailed(dirPath: string) {
  try {
    const files = await fs.readdir(dirPath, { withFileTypes: true });
    
    for (const file of files) {
      const type = file.isDirectory() ? 'DIR' : 'FILE';
      console.log(`${type}: ${file.name}`);
    }
  } catch (error) {
    console.error('Error reading directory:', error);
  }
}
```

---

#### Deleting Directories

```typescript
import { promises as fs } from 'fs';

// Delete empty directory
async function deleteEmptyDir(path: string) {
  try {
    await fs.rmdir(path);
    console.log('Directory deleted');
  } catch (error) {
    console.error('Error deleting directory:', error);
  }
}

// Delete directory with contents
async function deleteDir(path: string) {
  try {
    await fs.rm(path, { recursive: true, force: true });
    console.log('Directory and contents deleted');
  } catch (error) {
    console.error('Error deleting directory:', error);
  }
}
```

---

### Real-World Example: File Processing

```typescript
import { promises as fs } from 'fs';
import path from 'path';

// Process multiple text files
async function processFiles() {
  try {
    // 1. Read directory
    const files = await fs.readdir('./data');
    
    // 2. Filter .txt files
    const textFiles = files.filter(file => file.endsWith('.txt'));
    
    // 3. Process each file
    for (const file of textFiles) {
      const filePath = path.join('./data', file);
      
      // Read file
      const content = await fs.readFile(filePath, 'utf8');
      
      // Transform content
      const processed = content.toUpperCase();
      
      // Write to new location
      const outputPath = path.join('./output', file);
      await fs.writeFile(outputPath, processed);
      
      console.log(`Processed: ${file}`);
    }
    
    console.log('All files processed!');
  } catch (error) {
    console.error('Error processing files:', error);
  }
}

processFiles();
```

---

### Error Handling Best Practices

```typescript
import { promises as fs } from 'fs';

// Specific error handling
async function readFileSafe(path: string) {
  try {
    const data = await fs.readFile(path, 'utf8');
    return data;
  } catch (error: any) {
    // Handle specific error codes
    if (error.code === 'ENOENT') {
      console.error('File not found:', path);
    } else if (error.code === 'EACCES') {
      console.error('Permission denied:', path);
    } else if (error.code === 'EISDIR') {
      console.error('Path is a directory:', path);
    } else {
      console.error('Unknown error:', error);
    }
    
    return null;
  }
}

// Retry logic
async function readFileWithRetry(
  path: string,
  maxRetries: number = 3
): Promise<string | null> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const data = await fs.readFile(path, 'utf8');
      return data;
    } catch (error) {
      console.log(`Attempt ${attempt} failed`);
      
      if (attempt === maxRetries) {
        console.error('Max retries reached');
        return null;
      }
      
      // Wait before retry (exponential backoff)
      await new Promise(resolve => 
        setTimeout(resolve, Math.pow(2, attempt) * 1000)
      );
    }
  }
  
  return null;
}
```

---

## 8️⃣ Path & Environment

### The Path Module

The `path` module provides utilities for working with file and directory paths.

**Why Use Path Module?**
- ✅ Cross-platform compatibility (Windows vs Unix)
- ✅ Handles edge cases (trailing slashes, etc.)
- ✅ Prevents path-related bugs

---

#### Path Operations

```typescript
import path from 'path';

// Join paths (cross-platform)
const fullPath = path.join('users', 'mohsen', 'documents', 'file.txt');
console.log(fullPath);
// Unix: users/mohsen/documents/file.txt
// Windows: users\mohsen\documents\file.txt

// Resolve absolute path
const absolutePath = path.resolve('src', 'app.ts');
console.log(absolutePath);
// Output: /home/user/project/src/app.ts

// Get directory name
const dirName = path.dirname('/users/mohsen/file.txt');
console.log(dirName); // /users/mohsen

// Get file name
const fileName = path.basename('/users/mohsen/file.txt');
console.log(fileName); // file.txt

// Get file extension
const ext = path.extname('/users/mohsen/file.txt');
console.log(ext); // .txt

// Parse path into parts
const parsed = path.parse('/users/mohsen/file.txt');
console.log(parsed);
// {
//   root: '/',
//   dir: '/users/mohsen',
//   base: 'file.txt',
//   ext: '.txt',
//   name: 'file'
// }

// Build path from parts
const built = path.format({
  dir: '/users/mohsen',
  base: 'file.txt'
});
console.log(built); // /users/mohsen/file.txt
```

---

#### Common Path Patterns

```typescript
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Build paths relative to current file
const configPath = path.join(__dirname, 'config', 'database.json');
const publicPath = path.join(__dirname, '..', 'public');

// Normalize path (clean up .., ., etc.)
const messyPath = '/users/mohsen/../yomna/./file.txt';
const cleanPath = path.normalize(messyPath);
console.log(cleanPath); // /users/yomna/file.txt

// Check if path is absolute
console.log(path.isAbsolute('/users/mohsen')); // true
console.log(path.isAbsolute('users/mohsen'));  // false

// Get relative path between two paths
const from = '/users/mohsen/projects';
const to = '/users/mohsen/documents/file.txt';
const relative = path.relative(from, to);
console.log(relative); // ../documents/file.txt
```

---

### Environment Variables

Environment variables store configuration values outside your code.

**Why Use Environment Variables?**
- ✅ Separate config from code
- ✅ Different settings for dev/staging/production
- ✅ Keep secrets secure (API keys, passwords)

---

#### Accessing Environment Variables

```typescript
// Access environment variables
console.log(process.env.NODE_ENV);      // 'development' or 'production'
console.log(process.env.PORT);          // Port number
console.log(process.env.DATABASE_URL);  // Database connection string

// Provide defaults
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'development';

// Type-safe access
function getEnvVar(key: string): string {
  const value = process.env[key];
  
  if (!value) {
    throw new Error(`Environment variable ${key} is not set`);
  }
  
  return value;
}

const apiKey = getEnvVar('API_KEY');
```

---

#### Setting Environment Variables

**Method 1: Command Line**
```bash
# Unix/Mac
PORT=3000 NODE_ENV=production node app.js

# Windows (CMD)
set PORT=3000 && node app.js

# Windows (PowerShell)
$env:PORT=3000; node app.js
```

**Method 2: .env File (with dotenv package)**
```bash
# .env file
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://localhost:5432/mydb
API_KEY=secret-key-here
```

```typescript
// Load .env file
import 'dotenv/config';

// Now accessible
console.log(process.env.PORT); // 3000
console.log(process.env.API_KEY); // secret-key-here
```

**Method 3: package.json Scripts**
```json
{
  "scripts": {
    "start": "NODE_ENV=production node dist/app.js",
    "dev": "NODE_ENV=development nodemon src/app.ts"
  }
}
```

---

#### Environment Best Practices

```typescript
// config.ts - Centralized configuration
interface Config {
  port: number;
  nodeEnv: string;
  database: {
    url: string;
    poolSize: number;
  };
  api: {
    key: string;
    baseUrl: string;
  };
}

function loadConfig(): Config {
  // Validate required variables
  const requiredVars = ['DATABASE_URL', 'API_KEY'];
  
  for (const varName of requiredVars) {
    if (!process.env[varName]) {
      throw new Error(`Missing required environment variable: ${varName}`);
    }
  }
  
  return {
    port: parseInt(process.env.PORT || '3000', 10),
    nodeEnv: process.env.NODE_ENV || 'development',
    database: {
      url: process.env.DATABASE_URL!,
      poolSize: parseInt(process.env.DB_POOL_SIZE || '10', 10),
    },
    api: {
      key: process.env.API_KEY!,
      baseUrl: process.env.API_BASE_URL || 'https://api.example.com',
    },
  };
}

export const config = loadConfig();

// Usage in other files
import { config } from './config';

console.log(`Server running on port ${config.port}`);
```

---

### Command Line Arguments

```typescript
// Access command line arguments
console.log(process.argv);

// Example: node app.ts --port 3000 --env production
// Output: [
//   '/usr/bin/node',           // Node binary
//   '/path/to/app.ts',         // Script path
//   '--port',                  // Argument 1
//   '3000',                    // Argument 2
//   '--env',                   // Argument 3
//   'production'               // Argument 4
// ]

// Simple argument parser
function parseArgs() {
  const args: Record<string, string> = {};
  
  for (let i = 2; i < process.argv.length; i += 2) {
    const key = process.argv[i].replace('--', '');
    const value = process.argv[i + 1];
    args[key] = value;
  }
  
  return args;
}

const args = parseArgs();
console.log(args);
// { port: '3000', env: 'production' }
```

---

## 🎯 Complete Example: Log File Manager

Let's build a real-world example combining everything we learned:

```typescript
import { promises as fs } from 'fs';
import path from 'path';

interface LogEntry {
  timestamp: string;
  level: 'info' | 'warning' | 'error';
  message: string;
}

class LogManager {
  private logDir: string;
  private currentLogFile: string;

  constructor(logDir: string = './logs') {
    this.logDir = logDir;
    this.currentLogFile = this.getLogFileName();
  }

  // Initialize log directory
  async initialize(): Promise<void> {
    try {
      await fs.mkdir(this.logDir, { recursive: true });
      console.log('Log directory ready');
    } catch (error) {
      console.error('Failed to create log directory:', error);
      throw error;
    }
  }

  // Generate log file name based on current date
  private getLogFileName(): string {
    const date = new Date().toISOString().split('T')[0];
    return path.join(this.logDir, `app-${date}.log`);
  }

  // Write log entry
  async log(level: LogEntry['level'], message: string): Promise<void> {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
    };

    const logLine = `[${entry.timestamp}] ${entry.level.toUpperCase()}: ${entry.message}\n`;

    try {
      await fs.appendFile(this.currentLogFile, logLine);
    } catch (error) {
      console.error('Failed to write log:', error);
    }
  }

  // Convenience methods
  async info(message: string): Promise<void> {
    await this.log('info', message);
  }

  async warning(message: string): Promise<void> {
    await this.log('warning', message);
  }

  async error(message: string): Promise<void> {
    await this.log('error', message);
  }

  // Read today's logs
  async readTodayLogs(): Promise<string> {
    try {
      const data = await fs.readFile(this.currentLogFile, 'utf8');
      return data;
    } catch (error: any) {
      if (error.code === 'ENOENT') {
        return 'No logs for today';
      }
      throw error;
    }
  }

  // Delete old logs (older than specified days)
  async cleanOldLogs(daysToKeep: number = 7): Promise<number> {
    try {
      const files = await fs.readdir(this.logDir);
      const now = Date.now();
      const maxAge = daysToKeep * 24 * 60 * 60 * 1000;
      let deletedCount = 0;

      for (const file of files) {
        const filePath = path.join(this.logDir, file);
        const stats = await fs.stat(filePath);
        const age = now - stats.mtime.getTime();

        if (age > maxAge) {
          await fs.unlink(filePath);
          deletedCount++;
          console.log(`Deleted old log: ${file}`);
        }
      }

      return deletedCount;
    } catch (error) {
      console.error('Error cleaning logs:', error);
      return 0;
    }
  }

  // Get log statistics
  async getStats(): Promise<{
    totalLogs: number;
    totalSize: number;
    oldestLog: string | null;
  }> {
    try {
      const files = await fs.readdir(this.logDir);
      let totalSize = 0;
      let oldestDate = Infinity;
      let oldestLog: string | null = null;

      for (const file of files) {
        const filePath = path.join(this.logDir, file);
        const stats = await fs.stat(filePath);
        
        totalSize += stats.size;
        
        if (stats.mtime.getTime() < oldestDate) {
          oldestDate = stats.mtime.getTime();
          oldestLog = file;
        }
      }

      return {
        totalLogs: files.length,
        totalSize,
        oldestLog,
      };
    } catch (error) {
      console.error('Error getting stats:', error);
      return { totalLogs: 0, totalSize: 0, oldestLog: null };
    }
  }
}

// Usage example
async function main() {
  const logger = new LogManager('./logs');

  // Initialize
  await logger.initialize();

  // Write logs
  await logger.info('Application started');
  await logger.warning('Low memory warning');
  await logger.error('Database connection failed');

  // Read today's logs
  const logs = await logger.readTodayLogs();
  console.log('Today\'s logs:\n', logs);

  // Get statistics
  const stats = await logger.getStats();
  console.log('Log statistics:', stats);

  // Clean old logs (keep last 7 days)
  const deleted = await logger.cleanOldLogs(7);
  console.log(`Cleaned ${deleted} old log files`);
}

// Error handling
main().catch((error) => {
  console.error('Application error:', error);
  process.exit(1);
});
```

---

## 📚 Summary

### Key Concepts Covered

**Part 1: Async JavaScript**
1. ✅ Synchronous vs Asynchronous programming
2. ✅ Callbacks and callback hell
3. ✅ Timers (setTimeout, setInterval)
4. ✅ Promises and Promise utilities
5. ✅ Async/await syntax and patterns

**Part 2: Node.js Fundamentals**
1. ✅ Node.js runtime architecture (V8 + libuv)
2. ✅ Event Loop and non-blocking I/O
3. ✅ File system operations (read, write, copy, delete)
4. ✅ Directory operations
5. ✅ Path module for cross-platform paths
6. ✅ Environment variables and configuration
7. ✅ Command line arguments

---

## 🎯 Best Practices Recap

### Async Patterns
- ✅ Use async/await for cleaner code
- ✅ Always handle errors with try/catch
- ✅ Use Promise.all() for parallel operations
- ✅ Avoid mixing callback and Promise styles

### File Operations
- ✅ Always use async methods in production
- ✅ Use `fs.promises` instead of callbacks
- ✅ Always handle errors properly
- ✅ Close file handles when done

### Configuration
- ✅ Use environment variables for config
- ✅ Never commit secrets to Git
- ✅ Validate required variables on startup
- ✅ Provide sensible defaults

### Path Handling
- ✅ Always use `path.join()` for building paths
- ✅ Use `path.resolve()` for absolute paths
- ✅ Never hardcode path separators (/ or \)

---

## 🚀 Next Steps

**Practice Projects:**
1. Build a file backup utility
2. Create a log analyzer
3. Build a simple file server
4. Create a configuration manager
5. Build a CLI tool with command arguments

**Further Learning:**
- Explore streams for large files
- Learn about worker threads
- Study event emitters
- Practice with real APIs

---

## 💡 Common Pitfalls to Avoid

1. ❌ Using sync methods in server code
2. ❌ Not handling Promise rejections
3. ❌ Forgetting to await async functions
4. ❌ Not clearing intervals/timeouts
5. ❌ Hardcoding file paths
6. ❌ Not validating environment variables
7. ❌ Mixing async patterns (callbacks + promises)

---

## 🎓 Final Thoughts

**You now know:**
- How JavaScript handles async operations
- When and how to use different async patterns
- How Node.js runtime works under the hood
- How to work with files and directories
- How to handle configuration properly

**The journey continues:**
- Next sessions will build on these fundamentals
- You'll use these patterns in every backend project
- Practice is key to mastering async programming

**Remember:** Async programming is the heart of Node.js. Master it, and you'll master backend development! 🚀

---

## 📖 Additional Resources

For comprehensive tutorials, tools, and learning materials on async JavaScript and Node.js, refer to:
- [MDN: Asynchronous JavaScript](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous)
- [Node.js Official Docs](https://nodejs.org/docs/latest/api/)
- [JavaScript.info: Promises](https://javascript.info/promise-basics)

Happy coding! 💻