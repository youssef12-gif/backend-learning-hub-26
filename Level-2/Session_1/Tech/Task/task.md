# Welcome to Task 1 in Level 2 
# Intro to TypeScript

### Before you begin, you should revise the Session documentation to recall the basics
**Extra:** Read about `partial types` in the TypeScript documentation

---

## 📝 Task Overview

This task consists of 7 exercises that progressively build your TypeScript skills. Complete all exercises to demonstrate your understanding of TypeScript's type system.

**Estimated Time:** 2-3 hours (law 3mlna 7sab break el 2hwa 🙄)

---

## Exercise 1: Core TypeScript Features

### Objective
Demonstrate understanding of TypeScript's basic type system with a simple function.

### Instructions

1. Create a function called `createUser` that:
   - Accepts three parameters:
     - `name` (string)
     - `age` (number)
     - `isActive` (boolean)
   - Returns an object containing:
     - All three input properties
     - A `greeting` property with a welcome message

2. Add proper type annotations to:
   - Function parameters
   - Return type

3. Test your function by calling it with appropriate arguments

### Expected Output
```typescript
const user = createUser("Alice", 25, true);

console.log(user);
// Should return: { name: "Alice", age: 25, isActive: true, greeting: "Welcome, Alice!" }
```

---

## Exercise 2: Explicit Type Annotations

### Objective
Practice adding explicit type annotations to variables and functions.

### Instructions

1. **Annotate Variables:**
   Create and explicitly type these variables:
   - `productName` - a string for product name
   - `price` - a number for product price
   - `inStock` - a boolean for availability
   - `tags` - an array of strings
   - `metadata` - an object with `weight` (number) and `color` (string)

2. **Create a Tax Calculator Function:**
   - Function name: `calculateTotal`
   - Parameters: `price` (number), `taxRate` (number)
   - Return type: number
   - Should calculate: price + (price × taxRate)

3. **Array Annotation:**
   - Create `scores` as an explicitly typed array of numbers
   - Initialize it with values: [95, 87, 92, 88]

4. **Tuple Type:**
   - Create a `coordinate` tuple type for [x, y] coordinates
   - Initialize with: [10, 20]

### Key Learning
Understanding when and how to use explicit type annotations.

---

## Exercise 3: Type Inference Engine

### Objective
Explore TypeScript's automatic type inference capabilities.

### Instructions

1. **Basic Inference:**
   Create these variables and observe what types TypeScript infers:
   - A string variable
   - A number variable
   - An array of numbers
   - An object with name and age properties

2. **Function Return Type Inference:**
   - Create a `multiply` function that takes two numbers
   - Don't specify return type - let TypeScript infer it
   - What type does TypeScript infer?

3. **Const Inference:**
   - Create a const variable with a string value
   - Try to reassign it - what happens?

4. **Context-Based Inference:**
   - Create an array of numbers
   - Use `.forEach()` on it
   - What type does TypeScript infer for the callback parameter?

5. **Mixed Array Inference:**
   - Create an array with: [1, "two", 3, "four"]
   - What type does TypeScript infer?
   - Why this type?

### Questions to Answer
- When does TypeScript infer types automatically?
- When do you need explicit annotations?
- How does const vs let affect type inference?

---

## Exercise 4: Bidirectional Type Checking

### Objective
Understand how TypeScript checks types in both directions (top-down and bottom-up).

### Instructions

1. **Top-Down Type Flow:**
   - Declare a variable with type: `{ name: string; age: number }`
   - Assign a valid object to it
   - Try assigning an incomplete object - what error do you get?

2. **Bottom-Up Type Flow:**
   - Create a function that accepts `{ name: string; age: number }`
   - Create an object with extra properties: name, age, and email
   - Pass this object to the function - does it work? Why?

3. **Function Type Inference:**
   - Create a type alias: `Calculator = (a: number, b: number) => number`
   - Create an `add` function with this type
   - Don't type the parameters - hover over them in your IDE
   - What types does TypeScript infer?

4. **Array Method Inference:**
   - Create an array of strings
   - Use `.map()` to uppercase each string
   - What type does TypeScript infer for the callback parameter?

5. **Promise Type Inference:**
   - Create an async function that returns `Promise<string>`
   - Use `.then()` on the promise
   - What type is the result in the `.then()` callback?

### Key Concepts
- Top-down: Expected type flows into expression
- Bottom-up: Expression type flows outward
- Context-based inference

---

## Exercise 5: Advanced Type Constructs

### Objective
Master advanced TypeScript type features.

### Instructions

1. **Union Types:**
   - Create a function `getItemById` that accepts either string OR number as ID
   - Use type guard (typeof) to handle both cases
   - Return appropriate message for each type

2. **Intersection Types:**
   - Create two types: `HasName` (with name property) and `HasAge` (with age property)
   - Combine them into a `Person` type using intersection
   - Create a person object with both properties

3. **Literal Types:**
   - Create a `Status` type that only allows: "pending", "approved", "rejected"
   - Create a variable with this type
   - Try assigning an invalid value - what happens?

4. **Type Aliases:**
   - Create a `Product` type with:
     - id (number)
     - name (string)
     - price (number)
   - Create a product object using this type

5. **Generic Function:**
   - Create a `getFirst` generic function that:
     - Accepts an array of any type
     - Returns the first element or undefined
   - Test with number array and string array

6. **Utility Types:**
   Using the `Product` type from above, create:
   - `PartialProduct` - all properties optional (use `Partial<>`)
   - `ReadonlyProduct` - all properties readonly (use `Readonly<>`)
   - `ProductPreview` - only name and price (use `Pick<>`)

### Expected Results
- Demonstrate type safety with unions
- Combine types with intersections
- Restrict values with literals
- Create reusable code with generics
- Transform types with utilities

---

## Exercise 6: Type vs Interface vs Class vs Object

### Objective
Understand when to use each TypeScript construct.

### Instructions

1. **Type Aliases:**
   Create these type aliases:
   - `ID` - can be string or number
   - `Point` - object with x and y coordinates
   - `Callback` - function that takes string and returns void

2. **Interface:**
   - Create an `Animal` interface with name and age
   - Create a `Dog` interface that extends `Animal` and adds breed
   - Create a dog object implementing this interface

3. **Class:**
   - Create a `Vehicle` class with:
     - Constructor parameters: brand, model, year
     - Method: `getInfo()` that returns formatted string
   - Create an instance and test the method

4. **Object Literal:**
   - Create a book object with explicit type:
     - title (string)
     - author (string)
     - pages (number)

5. **Combined Exercise:**
   Create:
   - A `User` interface (name, email)
   - A `UserId` type (string | number)
   - A `UserManager` class with methods to add/remove users
   - An `admin` object literal with specific properties

### Key Understanding
- **Type:** For unions, primitives, aliases
- **Interface:** For object shapes, extensibility
- **Class:** For implementation + type definition
- **Object:** For actual runtime data

---

## Exercise 7: E-Commerce System (Main Project)

### Objective
Combine all TypeScript concepts into a complete application.

### Instructions

**DO NOT WRITE THIS IN MARKDOWN - COPY THIS TO YOUR `task.ts` FILE AND IMPLEMENT IT:**

```typescript
// ============================================
// E-COMMERCE SYSTEM - COMPLETE IMPLEMENTATION
// ============================================

// 1. TYPE ALIASES
// TODO: Define these type aliases:
type ProductId = string | number;
type Currency = "USD" | "EUR" | "GBP";
type OrderStatus = "pending" | "processing" | "shipped" | "delivered";

// 2. INTERFACES

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

// 3. SHOPPING CART CLASS
// TODO: Implement complete ShoppingCart class
class ShoppingCart {
    private items: Product[] = [];
    
    // TODO: Add a product to cart (check if in stock first)
    addItem(product: Product): void {
        // Your implementation
    }
    
    // TODO: Remove a product by ID
    removeItem(productId: ProductId): void {
        // Your implementation
    }
    
    // TODO: Calculate total price of all items
    calculateTotal(): number {
        // Your implementation
    }
    
    // TODO: Get all items in cart (return a copy)
    getItems(): Product[] {
        // Your implementation
    }
    
    // TODO: Create an order from current cart
    checkout(customer: Customer): Order {
        // Your implementation
    }
}

// 4. GENERIC REPOSITORY CLASS
// TODO: Implement generic Repository pattern
class Repository<T extends { id: ProductId }> {
    private items: T[] = [];
    
    // TODO: Add an item to repository
    add(item: T): void {
        // Your implementation
    }
    
    // TODO: Find item by ID
    findById(id: ProductId): T | undefined {
        // Your implementation
    }
    
    // TODO: Get all items
    getAll(): T[] {
        // Your implementation
    }
    
    // TODO: Update item using Partial utility
    update(id: ProductId, updates: Partial<T>): boolean {
        // Your implementation
    }
}

// 5. UTILITY FUNCTIONS
// TODO: Filter products by category
function filterByCategory(
    products: Product[],
    category: string
): Product[] {
    // Your implementation
}

// TODO: Convert currency (use simplified conversion rates)
function convertCurrency(
    amount: number,
    from: Currency,
    to: Currency
): number {
    // Your implementation
    // Example rates: USD to EUR = 0.85, USD to GBP = 0.73
}

// TODO: Type guard to check if object is a Product
function isProduct(obj: any): obj is Product {
    // Your implementation
    // Check if object has all required Product properties
}

// 6. TESTING SECTION
// TODO: Create instances and test all functionality

// Create product repository
const productRepo = new Repository<Product>();

// Create shopping cart
const cart = new ShoppingCart();

// Create sample products
const laptop: Product = {
    id: 1,
    name: "Gaming Laptop",
    price: 1299.99,
    currency: "USD",
    inStock: true,
    category: "Electronics"
};

const mouse: Product = {
    id: 2,
    name: "Wireless Mouse",
    price: 29.99,
    currency: "USD",
    inStock: true,
    category: "Accessories"
};

const keyboard: Product = {
    id: 3,
    name: "Mechanical Keyboard",
    price: 89.99,
    currency: "USD",
    inStock: false,
    category: "Accessories"
};

// Create sample customer
const customer: Customer = {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    orders: []
};

// TODO: Test repository operations
// - Add products to repository
// - Find product by ID
// - Get all products
// - Update product

// TODO: Test cart operations
// - Add products to cart
// - Try adding out-of-stock product
// - Calculate total
// - Remove item
// - Get cart items

// TODO: Test utility functions
// - Filter products by category
// - Convert currency
// - Test type guard

// TODO: Test checkout process
// - Create order from cart
// - Verify order details

console.log("🛒 E-Commerce System Test Complete!");

// TODO: Add console.log statements to verify each operation
```

### Implementation Requirements

1. **ShoppingCart Class:**
   - ✅ Prevent adding out-of-stock items
   - ✅ Handle removing non-existent items
   - ✅ Calculate total correctly
   - ✅ Generate unique order ID on checkout
   - ✅ Clear cart after checkout

2. **Repository Class:**
   - ✅ Prevent duplicate IDs
   - ✅ Handle non-existent items gracefully
   - ✅ Return copies, not references
   - ✅ Validate updates

3. **Utility Functions:**
   - ✅ Case-insensitive category filtering
   - ✅ Reasonable currency conversion rates
   - ✅ Thorough type guard checking

4. **Testing:**
   - ✅ Test all methods
   - ✅ Include error cases
   - ✅ Log results to console
   - ✅ Verify type safety

### Bonus Challenges (Optional)

1. Add a `discount` feature to products
2. Implement a `clearCart()` method
3. Add quantity support (currently 1 per product)
4. Create a `getOrderHistory()` method for customers
5. Implement proper error handling with custom error types

---


### Compilation Requirements

Your code must compile with these settings:
```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "noEmitOnError": true,
    "target": "ES2020"
  }
}
```

---

## ✅ Checklist Before Submission

- [ ] All 7 exercises completed
- [ ] Code compiles without errors
- [ ] Strict mode enabled
- [ ] No `any` types used (unless absolutely necessary)
- [ ] All functions have proper type annotations
- [ ] Exercise 7 fully implements all requirements
- [ ] Testing section demonstrates all features
- [ ] Code is clean and well-commented
- [ ] tsconfig.json is properly configured

---

## 🎯 Learning Outcomes

After completing this task, you should be able to:

✅ Add type annotations to variables, functions, and objects  
✅ Understand when TypeScript infers types automatically  
✅ Use union and intersection types effectively  
✅ Create and implement interfaces  
✅ Write generic functions and classes  
✅ Choose between type, interface, class, and object  
✅ Apply utility types (Partial, Readonly, Pick)  
✅ Implement type guards for runtime safety  
✅ Build a complete typed application  
✅ Configure TypeScript for production use  

---

## 💡 Tips for Success

1. **Start Simple:** Complete exercises in order
2. **Read Errors:** TypeScript errors are helpful, not scary
3. **Use Strict Mode:** It teaches you better practices
4. **Test Everything:** Console.log to verify behavior
5. **Avoid `any`:** It defeats the purpose of TypeScript
6. **Hover in IDE:** Your editor shows inferred types
7. **Experiment:** Try breaking things to understand better
8. **Ask Questions:** Use Discord if stuck

---

## 📚 Helpful Resources

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [TypeScript Playground](https://www.typescriptlang.org/play)
- [Utility Types Reference](https://www.typescriptlang.org/docs/handbook/utility-types.html)
- Session documentation (Theory and Tech parts)

---

## 🏆 Bonus Points

Earn extra Mohsens by:
- Implementing all bonus challenges in Exercise 7
- Adding comprehensive comments explaining your code
- Creating additional test cases
- Writing clean, production-quality code
- Helping others (without giving direct answers)

---

**Good luck, and happy typing! 🚀**

*Remember: The goal is not just to make it work, but to understand WHY it works and how TypeScript's type system helps you write better code.*