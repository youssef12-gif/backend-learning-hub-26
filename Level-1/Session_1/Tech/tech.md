# Session-1 Agenda
1. [Brief Intro to JavaScript & NodeJs](#javascript-overview)
2. [Values & Variables](#values--variables)
3. [Data Types](#data-types)
4. [Let, const, and var](#let-const-and-var)
5. [Comments](#comments)
6. [Basic Operators](#basic-operators)
7. [Operator Precedence](#operator-precedence)
8. [If / else Statements](#if--else-statements)
11. [Type Conversion and Coercion](#type-conversion-and-coercion)
12. [Boolean Logic & Logical, Equality Operators](#boolean-logic--logical-equality-operators)
13. [Statements and Expressions](#statements-and-expressions)

9. [Strings](#strings)
10. [Template Literals](#template-literals-not-a-method-but-important)
14. [Functions and Arrow Functions](#functions-and-arrow-functions)
15. [Intro to Arrays and Objects](#intro-to-arrays-and-objects)
16. [Loops](#loops)
18. [Task](#task)


## JavaScript Overview
### What is JavaScript?

JavaScript (JS) is a programming language originally designed to make web pages interactive.

At first, it only ran in the browser (Front-End) — handling animations, user interactions, and validations.

After the creation of Node.js, JavaScript could also run on the server (Back-End).

### Key Characteristics of JavaScript

- High-Level Language: You don’t deal with low-level memory management.

- Interpreted: Code runs directly without a separate compilation step.

- Dynamically Typed: You don’t need to specify data types when declaring variables.

- Single-Threaded & Event-Driven: JS uses one main thread, but it handles multiple tasks efficiently through the event loop and asynchronous callbacks.

- Prototype-Based: Instead of traditional classes (like Java or C++), JS uses prototypes for object inheritance though modern JS also supports class syntax.

## Backend with Node.js
Node.js is a runtime environment that lets you run JavaScript outside the browser (on the server).

It uses Google’s V8 Engine (the same engine that powers Chrome) to execute JS code.

---

## Values & Variables

Values represent data, while variables store these values for reuse. You can declare variables using `let`, `const`, or `var`:

```javascript
let age = 25;
const name = "John";
var isStudent = true;
```
# `let` vs `var` - Key Differences

## Quick Rule
**Always use `let` or `const`. Never use `var` in modern JavaScript.**

---

## The 3 Main Differences

### 1. **Scope**

**`var` = Function-scoped** (escapes blocks)
```javascript
if (true) {
  var x = 10;
}
console.log(x); // 10 - Works!
```

**`let` = Block-scoped** (stays inside `{}`)
```javascript
if (true) {
  let y = 10;
}
console.log(y); // Error: y is not defined
```

---

### 2. **Re-declaration**

**`var` allows re-declaration:**
```javascript
var num = 10;
var num = 12; // No error
console.log(num); // 12
```

**`let` does NOT:**
```javascript
let count = 10;
let count = 12; // Error: Identifier 'count' has already been declared
```

---

### 3. **Hoisting**

**`var` is initialized as `undefined`:**
```javascript
console.log(x); // undefined (weird but no error)
var x = 5;
```

**`let` throws an error before initialization:**
```javascript
console.log(y); // Error: Cannot access 'y' before initialization
let y = 5;
```

---

## Classic Example: The Loop Bug

**Problem with `var`:**
```javascript
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Prints: 3, 3, 3 (all the same!)
```

**Fixed with `let`:**
```javascript
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Prints: 0, 1, 2 (correct!)
```

---

## Comparison Table

| Feature | `var` | `let` |
|---------|-------|-------|
| **Scope** | Function | Block |
| **Re-declaration** | ✅ Allowed | ❌ Not allowed |
| **Hoisting behavior** | Initialized as `undefined` | Not initialized (error) |
| **Use in modern code** | ❌ No | ✅ Yes |

---

## Summary

- **`var`** is old and problematic (function-scoped, allows re-declaration, weird hoisting)
- **`let`** is modern and safe (block-scoped, no re-declaration, better errors)
- **Always use `let` or `const`**, never `var`

---

  ## Let, const, and var

- **`let`**: Block-scoped, mutable.
- **`const`**: Block-scoped, immutable (value cannot be reassigned).
- **`var`**: Function-scoped, mutable (avoid using it in modern code).

```javascript
let count = 10;
const PI = 3.14;
var total = 0; // Older syntax

```
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

## Data Types

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

## Comments 
symbole used for comments in javaScript is `// Single line` for single line and `/* Multi-lines */` for multi-lines

---
## Basic Operators

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
---

## Operator Precedence

Operator precedence determines the execution order in complex expressions. Use parentheses to control precedence.

```javascript
let result = 10 + 5 * 2; // 20, multiplication first
let corrected = (10 + 5) * 2; // 30
```

---


## If / else Statements

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

## Type Conversion and Coercion

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

## Statements and Expressions

- **Expressions** produce values: `5 + 5`.
- **Statements** perform actions: `if (true) {}`.

---
## Strings
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



## Template Literals (Not a method but important)

- Template literals use backticks for string interpolation and multi-line strings.
  ```javascript
  let name = "John";
  console.log(`Hello, ${name}!`); // Output: Hello, John!

---

### Examples

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
  


Functions encapsulate reusable code:

```javascript
function greet(name) {
  return `Hello, ${name}!`;
}

const arrowGreet = (name) => `Hello, ${name}!`;
```

---

## Intro to Arrays and Objects

- **Arrays** store ordered collections:

```javascript
let fruits = ["Apple", "Banana"];
```

- **Objects** store key-value pairs:

```javascript
let person = { name: "Alice", age: 30 };
```

---

## Loops

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
