# Session-1 Agenda
0. [How JavaScript Runs Your Code (The 4 Phases)](#0️⃣-how-javascript-runs-your-code-the-4-phases)
1. [Brief Intro to JavaScript & NodeJs](#1️⃣-javascript-overview)
2. [Values & Variables](#2️⃣-values--variables)
3. [Data Types](#3️⃣-data-types)
4. [Type Conversion and Coercion](#4️⃣-type-conversion-and-coercion)
5. [Basic Operators](#5️⃣-basic-operators)
6. [Operator Precedence](#6️⃣-operator-precedence)
7. [If / else Statements](#7️⃣-if--else-statements)
8. [Statements and Expressions](#8️⃣-statements-and-expressions)
9. [Strings](#9️⃣-strings)
10. [Template Literals](#-template-literals)
11. [Functions and Arrow Functions](#1️⃣1️⃣-functions--arrow-functions)
12. [Intro to Arrays and Objects](#1️⃣2️⃣-intro-to-arrays-and-objects)
13. [Loops](#1️⃣3️⃣-loops)
14. [Comments](#1️⃣4️⃣-comments)
15. [HandsOn & Task](#1️⃣5️⃣-handson--task)

---

# 0️⃣ How JavaScript Runs Your Code (The 4 Phases)

### Phase 1 — Parsing Phase

The JavaScript engine reads your code and checks if it is valid.

- Checks syntax
- Builds the AST (Abstract Syntax Tree)
- Prepares for execution

 **If there is a syntax error → STOP, nothing runs.**

This is sometimes called **compile-time**, even though JavaScript is interpreted.

---

### Phase 2 — Creation Phase (Inside the Execution Context)

This happens **after parsing** but **before your code runs**.

For each scope (global, function, block):

**What happens here:**
- **Hoisting**
- Memory is allocated
- `var` → initialized with `undefined`
- `let` / `const` → put in Temporal Dead Zone (TDZ)
- `this` is set
- Lexical environment is created

 **Still, your code has not started executing.**

This phase is part of **run preparation**, not actual runtime.

---

### Phase 3 — Execution Phase (Inside the Execution Context)

Now JavaScript **executes your code line by line**.

**What happens here:**
- Values get assigned
- Functions execute
- Loops run
- `console.log` prints
- `setTimeout` is scheduled
- Errors like `TypeError` can happen

This is what most people call **runtime**.

---

### Phase 4 — Runtime / Event Loop Phase

This is when:
- Callbacks run
- `setTimeout` finishes
- Promises resolve
- DOM events fire

The JS engine keeps reacting to events and callbacks.

**This continues as long as your program is alive.**

---

## 🟡 Putting It All Together — In Order

Here is the full chain:

1. **Parsing Phase**
   - Syntax check
   - Build AST

2. **Creation Phase**
   - Hoisting
   - Memory setup
   - TDZ for `let`/`const`
   - `this` binding

3. **Execution Phase**
   - Code runs line by line

4. **Runtime / Event Loop Phase**
   - Background tasks, callbacks, microtasks
   - Asynchronous operations

---

## 🔥 Example Code Breakdown

```javascript
console.log(a);
let b = 10;
var a = 5;
```

### 1️⃣ Parsing
No syntax errors → continue.

### 2️⃣ Creation Phase
Memory allocated:
- `var a` → initialized as `undefined`
- `let b` → created but in TDZ
- `console` → exists

### 3️⃣ Execution Phase
Runs line by line:
- `console.log(a)` → prints `undefined`
- `let b = 10` → `b` is assigned
- `var a = 5` → `a` becomes `5`

### 4️⃣ Runtime
If there were async tasks, they would run here.

---

## 🔥 Example with Async Code

```javascript
console.log("Start");
setTimeout(() => console.log("Timeout"), 1000);
console.log("End");
```

**After pressing Run:**

1. **Parsing** - Check syntax ✅
2. **Creation** - Setup memory ✅
3. **Execution** - Prints "Start", schedules timeout, prints "End"
4. **Runtime** - After 1 second, prints "Timeout"

**Output:**
```
Start
End
Timeout  // (after 1 second)
```

---

## 🟢 Fast Summary Table

| Concept | Meaning | When it Happens |
|---------|---------|-----------------|
| **Parsing** | Syntax check + AST | Immediately after pressing Run (before execution) |
| **Creation Phase** | Hoisting + memory setup | First part of execution context (after parsing) |
| **Execution Phase** | Code runs line by line | After creation phase |
| **Runtime** | Event loop, async callbacks | After execution phase, continues indefinitely |

---

## 📊 The Two Parsers (Important Distinction!)

| Parser | When | Where | Purpose |
|--------|------|-------|---------|
| **Editor/IDE Parser** | As you type | Your code editor | Help you catch errors early |
| **JS Engine Parser** | When you press Run | Browser/Node.js | Actually execute your code |

**This is why you see syntax errors BEFORE running your code!**

---

## 🧠 Super Simple Analogy

**Parsing** = Checking the exam paper formatting
- Are questions valid? No syntax errors?

**Creation Phase** = Setting up the exam environment
- Give each student a desk (memory), assign their names (variables).

**Execution Phase** = Students writing answers
- Actual work is happening.

**Runtime** = Teacher checking hand-raises or time-outs
- Handling extra tasks, events, callbacks.

---

##  Common Misconceptions Clarified

### ❌ Wrong: "Parsing happens before I press Run"
✅ **Correct:** Your **editor** parses as you type (to help you), but the **JavaScript engine** parses when you press Run.

### ❌ Wrong: "Execution Phase and Runtime are the same"
✅ **Correct:** Execution Phase = synchronous code runs. Runtime Phase = event loop handles async operations.

### ❌ Wrong: "Hoisting happens during execution"
✅ **Correct:** Hoisting happens during the **Creation Phase**, before any code executes.

---

##  IMPORTANT: When Do These Phases Happen?

### Before You Press "Run" (In Your Editor/IDE)
- **Your code editor** (VS Code, WebStorm, etc.) has its own parser
- It checks syntax **as you type**
- Shows red squiggly lines and errors in real-time
- **This is NOT the JavaScript engine!** This is just your editor helping you

### After You Press "Run" (JavaScript Engine)
**ALL 4 phases happen in sequence:**

```
Press "Run" Button
       ↓
   [PARSING] ⚡ ~1-5ms (official syntax check by JS engine)
       ↓
   [CREATION] ⚡ ~<1ms (memory setup, hoisting)
       ↓
   [EXECUTION] ▶️ (your code runs line by line)
       ↓
   [RUNTIME] 🔄 (event loop keeps going...)
```

**Key Point:** Phases 1-3 happen almost instantly. Phase 4 continues as long as your program is alive.

---

# **************************
# 1️⃣ `JavaScript Overview`
# **************************
### 1_ What is JavaScript?

JavaScript (JS) is a programming language originally designed to make web pages interactive.

At first, it only ran in the browser (Front-End) — handling animations, user interactions, and validations.

After the creation of Node.js, JavaScript could also run on the server (Back-End).

### 2_ Key Characteristics of JavaScript

- High-Level Language: You don’t deal with low-level memory management.

- Interpreted: Code runs directly without a separate compilation step.

- Dynamically Typed: You don’t need to specify data types when declaring variables.

- Single-Threaded & Event-Driven: JS uses one main thread, but it handles multiple tasks efficiently through the event loop and asynchronous callbacks.

- Prototype-Based: Instead of traditional classes (like Java or C++), JS uses prototypes for object inheritance though modern JS also supports class syntax.

## 3_ Backend with Node.js
Node.js is a runtime environment that lets you run JavaScript outside the browser (on the server).

It uses Google’s V8 Engine (the same engine that powers Chrome) to execute JS code.

---
# **************************
# 2️⃣ `Values & Variables`
# **************************
Values represent data, while variables store these values for reuse. You can declare variables using `let`, `const`, or `var`:

```javascript
let age = 25;
const name = "John";
var isStudent = true;
```
## 1\_ `let` vs `var` vs `const` — Key Differences

### Quick Rule
✅ **Use `const` by default**

✅ **Use `let` when the value will change**

❌ **Avoid `var` completely**

---

## The 3 Main Differences

### 1. Scope

* **`var`** = **Function-scoped**
    * Escapes blocks like `if` and `for`:
    ```javascript
    if (true) {
      var x = 10;
    }
    console.log(x); // 10 (works!)
    ```

* **`let`** = **Block-scoped**
    * Stays inside `{}`:
    ```javascript
    if (true) {
      let y = 10;
    }
    console.log(y); // Error: y is not defined
    ```

* **`const`** = **Block-scoped** (same scope as `let`)
    ```javascript
    if (true) {
      const z = 10;
    }
    console.log(z); // Error
    ```
    ➡️ **`let` and `const` share the same scope rules.**

---

### 2. Re-declaration

* **`var`** allows re-declaration
    ```javascript
    var num = 10;
    var num = 12; // OK
    ```

* **`let`** does **NOT**
    ```javascript
    let count = 10;
    let count = 12; // ❌ Error
    ```

* **`const`** does **NOT**
    ```javascript
    const PI = 3.14;
    const PI = 3.14159; // ❌ Error
    ```

---

### 3. Re-assignment

* **`var`** → can change
    ```javascript
    var a = 5;
    a = 10; // OK
    ```

* **`let`** → can change
    ```javascript
    let b = 5;
    b = 10; // OK
    ```

* **`const`** → **cannot** change
    ```javascript
    const c = 5;
    c = 10; // ❌ Error
    ```
    > But data members inside objects/arrays in `const` can still change:
    > ```javascript
    > const user = { name: "Omnia" };
    > user.name = "Habiba"; // OK
    > user = {}; // ❌ Re-assigning the variable → Error
    > ```

---

### 4. Hoisting

* **`var`**
    * Hoisted
    * Initialized as `undefined`
    ```javascript
    console.log(x); // undefined
    var x = 5;
    ```

* **`let`**
    * Hoisted
    * Not initialized
    * Stays in the **Temporal Dead Zone (TDZ)**
    ```javascript
    console.log(y); // ❌ Error
    let y = 5;
    ```

* **`const`**
    * Same hoisting behavior as `let`
    * Also in the **TDZ**
    * **Must be initialized immediately**
    ```javascript
    console.log(z); // ❌ Error
    const z = 5;
    ```
---

## Classic Example: The Loop Bug

**Problem with `var`:**
```javascript
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Prints: 3, 3, 3
```
**Fixed with `let:`**

```javaScript

for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Prints: 0, 1, 2
```
* Note: const cannot be used in loops that change i because const cannot be reassigned.

--- 

## Comparison Table

| Feature | `var` | `let` | `const` |
| :--- | :--- | :--- | :--- |
| **Scope** | Function | Block | Block |
| **Re-declaration** | ✅ Yes | ❌ No | ❌ No |
| **Re-assignment** | ✅ Yes | ✅ Yes | ❌ No |
| **Hoisting behavior** | Hoisted as `undefined` | Hoisted but TDZ | Hoisted but TDZ |
| **Must initialize?** | ❌ No | ❌ No | ✅ Yes |
| **Common use** | ❌ Avoid | Variables that change | Variables that never change |

---

## Summary
* **`var`** → old, risky, function-scoped → ❌ avoid
* **`let`** → modern, safe, use for changing values
* **`const`** → default choice, use for values that don’t change
---

## ❓ Excersie 


### What is the output?
```javascript
let count = 10;
console.log(count); 
let count =12;
console.log(count); 
```
```javascript
var num = 10;
console.log(num); 
var num =12;
console.log(num); 
```
```javascript
const num = 10;
console.log(count); 
const num =12;
console.log(count); 
```
---
# **************************
# 3️⃣ Data Types
# **************************
JavaScript has several data types, categorized as:

- **Primitive**: 
1. Numbers.
2. Strings.
3. Booleans.
4. Undefined.
5. Null.
6. BigInt.
7. Symbol.
- **Non-Primitive**: 
1. Objects.
2. Arrays.

```javascript
let num = 10; // Number
let x; // undefined  
let text = "Hello"; // String
let isTrue = false; // Boolean
let obj = {}; // Object
```
#### How to known the data type
```javascript
console.log(typeof "hello") // String
```

# `undefined` vs `null`

## Quick Answer
- **`undefined`** = JavaScript sets this automatically when something hasn't been assigned
- **`null`** = You (the programmer) set this intentionally to mean "empty" or "no value"

---

## Key Differences

### `undefined`
**Meaning:** Variable declared but not assigned a value yet

```javascript
let x;
console.log(x); // undefined

function test() {
  // no return statement
}
console.log(test()); // undefined

let obj = { name: "Ahmed" };
console.log(obj.age); // undefined (property doesn't exist)
```

### `null`
**Meaning:** Intentionally set to represent "no value" or "empty"

```javascript
let user = null; // explicitly saying "no user"

// Resetting a value
let data = { id: 1 };
data = null; // clearing the data
```

---

## Comparison Table

| Feature | `undefined` | `null` |
|---------|-------------|--------|
| **Set by** | JavaScript (automatically) | You (programmer) |
| **Meaning** | "Not assigned yet" | "Intentionally empty" |
| **Type** | `"undefined"` | `"object"` (historical bug) |
| **Usage** | Default, uninitialized | Explicit "no value" |

---

## Type Check

```javascript
console.log(typeof undefined); // "undefined"
console.log(typeof null);      // "object" (this is a bug in JavaScript!)
```

---

## Comparison

```javascript
console.log(undefined == null);  // true (loose equality)
console.log(undefined === null); // false (strict equality - different types)
```

---

## When to Use What

```javascript
// Don't assign undefined manually 
let x = undefined; // Bad practice

// Use null when you want to explicitly clear or indicate "no value" 
let user = null;           // Good: explicitly no user
let response = null;       // Good: waiting for API response
```

---

## Summary

- **`undefined`**: JavaScript's way of saying "I don't know what this is yet"
- **`null`**: Your way of saying "This is intentionally empty"
- **Best practice**: Let JavaScript handle `undefined`, you use `null` when needed
---
# **************************
# 4️⃣ Type Conversion and Coercion
# **************************
Type conversion explicitly changes types, while coercion is implicit:

```javascript
let num = "5";
console.log(Number(num)); // 5
console.log("5" + 10); // "510" (coercion)
```
---
## Boolean Logic & Logical, Equality Operators

Boolean logic uses `&&` (AND), `||` (OR), and `!` (NOT). Equality operators include `==` (loose equality) and `===` (strict equality):

```javascript
console.log(true && false); // false
console.log(10 === "10"); // false [val & data type]
console.log(10 == "10");  // true [val only]

```

---
# **************************
# 5️⃣ Basic Operators
# **************************
Operators perform operations on values:

- Arithmetic: `+`, `-`, `*`, `/`, `%`
- Assignment: `=`, `+=`, `-=`
- Comparison: `===`,`==`, `>`, `<`
- Logical: `&&`, `||`, `!`

```javascript
let sum = 10 + 5; // 15
let isGreater = 10 > 5; // true
```

```javascript
let num = 5;
num += 3; // same as: num = num + 3
console.log(num);
num -=5;
console.log(num); 
```
* Boolean logic uses && (AND), || (OR), and ! (NOT).

* Equality operators include == (loose equality) and === (strict equality):

```javascript
console.log(true && false); // false
console.log(10 === "10"); // false [val & data type]
console.log(10 == "10");  // true [val only]
```
---
# **************************
# 6️⃣ Operator Precedence
# **************************
Operator precedence determines the execution order in complex expressions. Use parentheses to control precedence.

* **Arthimetic:** 

  *  ( )  
  *  \* , / , % 
  *   \+ , -

* **Boolean:**    
  *  ( )  
  *  !
  *   &
  * |
---
# **************************
# 7️⃣ If / else Statements
# **************************
Conditional statements execute code blocks based on conditions:

```javascript
if (age > 18) {
  console.log("Adult");
} else if (age == 18) {
  console.log("you are eighteen");
} else {
  console.log("Minor");
}
```
---
# **************************
# 8️⃣ Statements and Expressions
# **************************
- **Expressions** produce values: `5 + 5`.
- **Statements** perform actions: `if (true) {}`.

---
# **************************
# 9️⃣ Strings
# **************************
### Basic Methods 

  ```javascript
   let str = "JavaScript";
   ```

1. **`charAt(index)`**  
   Returns the character at the specified index.
   ```javascript
   console.log(str.charAt(4)); // Output: S
   ```

2. **`charCodeAt(index)`**  
   Returns the Unicode value of the character at the specified index.
   ```javascript
   console.log(str.charCodeAt(4)); // Output: 83
   ```

3. **`concat(string1, string2, ...)`**  
   Concatenates strings.
   ```javascript
   console.log("Hello".concat(" ", "World!"," ","js" )); // Output: Hello World!
   
   // same as 
   console.log("Hello " + "World! " + "js")
   ```

4. **`includes(substring, start)`**  
   Checks if a string contains a specified substring.
   ```javascript
   console.log(str.includes("Script")); // Output: true
   ```

5. **`indexOf(substring, start)`**  
   Returns the index of the first occurrence of the substring, or -1 if not found.
   ```javascript
   console.log(str.indexOf("a")); // Output: 1
   ```

6. **`lastIndexOf(substring, start)`**  
   Returns the index of the last occurrence of the substring.
   ```javascript
   console.log(str.lastIndexOf("a")); // Output: 3
   ```

### Case Conversion

7. **`toUpperCase()`**  
   Converts a string to uppercase.
   ```javascript
   console.log(str.toUpperCase()); // Output: JAVASCRIPT
   ```

8. **`toLowerCase()`**  
   Converts a string to lowercase.
   ```javascript
   console.log(str.toLowerCase()); // Output: javascript
   ```

### Substrings and Slicing

9. **`substring(start, end)`**  
   Extracts characters between two indices.
   ```javascript
   console.log(str.substring(0, 4)); // Output: Java
   ```

10. **`slice(start, end)`**  
    Extracts part of a string, supports negative indices.
    ```javascript
    console.log(str.slice(-6)); // Output: Script
    ```

11. **`split(separator, limit)`**  
    Splits a string into an array based on a separator.
    ```javascript
    console.log("Hello World".split(" ")); // Output: ["Hello", "World"]
    ```

### Trimming and Padding

12. **`trim()`**  
    Removes whitespace from both ends of a string.
    ```javascript
    console.log("  Hello World  ".trim()); // Output: Hello World
    ```

13. **`trimStart()` / `trimEnd()`**  
    Removes whitespace from the start or end of a string.
    ```javascript
    console.log("  Hello".trimStart()); // Output: Hello
    ```

14. **`padStart(targetLength, padString)`**  
    Pads the beginning of the string to a specified length.
    ```javascript
    console.log("123".padStart(5, "0")); // Output: 00123
    ```

15. **`padEnd(targetLength, padString)`**  
    Pads the end of the string.
    ```javascript
    console.log("123".padEnd(5, "0")); // Output: 12300
    ```

### Replacing

16. **`replace(pattern, replacement)`**  
    Replaces the first match of a pattern with a replacement.
    ```javascript
    console.log("Hello World".replace("World", "JavaScript")); // Output: Hello JavaScript
    ```

17. **`replaceAll(pattern, replacement)`**  
    Replaces all matches of a pattern.
    ```javascript
    console.log("aaa".replaceAll("a", "b")); // Output: bbb
    ```


# **************************
# 🔟 Template Literals
# **************************
- Template literals use backticks for string interpolation and multi-line strings.
  ```javascript
  let name = "John";
  console.log(`Hello, ${name}!`); // Output: Hello, John!

---

# **************************
# 1️⃣1️⃣ Functions & Arrow Functions
# **************************

#### Syntax Example:

- **Function**
  ```javascript
  function add(a, b) {
    return a + b;
  }
  ```

- **Arrow Function**
  ```javascript
  const add = (a, b) => a + b;
  // or 
  const add = (a,b) => { return a+b };
  ```

#### `this` Binding Example:

- **Function**
  ```javascript
  const obj = {
    value: 10,
    method: function () {
      console.log(this.value); // Refers to obj
    }
  };
  obj.method(); // Output: 10
  ```

- **Arrow Function**
  ```javascript
  const obj = {
    value: 10,
    method: () => {
      console.log(this.value); // Refers to outer scope
    }
  };
  obj.method(); // Output: undefined
  ```

#### Constructor Example:

- **Function**
  ```javascript
  function Person(name) {
    this.name = name;
  }
  const person = new Person("John");
  console.log(person.name); // Output: John
  ```

- **Arrow Function**
  ```javascript
  const Person = (name) => {
    this.name = name;
  };
  const person = new Person("John"); // Error: Person is not a constructor
  ```


Functions encapsulate reusable code:

```javascript
function greet(name) {
  return `Hello, ${name}!`;
}

const arrowGreet = (name) => `Hello, ${name}!`;
```

---
# **************************
# 1️⃣2️⃣ Intro to Arrays and Objects
# **************************
- **Arrays** store ordered collections:

```javascript
let fruits = ["Apple", "Banana"];
```

- **Objects** store key-value pairs:

```javascript
let person = { name: "Alice", age: 30 };
```

---
# **************************
# 1️⃣3️⃣ Loops
# **************************
Loops repeat code until a condition is met:

- **for loop**:

```javascript
for (let i = 0; i < 5; i++) {
  console.log(i);
}
```

- **while loop**:
```javascript
let i = 0;
while (i < 5) {
  console.log(i);
  i++;
}
```
---
# **************************
# 1️⃣4️⃣ Comments 
# **************************
symbole used for comments in javaScript is `// Single line` for single line and `/* Multi-lines */` for multi-lines

```javascript
//this is a single line comment

/*
  this 
  is 
  multi line
  comment
*/
```
---
# **************************
# 1️⃣5️⃣ HandsOn & Task
# **************************

[HandsOn file](HandsOn.js)

[Task Description](task.md)