# TypeScript Session - Tech Part

## 📋 Table of Contents

1. [Core TypeScript Features](#1️⃣-core-typescript-features)
2. [Explicit Type Annotations](#2️⃣-explicit-type-annotations)
3. [Type Inference Engine](#3️⃣-type-inference-engine)
4. [Bidirectional Type Checking Examples](#4️⃣-bidirectional-type-checking-examples)
5. [Advanced Type Constructs](#5️⃣-advanced-type-constructs)
6. [Type vs Interface vs Class vs Object](#6️⃣-type-vs-interface-vs-class-vs-object)
7. [TypeScript Compiler (TSC)](#7️⃣-typescript-compiler-tsc)
8. [Configuration with tsconfig.json](#8️⃣-configuration-with-tsconfigjson)
9. [TSC Watch Mode](#9️⃣-tsc-watch-mode)
10. [Runtime Compatibility](#-runtime-compatibility)

---

# 1️⃣ Core TypeScript Features

TypeScript enhances JavaScript with a powerful type system. Let's explore each feature with practical examples.

---

# 2️⃣ Explicit Type Annotations

You can explicitly declare types for variables, function parameters, and return values.

## Basic Type Annotations

```typescript
// Primitive types
let age: number = 25;
let name: string = "Alice";
let isActive: boolean = true;

// Arrays
let numbers: number[] = [1, 2, 3];
let names: string[] = ["Alice", "Bob"];

// Alternative array syntax
let scores: Array<number> = [90, 85, 95];
```

## Function Type Annotations

```typescript
// Function with typed parameters and return type
function greet(name: string): string {
  return "Hello, " + name.toUpperCase();
}

// Function with multiple parameters
function add(a: number, b: number): number {
  return a + b;
}

// Function with no return value
function logMessage(message: string): void {
  console.log(message);
}
```

## Comparing JavaScript vs TypeScript

### JavaScript (Dynamic)
```javascript
function greet(name) {
  return "Hello, " + name.toUpperCase();
}

greet(42); // Runtime error: name.toUpperCase is not a function
```

### TypeScript (Static)
```typescript
function greet(name: string): string {
  return "Hello, " + name.toUpperCase();
}

greet(42); // Compile-time error: Argument of type 'number' is not assignable to parameter of type 'string'
```

---

# 3️⃣ Type Inference Engine

TypeScript can automatically determine types without explicit annotations.

## Basic Type Inference

```typescript
// Type inference (TypeScript figures it out)
let name = "Alice"; // Inferred as string
let count = 0; // Inferred as number
let items = [1, 2, 3]; // Inferred as number[]
let mixed = [1, "two", 3]; // Inferred as (string | number)[]
```

## Function Return Type Inference

```typescript
// Return type automatically inferred as number
function add(a: number, b: number) {
  return a + b; // TypeScript infers return type: number
}

// Return type inferred as string
function getMessage() {
  return "Hello World";
}
```

## Comparison with Static Typing

```typescript
// Static typing (explicit)
let value: number = 42;
value = "hello"; // Error: Type 'string' is not assignable to type 'number'

// Type inference (implicit)
let inferredValue = 42; // Inferred as number
inferredValue = "hello"; // Error: Type 'string' is not assignable to type 'number'

// Strong typing prevents coercion
let result: string = "5" + 3; // Error: Can't add number to string without explicit conversion
```

---

# 4️⃣ Bidirectional Type Checking Examples

TypeScript flows type information in both directions for better type safety.

## Top-Down Flow (Context → Expression)

Expected type flows into the expression.

```typescript
// Array type annotation tells TypeScript what's expected
let numbers: number[] = [1, 2, 3];
// TypeScript knows the array should contain numbers

// Function signature provides context
function process(callback: (x: number) => void) {
  callback(42);
}

process((x) => {
  // x is inferred as number from the function signature
  console.log(x * 2); // x is number, so math operations are safe
});

// Object type annotation
interface Person {
  name: string;
  age: number;
}

let user: Person = {
  name: "Alice", // TypeScript knows this should be string
  age: 30 // TypeScript knows this should be number
};
```

## Bottom-Up Flow (Expression → Context)

Expression type flows outward.

```typescript
// Value determines type
let value = 42; // TypeScript infers value is type 'number'

// Return type inferred from return value
function add(a: number, b: number) {
  return a + b; // Return type inferred as number
}

// Array inference from values
let fruits = ["apple", "banana"]; // Inferred as string[]
let mixed = [1, "two", true]; // Inferred as (string | number | boolean)[]

// Object literal inference
let config = {
  port: 3000, // number
  host: "localhost", // string
  secure: true // boolean
};
// Type inferred as { port: number; host: string; secure: boolean }
```

## Shape Compatibility (Structural Typing)

TypeScript uses structural typing - compatibility is based on shape, not names.

```typescript
interface Animal {
  name: string;
}

interface Dog {
  name: string;
  breed: string;
}

let animal: Animal = { name: "Spot" };
let dog: Dog = { name: "Buddy", breed: "Labrador" };

// ✅ OK: Dog has all Animal properties (substitutability)
animal = dog;

// ❌ Error: Animal missing 'breed' property
dog = animal;
```

**Key Principle:** A type is compatible if it has **at least** the required properties.

## Real-World Example: Power Socket Analogy

```typescript
interface PowerSocket {
  voltage: number;
  frequency: number;
}

function plugIn(socket: PowerSocket) {
  console.log(`Connected to ${socket.voltage}V socket`);
}

// EU socket has extra properties
const euSocket = {
  voltage: 230,
  frequency: 50,
  country: "Germany",
  grounded: true
};

// US socket has different extra properties
const usSocket = {
  voltage: 120,
  frequency: 60,
  outlets: 2
};

// Egypt socket
const egyptSocket = {
  voltage: 220,
  frequency: 50,
  type: "C/F"
};

// All work because they have required voltage and frequency
plugIn(euSocket); // ✅ OK
plugIn(usSocket); // ✅ OK
plugIn(egyptSocket); // ✅ OK
```

## Excess Property Checking

TypeScript prevents accidental typos in object literals.

```typescript
interface Person {
  name: string;
  age: number;
}

// ❌ Error: Object literal may only specify known properties
let person: Person = {
  name: "Alice",
  age: 30,
  salary: 50000 // Error: 'salary' does not exist in type 'Person'
};

// ✅ Workaround: Assign to variable first
const personData = {
  name: "Alice",
  age: 30,
  salary: 50000
};
let person2: Person = personData; // OK due to structural typing
```

---

# 5️⃣ Advanced Type Constructs

## 1. Literal Types

Use specific values as types.

```typescript
// String literal types
let direction: "north" | "south" | "east" | "west";
direction = "north"; // ✅ OK
direction = "up"; // ❌ Error

// Type alias with literals
type Status = "pending" | "approved" | "rejected";
let orderStatus: Status = "pending"; // ✅ OK
orderStatus = "cancelled"; // ❌ Error

// Number literals
type DiceRoll = 1 | 2 | 3 | 4 | 5 | 6;
let roll: DiceRoll = 4; // ✅ OK
let badRoll: DiceRoll = 7; // ❌ Error

// Boolean literals
type AlwaysTrue = true;
let value: AlwaysTrue = true; // ✅ OK
```

## 2. Union Types (Sum Types)

A value can be one of several types.

```typescript
// Basic union
let age: string | number;
age = 25; // ✅ OK
age = "twenty-five"; // ✅ OK
age = true; // ❌ Error

// Union with type narrowing
function formatValue(value: string | number) {
  if (typeof value === "string") {
    return value.toUpperCase(); // TypeScript knows it's a string here
  } else {
    return value.toFixed(2); // TypeScript knows it's a number here
  }
}

// Array with union types
let mixed: (string | number)[] = [1, "two", 3, "four"];

// Union with literal types
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
function makeRequest(method: HttpMethod) {
  console.log(`Making ${method} request`);
}
```

## 3. Intersection Types (Product Types)

Combine multiple types into one.

```typescript
// Basic intersection
interface Person {
  name: string;
}

interface Employee {
  employeeId: number;
}

type Staff = Person & Employee;

let staff: Staff = {
  name: "Alice",
  employeeId: 123
};

// Multiple intersections
interface Timestamps {
  createdAt: Date;
  updatedAt: Date;
}

interface Identifiable {
  id: string;
}

type DatabaseRecord = Person & Timestamps & Identifiable;

let record: DatabaseRecord = {
  name: "Bob",
  id: "abc123",
  createdAt: new Date(),
  updatedAt: new Date()
};
```

## 4. Generics (Parametric Polymorphism)

Write reusable code that works with multiple types.

```typescript
// Basic generic function
function identity<T>(value: T): T {
  return value;
}

let num = identity<number>(42); // T is number
let str = identity<string>("hello"); // T is string
let auto = identity(true); // T inferred as boolean

// Generic array operations
function getFirstElement<T>(arr: T[]): T | undefined {
  return arr[0];
}

let firstNum = getFirstElement([1, 2, 3]); // number | undefined
let firstStr = getFirstElement(["a", "b"]); // string | undefined

// Generic with constraints
interface Lengthwise {
  length: number;
}

function logLength<T extends Lengthwise>(item: T): void {
  console.log(item.length);
}

logLength("hello"); // ✅ OK - string has length
logLength([1, 2, 3]); // ✅ OK - array has length
logLength(42); // ❌ Error - number doesn't have length

// Generic interfaces
interface Container<T> {
  value: T;
  getValue(): T;
}

let numberContainer: Container<number> = {
  value: 42,
  getValue() {
    return this.value;
  }
};

// Generic classes
class Box<T> {
  private contents: T;

  constructor(contents: T) {
    this.contents = contents;
  }

  getContents(): T {
    return this.contents;
  }
}

let numberBox = new Box<number>(123);
let stringBox = new Box<string>("hello");
```

## 5. Custom Type Definitions

```typescript
// Type alias for union
type Committee = "Backend" | "Linux" | "Frontend";
let myCommittee: Committee = "Backend";

// Type alias for object shape
type User = {
  id: number;
  name: string;
  email: string;
};

// Type alias for function signature
type MathOperation = (a: number, b: number) => number;

const add: MathOperation = (a, b) => a + b;
const subtract: MathOperation = (a, b) => a - b;
```

## 6. Interfaces

Think of interfaces as contracts that define object structure.

```typescript
// Basic interface
interface Member {
  name: string;
  age: number;
  committee: string;
}

const member: Member = {
  name: "Mohsen",
  age: 28,
  committee: "Linux"
};

// Interface with optional properties
interface Config {
  host: string;
  port: number;
  debug?: boolean; // Optional property
}

let config: Config = {
  host: "localhost",
  port: 3000
  // debug is optional
};

// Interface with methods
interface Calculator {
  add(a: number, b: number): number;
  subtract(a: number, b: number): number;
}

const calc: Calculator = {
  add(a, b) {
    return a + b;
  },
  subtract(a, b) {
    return a - b;
  }
};

// Extending interfaces
interface Animal {
  name: string;
  age: number;
}

interface Dog extends Animal {
  breed: string;
  bark(): void;
}

const myDog: Dog = {
  name: "Buddy",
  age: 3,
  breed: "Labrador",
  bark() {
    console.log("Woof!");
  }
};
```

## 7. The `any` Type - WD-40 of TypeScript

Use `any` when you don't expect a certain data type (like JavaScript).

```typescript
// Any type - opts out of type checking
let age: any;
age = "hello world"; // ✅ OK
age = 32; // ✅ OK
age = true; // ✅ OK
age = { name: "Alice" }; // ✅ OK

// Any in function parameters
function logValue(value: any): void {
  console.log(value);
}

logValue(123);
logValue("hello");
logValue({ key: "value" });
```

**⚠️ Warning:** Avoid `any` when possible. It disables TypeScript's type checking.

## 8. Partial Type Utility

Makes all properties of a type optional.

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

// Partial makes all properties optional
type PartialUser = Partial<User>;

const updateUser: PartialUser = {
  name: "Alice" // Only updating name, other fields optional
};

// Practical use case: Update functions
function updateUserData(userId: number, updates: Partial<User>) {
  // Can update any subset of User properties
}

updateUserData(1, { name: "Bob" });
updateUserData(2, { email: "new@email.com", age: 30 });
```

---

# 6️⃣ Type vs Interface vs Class vs Object

Understanding these four concepts is crucial for effective TypeScript development.

## Comparison Table

| Feature | Type | Interface | Class | Object |
|---------|------|-----------|-------|--------|
| **Exists at** | Compile-time only | Compile-time only | Runtime | Runtime |
| **After compilation** | Disappears | Disappears | Exists in JS code | Exists in JS code |
| **Purpose** | Define shapes and aliases | Define object contracts | Blueprint for objects | Actual data in memory |
| **Can extend** | ✅ Yes (via intersection) | ✅ Yes (via extends) | ✅ Yes (via extends) | ❌ N/A |
| **Can implement** | ❌ No | ✅ Yes | ✅ Yes | ❌ N/A |
| **Has methods** | ✅ Yes (signatures only) | ✅ Yes (signatures only) | ✅ Yes (with implementation) | ✅ Yes (actual functions) |
| **Has constructor** | ❌ No | ❌ No | ✅ Yes | ❌ No |
| **Can be instantiated** | ❌ No | ❌ No | ✅ Yes (with `new`) | ✅ Yes (object literal) |

## Practical Examples

### Type
```typescript
// Type alias for object shape
type Point = {
  x: number;
  y: number;
};

// Type alias for union
type ID = string | number;

// Type alias for function
type GreetFunction = (name: string) => string;

// Type disappears after compilation - only used for type checking
```

### Interface
```typescript
// Interface defines contract
interface User {
  id: number;
  name: string;
  email: string;
}

// Can extend other interfaces
interface Admin extends User {
  permissions: string[];
}

// Interfaces disappear after compilation - only used for type checking
```

### Class
```typescript
// Class is a blueprint AND exists at runtime
class Person {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  greet(): string {
    return `Hello, I'm ${this.name}`;
  }
}

// Can create instances
const person = new Person("Alice", 30);
console.log(person.greet()); // Class methods exist at runtime
```

### Object
```typescript
// Object literal - actual data at runtime
const user = {
  id: 1,
  name: "Alice",
  email: "alice@example.com"
};

// This is actual data stored in memory
console.log(user.name); // Works at runtime
```

## When to Use What

### Use `type` when:
- Creating aliases for primitive types or unions
- Need complex type compositions
- Working with mapped types or conditional types
- Want to alias any type (including primitives)

### Use `interface` when:
- Defining object shapes
- Need to extend or implement
- Building public APIs
- Want declaration merging capability

### Use `class` when:
- Need runtime representation
- Want methods with implementations
- Building with OOP patterns
- Need instances with behavior

### Use `object literal` when:
- Creating actual data
- Need one-time data structure
- Configuring options
- Storing runtime values

---

# 7️⃣ TypeScript Compiler (TSC)

The TypeScript compiler (tsc) is a tool that transforms TypeScript into plain JavaScript.

## What TSC Does

1. **Type Checking** - Analyzes code for type errors
2. **Transpilation** - Converts TypeScript to JavaScript
3. **Target Selection** - Compiles to different JavaScript versions
4. **Module Resolution** - Handles imports and exports
5. **Declaration Files** - Generates `.d.ts` files for libraries

## TSC Process Overview

```
TypeScript Code (.ts)
        ↓
   [PARSING]
        ↓
   [TYPE CHECKING]
        ↓
   [TRANSFORMATION]
        ↓
   [CODE GENERATION]
        ↓
JavaScript Code (.js)
```

## Basic TSC Commands

```bash
# Compile a single file
tsc filename.ts

# Compile all files in project (uses tsconfig.json)
tsc

# Compile with specific target
tsc --target ES2020 filename.ts

# Type check without emitting files
tsc --noEmit

# Show compiler version
tsc --version

# Generate tsconfig.json
tsc --init
```

---

# 8️⃣ Configuration with tsconfig.json

The `tsconfig.json` file controls TypeScript's behavior and strictness levels.

## Generating tsconfig.json

```bash
tsc --init
```

## Basic Configuration Example

```json
{
  "compilerOptions": {
    /* Language and Environment */
    "target": "ES2020",                    // JavaScript version to compile to
    "lib": ["ES2020"],                     // Include standard library definitions
    
    /* Modules */
    "module": "commonjs",                  // Module system (commonjs, es6, etc.)
    "rootDir": "./src",                    // Input directory
    "outDir": "./dist",                    // Output directory
    "moduleResolution": "node",            // How modules are resolved
    
    /* Type Checking */
    "strict": true,                        // Enable all strict type checking options
    "noImplicitAny": true,                 // Error on expressions with implied 'any' type
    "strictNullChecks": true,              // Null and undefined handling
    "strictFunctionTypes": true,           // Strict function type checking
    "strictBindCallApply": true,           // Strict bind/call/apply
    "strictPropertyInitialization": true,  // Ensure class properties are initialized
    "noImplicitThis": true,                // Error on 'this' expressions with implied 'any'
    "alwaysStrict": true,                  // Parse in strict mode
    
    /* Emit */
    "noEmitOnError": true,                 // Don't emit if there are errors
    "declaration": true,                   // Generate .d.ts files
    "sourceMap": true,                     // Generate source maps for debugging
    "removeComments": true,                // Remove comments in output
    
    /* Interop Constraints */
    "esModuleInterop": true,               // Better CommonJS/ES6 module interoperability
    "forceConsistentCasingInFileNames": true, // Ensure consistent file name casing
    
    /* Additional Checks */
    "noUnusedLocals": true,                // Report unused local variables
    "noUnusedParameters": true,            // Report unused parameters
    "noImplicitReturns": true,             // Report missing return statements
    "noFallthroughCasesInSwitch": true     // Report fallthrough cases in switch
  },
  
  /* Include/Exclude */
  "include": ["src/**/*"],                 // Files to include
  "exclude": ["node_modules", "dist"]      // Files to exclude
}
```

## Key Configuration Options Explained

### 1. `strict: true`
Enables all strict type checking options. Recommended for new projects.

### 2. `target`
ECMAScript version for output JavaScript.
- `"ES5"` - Maximum compatibility
- `"ES2015"` / `"ES6"` - Modern features
- `"ES2020"` - Latest stable features
- `"ESNext"` - Cutting edge features

### 3. `module`
Module code generation.
- `"commonjs"` - Node.js standard
- `"es6"` / `"es2015"` - ES6 modules
- `"esnext"` - Latest module features

### 4. `noEmitOnError: true`
If your code has errors, it won't create a JavaScript file. Prevents broken code from being generated.

### 5. `noImplicitAny: true`
Requires explicit types when TypeScript can't infer the type.

```typescript
// Without noImplicitAny
function add(a, b) {  // Implicitly 'any' - allowed
  return a + b;
}

// With noImplicitAny
function add(a, b) {  // Error: Parameter 'a' implicitly has an 'any' type
  return a + b;
}

// Fix: Add explicit types
function add(a: number, b: number): number {
  return a + b;
}
```

### 6. `strictNullChecks: true`
Makes null and undefined handling explicit.

```typescript
// Without strictNullChecks
let name: string;
name = null;  // Allowed (unsafe)

// With strictNullChecks
let name: string;
name = null;  // Error: Type 'null' is not assignable to type 'string'

// Fix: Use union type
let name: string | null;
name = null;  // OK
```

## Project Structure Example

```
my-project/
├── src/
│   ├── index.ts
│   ├── utils.ts
│   └── types.ts
├── dist/          (generated by tsc)
│   ├── index.js
│   ├── utils.js
│   └── types.js
├── tsconfig.json
└── package.json
```

---

# 9️⃣ TSC Watch Mode

Watch mode automatically recompiles when files change.

```bash
tsc --watch
```

**What it does:**
- Monitors your TypeScript files
- Automatically recompiles on changes
- Shows compilation errors in real-time
- Great for development workflow

**Benefits:**
- No need to manually recompile
- Instant feedback on changes
- Improves development speed

---

# 🔟 Runtime Compatibility

## Understanding the Target Option

The JavaScript generated by TypeScript uses features based on the selected target that your environment must support.

### Common Compatibility Issues

```typescript
// TypeScript code
const greet = (name: string) => `Hello, ${name}`;

// With target: "ES5"
var greet = function(name) {
  return "Hello, " + name;
};

// With target: "ES2015"
const greet = (name) => `Hello, ${name}`;
```

## Preventing Runtime Errors

### Rule 1: Match Your Environment

Make sure your `target` option matches your runtime environment:

```json
{
  "compilerOptions": {
    "target": "ES2015"  // For modern browsers / Node.js 6+
  }
}
```

### Rule 2: Target Must Be ≤ Runtime Support

- **Node.js 12+**: Can use `"ES2019"`
- **Node.js 10+**: Use `"ES2018"`
- **Older Node**: Use `"ES2015"` or `"ES5"`
- **Modern browsers**: Use `"ES2020"`
- **IE11 support**: Use `"ES5"`

### Checking Node.js Compatibility

```bash
node --version
# v18.15.0 - Can use ES2021 or ES2022

# Check supported features
node -p "process.versions"
```

## Example Configuration for Different Environments

### For Modern Node.js (v14+)
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"]
  }
}
```

### For Browser (Modern)
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "es6",
    "lib": ["ES2020", "DOM"]
  }
}
```

### For Maximum Compatibility
```json
{
  "compilerOptions": {
    "target": "ES5",
    "module": "commonjs",
    "lib": ["ES5", "DOM"]
  }
}
```

---

## 📝 Practice Checklist

- [ ] Install TypeScript globally (`npm install -g typescript`)
- [ ] Create a new directory for practice
- [ ] Initialize TypeScript configuration
- [ ] Complete Exercise 1: Basic Types
- [ ] Complete Exercise 2: Interfaces
- [ ] Complete Exercise 3: Union Types
- [ ] Complete Exercise 4: Generics
- [ ] Complete Exercise 5: Real-World Example
- [ ] Practice compilation with different targets
- [ ] Try watch mode
- [ ] Experiment with strict mode options

---

## 🎯 Common Mistakes to Avoid

1. **Using `any` everywhere** - Defeats the purpose of TypeScript
2. **Not using `strict` mode** - Misses many type safety benefits
3. **Ignoring compiler errors** - Fix errors, don't work around them
4. **Over-complicating types** - Keep types simple and readable
5. **Not reading error messages** - TypeScript errors are usually helpful

---

**Remember:** Practice is key! TypeScript becomes intuitive with regular use. Start with simple types and gradually explore advanced features.