# Welcome to Task 1 in level 2 
# Intro to TypeScript

---
## Before you begin you should revise on the SessionMD to recall the basics
### Extra: Read about partial types
---

## Exercise 1: Core TypeScript Features

### Task
Write a function that demonstrates TypeScript's basic type system:

```typescript
// TODO: Add type annotations to this function
// It should accept a user's name (string), age (number), and whether they're active (boolean)
// Return an object with these properties plus a greeting message

function createUser(name, age, isActive) {
    return {
        name: name,
        age: age,
        isActive: isActive,
        greeting: `Hello, ${name}!`
    };
}

// TODO: Call the function with correct types
const user = createUser(/* your arguments here */);
```


---

## Exercise 2: Explicit Type Annotations

### Task
Create variables and functions with explicit type annotations:

```typescript
// TODO: Explicitly annotate these variables
let productName = "Laptop";
let price = 999.99;
let inStock = true;
let tags = ["electronics", "computers", "new"];
let metadata = { weight: 2.5, color: "silver" };

// TODO: Write a function with explicit parameter and return types
// Function should calculate total price with tax
// Parameters: price (number), taxRate (number)
// Return: number
function calcTotal(/* add types here */) {
    // implement
}

// TODO: Annotate this array of numbers
let nums = [95, 87, 92, 88];

// TODO: Create a tuple type for a coordinate [x, y]
let axis = [10, 20];
```


---

## Exercise 3: Type Inference Engine (15 minutes)

### Task
Understand when TypeScript infers types vs when you need explicit annotations:

```typescript
// TODO: TypeScript infers types here - what type is each variable?
let str = "Hello";
let num = 42;
let arr = [1, 2, 3, 4];
let obj = { name: "Alice", age: 30 };

// TODO: What happens here? Will TypeScript catch the error?
// inferredString = 100;

// TODO: Type inference in functions - what's the return type?
function multiply(a: number, b: number) {
    return a * b;
}

// TODO: Type inference with const
const constantValue = "TypeScript";
// Try to reassign: constantValue = "JavaScript";

// TODO: Context-based inference - what type is 'item'?
const numbers = [1, 2, 3, 4, 5];
numbers.forEach(item => {
    console.log(item.toFixed(2));
});

// TODO: Best common type inference
let mixed = [1, "two", 3, "four"]; // What type is this array?
```

---

## Exercise 4: Bidirectional Type Checking Examples

### Task
See how TypeScript checks types in both directions:

```typescript
// TODO: Top-down typing (from declaration to usage)
let user: { name: string; age: number };
user = { name: "Mohsen", age: 25 }; // OK
// user = { name: "Mahmoud" }; // Error - what's missing?

// TODO: Bottom-up typing (from usage to declaration)
function processUser(user: { name: string; age: number }) {
    return `${user.name} is ${user.age} years old`;
}

const newUser = { name: "Dina", age: 28, email: "dina@example.com" };
// What happens when we pass newUser to processUser?
processUser(newUser);

// TODO: Function parameter bidirectional checking
type Calculator = (a: number, b: number) => number;

const add: Calculator = (x, y) => {
    // What are the types of x and y? (hover over them)
    return x + y;
};

// TODO: Array methods with bidirectional checking
const names = ["Ali", "Barthinia", "Mohsen"];
const upperCased = names.map(name => {
    // What's the type of 'name'?
    return name.toUpperCase();
});

// TODO: Promise type inference
async function fetchData(): Promise<string> {
    return "data";
}

fetchData().then(result => {
    // What's the type of 'result'?
    console.log(result);
});
```

---

## Exercise 5: Advanced Type Constructs

### Task
Practice advanced TypeScript features:

```typescript
// TODO: Union Types - create a function that accepts string OR number ID
function getItemById(id: /* your type here */) {
    if (typeof id === "string") {
        return `Item with string ID: ${id}`;
    } else {
        return `Item with numeric ID: ${id}`;
    }
}

// TODO: Intersection Types - combine two types
type HasName = { name: string };
type HasAge = { age: number };
type Person = /* combine HasName and HasAge */;

const person: Person = /* create an object */;

// TODO: Literal Types - restrict to specific values
type Status = /* only "pending", "approved", or "rejected" */;
let orderStatus: Status = "pending";
// orderStatus = "shipped"; // Should error

// TODO: Type Aliases
type Product = {
    id: number;
    name: string;
    price: number;
};

// TODO: Generic function - create a function that returns the first element
function getFirst<T>(/* array parameter */): T | undefined {
    // implement
}

const firstNumber = getFirst([1, 2, 3]); // should be number | undefined
const firstString = getFirst(["a", "b"]); // should be string | undefined

// TODO: Utility Types
type PartialProduct = /* make all Product properties optional */;
type ReadonlyProduct = /* make all Product properties readonly */;
type ProductPreview = /* pick only 'name' and 'price' from Product */;
```

---

## Exercise 6: Type vs Interface vs Class vs Object

### Task
Understand when to use each construct:

```typescript
// TODO: Type Alias - good for unions, primitives, computed types
type ID = string | number;
type Point = { x: number; y: number };
type Callback = (data: string) => void;

// TODO: Interface - good for object shapes, can be extended
interface Animal {
    name: string;
    age: number;
}

// Extend the interface
interface Dog extends Animal {
    breed: string;
}

// TODO: Class - creates both type AND implementation
class Vehicle {
    constructor(
        public brand: string,
        public model: string,
        private year: number
    ) {}
    
    getInfo(): string {
        return `${this.brand} ${this.model} (${this.year})`;
    }
}

// TODO: Object Literal with Type
const book: { title: string; author: string; pages: number } = {
    title: "TypeScript Guide",
    author: "Developer",
    pages: 250
};

// TODO: When to use what?
// 1. Create a User interface with name and email
// 2. Create a UserId type that's string | number
// 3. Create a UserManager class with methods to add/remove users
// 4. Create an admin object literal with specific properties

/* Your code here */
```

**Key Concepts**: Type aliases, interfaces, classes, object types, when to use each

---

## Final Exercise: E-Commerce System

### Task
Combine all concepts into a complete mini-project:

```typescript
// TODO: Build a simple e-commerce system with the following requirements:

// 1. Type Aliases
type ProductId = string | number;
type Currency = "USD" | "EUR" | "GBP";
type OrderStatus = "pending" | "processing" | "shipped" | "delivered";

// 2. Interfaces
interface Product {
    id: ProductId;
    name: string;
    price: number;
    currency: Currency;
    inStock: boolean;
    category: string;
}

interface Customer {
    id: number;
    name: string;
    email: string;
    orders: Order[];
}

interface Order {
    orderId: string;
    customerId: number;
    products: Product[];
    status: OrderStatus;
    total: number;
}

// 3. Class Implementation
class ShoppingCart {
    private items: Product[] = [];
    
    // TODO: Implement addItem method
    addItem(product: Product): void {
        // Check if in stock, then add
    }
    
    // TODO: Implement removeItem method
    removeItem(productId: ProductId): void {
        // Remove by ID
    }
    
    // TODO: Implement calculateTotal method
    calculateTotal(): number {
        // Sum all product prices
    }
    
    // TODO: Implement getItems method
    getItems(): Product[] {
        // Return copy of items
    }
    
    // TODO: Implement checkout method
    checkout(customer: Customer): Order {
        // Create an order from cart items
    }
}

// 4. Generic Repository Pattern
class Repository<T extends { id: ProductId }> {
    private items: T[] = [];
    
    // TODO: Implement add method
    add(item: T): void {
        /* implement */
    }
    
    // TODO: Implement findById method with type guard
    findById(id: ProductId): T | undefined {
        /* implement */
    }
    
    // TODO: Implement getAll method
    getAll(): T[] {
        /* implement */
    }
    
    // TODO: Implement update method using Partial utility type
    update(id: ProductId, updates: Partial<T>): boolean {
        /* implement */
    }
}

// 5. Utility Functions with Advanced Types
// TODO: Create a function to filter products by category
function filterByCategory(
    products: Product[],
    category: string
): Product[] {
    /* implement */
}

// TODO: Create a function to convert currency (mock implementation)
function convertCurrency(
    amount: number,
    from: Currency,
    to: Currency
): number {
    /* implement with simplified rates */
}

// TODO: Create a type guard function
function isProduct(obj: any): obj is Product {
    /* implement type checking */
}

// 6. Testing Section
// TODO: Create test data and demonstrate all functionality
const productRepo = new Repository<Product>();
const cart = new ShoppingCart();

const sampleProduct: Product = {
    /* create sample product */
};

// Add product to repository
// Add product to cart
// Calculate total
// Create order
// Test all methods

console.log("E-Commerce system test complete!");
```


---

## Summary

After completing all exercises, you should be able to:
- Add type annotations to variables and functions
- Understand when TypeScript infers types automatically
- Use union and intersection types
- Create and use interfaces
- Write generic functions and classes
- Distinguish between type, interface, class, and object
- Apply type guards for runtime checking
- Build a complete typed application

**Estimated Time**: 2 to 3 hours (law 3mlna 7sab break el 2hwa 🙄)