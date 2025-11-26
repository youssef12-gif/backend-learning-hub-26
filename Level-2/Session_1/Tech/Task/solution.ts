// ============================================
// TYPESCRIPT TASK - COMPLETE SOLUTIONS
// All Exercises (1-7)
// ============================================

console.log("=".repeat(60));
console.log("EXERCISE 1: CORE TYPESCRIPT FEATURES");
console.log("=".repeat(60));

// Solution for Exercise 1
function createUser(
	name: string,
	age: number,
	isActive: boolean
): {
	name: string;
	age: number;
	isActive: boolean;
	greeting: string;
} {
	return {
		name: name,
		age: age,
		isActive: isActive,
		greeting: `Welcome, ${name}!`,
	};
}

// Test the function
const user1 = createUser("Alice", 25, true);
console.log("User created:", user1);
console.log();

// Alternative with interface
interface UserResult {
	name: string;
	age: number;
	isActive: boolean;
	greeting: string;
}

function createUserWithInterface(
	name: string,
	age: number,
	isActive: boolean
): UserResult {
	return {
		name,
		age,
		isActive,
		greeting: `Welcome, ${name}!`,
	};
}

const user2 = createUserWithInterface("Bob", 30, false);
console.log("User with interface:", user2);
console.log();

// ============================================
console.log("=".repeat(60));
console.log("EXERCISE 2: EXPLICIT TYPE ANNOTATIONS");
console.log("=".repeat(60));

// Solution for Exercise 2
let productName: string = "Laptop";
let price: number = 999.99;
let inStock: boolean = true;
let tags: string[] = ["electronics", "computers", "new"];
let metadata: { weight: number; color: string } = {
	weight: 2.5,
	color: "silver",
};

console.log("Product:", productName);
console.log("Price:", price);
console.log("In Stock:", inStock);
console.log("Tags:", tags);
console.log("Metadata:", metadata);
console.log();

// Tax calculator function
function calculateTotal(price: number, taxRate: number): number {
	return price + price * taxRate;
}

const totalWithTax = calculateTotal(100, 0.15);
console.log(`Total with tax: $${totalWithTax.toFixed(2)}`);
console.log();

// Array annotation
let scores: number[] = [95, 87, 92, 88];
console.log("Scores:", scores);
console.log();

// Tuple type for coordinates
let coordinate: [number, number] = [10, 20];
console.log("Coordinate [x, y]:", coordinate);
console.log();

// ============================================
console.log("=".repeat(60));
console.log("EXERCISE 3: TYPE INFERENCE ENGINE");
console.log("=".repeat(60));

// Solution for Exercise 3
// Basic inference
let inferredString = "Hello"; // Type: string
let inferredNumber = 42; // Type: number
let inferredArray = [1, 2, 3, 4]; // Type: number[]
let inferredObject = { name: "Alice", age: 30 }; // Type: { name: string; age: number }

console.log("Inferred types:");
console.log("- inferredString:", typeof inferredString);
console.log("- inferredNumber:", typeof inferredNumber);
console.log(
	"- inferredArray:",
	Array.isArray(inferredArray) ? "array" : typeof inferredArray
);
console.log("- inferredObject:", typeof inferredObject);
console.log();

// Error demonstration (commented out)
// inferredString = 100; // ❌ Error: Type 'number' is not assignable to type 'string'

// Function return type inference
function multiply(a: number, b: number) {
	return a * b; // Return type inferred as: number
}

const result = multiply(5, 3);
console.log("Multiply result:", result);
console.log();

// Const inference
const constantValue = "TypeScript"; // Type: "TypeScript" (literal type)
// constantValue = "JavaScript"; // ❌ Error: Cannot assign to 'constantValue' because it is a constant

// Context-based inference
const numbers = [1, 2, 3, 4, 5];
console.log("Squared numbers:");
numbers.forEach((item) => {
	// 'item' is inferred as number from array type
	console.log(`  ${item}² = ${item * item}`);
});
console.log();

// Best common type inference
let mixed = [1, "two", 3, "four"]; // Type: (string | number)[]
console.log("Mixed array type: (string | number)[]");
console.log("Mixed array:", mixed);
console.log();

// ============================================
console.log("=".repeat(60));
console.log("EXERCISE 4: BIDIRECTIONAL TYPE CHECKING");
console.log("=".repeat(60));

// Solution for Exercise 4

// Top-down typing
let userProfile: { name: string; age: number };
userProfile = { name: "Mohsen", age: 25 }; // ✅ OK
// userProfile = { name: "Mahmoud" }; // ❌ Error: Property 'age' is missing

console.log("User profile:", userProfile);
console.log();

// Bottom-up typing
function processUser(user: { name: string; age: number }): string {
	return `${user.name} is ${user.age} years old`;
}

const newUser = { name: "Dina", age: 28, email: "dina@example.com" };
// Extra property 'email' is OK due to structural typing
const processedUser = processUser(newUser);
console.log("Processed user:", processedUser);
console.log();

// Function parameter bidirectional checking
type Calculator = (a: number, b: number) => number;

const add: Calculator = (x, y) => {
	// x and y are inferred as number from Calculator type
	return x + y;
};

console.log("Add function result:", add(10, 5));
console.log();

// Array methods with bidirectional checking
const names = ["Ali", "Barthinia", "Mohsen"];
const upperCased = names.map((name) => {
	// 'name' is inferred as string from names array type
	return name.toUpperCase();
});

console.log("Uppercase names:", upperCased);
console.log();

// Promise type inference
async function fetchData(): Promise<string> {
	return "data from server";
}

fetchData().then((result) => {
	// 'result' is inferred as string from Promise<string>
	console.log("Fetched result:", result);
});
console.log();

// ============================================
console.log("=".repeat(60));
console.log("EXERCISE 5: ADVANCED TYPE CONSTRUCTS");
console.log("=".repeat(60));

// Solution for Exercise 5

// 1. Union Types
function getItemById(id: string | number): string {
	if (typeof id === "string") {
		return `Item with string ID: ${id}`;
	} else {
		return `Item with numeric ID: ${id}`;
	}
}

console.log(getItemById("ABC123"));
console.log(getItemById(456));
console.log();

// 2. Intersection Types
type HasName = { name: string };
type HasAge = { age: number };
type Person = HasName & HasAge;

const person: Person = {
	name: "Ahmed",
	age: 28,
};

console.log("Person:", person);
console.log();

// 3. Literal Types
type Status = "pending" | "approved" | "rejected";
let orderStatus: Status = "pending";
console.log("Order status:", orderStatus);

orderStatus = "approved";
console.log("Updated status:", orderStatus);

// orderStatus = "shipped"; // ❌ Error: Type '"shipped"' is not assignable to type 'Status'
console.log();

// 4. Type Aliases
type Product = {
	id: number;
	name: string;
	price: number;
};

const product: Product = {
	id: 1,
	name: "Mouse",
	price: 29.99,
};

console.log("Product:", product);
console.log();

// 5. Generic function
function getFirst<T>(arr: T[]): T | undefined {
	return arr[0];
}

const firstNumber = getFirst([1, 2, 3]); // number | undefined
const firstString = getFirst(["a", "b"]); // string | undefined
const firstBoolean = getFirst([true, false]); // boolean | undefined

console.log("First number:", firstNumber);
console.log("First string:", firstString);
console.log("First boolean:", firstBoolean);
console.log();

// 6. Utility Types
type PartialProduct = Partial<Product>;
type ReadonlyProduct = Readonly<Product>;
type ProductPreview = Pick<Product, "name" | "price">;

const partialProduct: PartialProduct = {
	name: "Keyboard", // Only name, other properties optional
};

const readonlyProduct: ReadonlyProduct = {
	id: 2,
	name: "Monitor",
	price: 299.99,
};
// readonlyProduct.price = 199.99; // ❌ Error: Cannot assign to 'price' because it is a read-only property

const productPreview: ProductPreview = {
	name: "Headphones",
	price: 79.99,
	// id is excluded
};

console.log("Partial product:", partialProduct);
console.log("Readonly product:", readonlyProduct);
console.log("Product preview:", productPreview);
console.log();

// ============================================
console.log("=".repeat(60));
console.log("EXERCISE 6: TYPE VS INTERFACE VS CLASS VS OBJECT");
console.log("=".repeat(60));

// Solution for Exercise 6

// 1. Type Aliases
type ID = string | number;
type Point = { x: number; y: number };
type Callback = (data: string) => void;

const userId: ID = "USER-123";
const userIdNum: ID = 456;
const point: Point = { x: 10, y: 20 };
const callback: Callback = (data) => console.log("Callback received:", data);

console.log("User ID (string):", userId);
console.log("User ID (number):", userIdNum);
console.log("Point:", point);
callback("Hello");
console.log();

// 2. Interface
interface Animal {
	name: string;
	age: number;
}

interface Dog extends Animal {
	breed: string;
}

const myDog: Dog = {
	name: "Buddy",
	age: 3,
	breed: "Labrador",
};

console.log("Dog:", myDog);
console.log();

// 3. Class
class Vehicle {
	constructor(
		public brand: string,
		public model: string,
		private year: number
	) {}

	getInfo(): string {
		return `${this.brand} ${this.model} (${this.year})`;
	}

	getAge(): number {
		const currentYear = new Date().getFullYear();
		return currentYear - this.year;
	}
}

const myCar = new Vehicle("Toyota", "Camry", 2020);
console.log("Vehicle info:", myCar.getInfo());
console.log("Vehicle age:", myCar.getAge(), "years");
console.log();

// 4. Object Literal
const book: { title: string; author: string; pages: number } = {
	title: "TypeScript Guide",
	author: "Developer",
	pages: 250,
};

console.log("Book:", book);
console.log();

// Combined exercise
// 1. User interface
interface User {
	name: string;
	email: string;
}

// 2. UserId type
type UserId = string | number;

// 3. UserManager class
class UserManager {
	private users: Map<UserId, User> = new Map();

	addUser(id: UserId, user: User): void {
		this.users.set(id, user);
		console.log(`✅ User added: ${user.name} (ID: ${id})`);
	}

	removeUser(id: UserId): boolean {
		const deleted = this.users.delete(id);
		if (deleted) {
			console.log(`✅ User removed (ID: ${id})`);
		} else {
			console.log(`⚠️  User not found (ID: ${id})`);
		}
		return deleted;
	}

	getUser(id: UserId): User | undefined {
		return this.users.get(id);
	}

	getAllUsers(): User[] {
		return Array.from(this.users.values());
	}
}

// 4. Admin object literal
const admin: {
	name: string;
	email: string;
	role: string;
	permissions: string[];
} = {
	name: "Admin User",
	email: "admin@example.com",
	role: "administrator",
	permissions: ["read", "write", "delete"],
};

console.log("Admin:", admin);
console.log();

// Test UserManager
const userManager = new UserManager();
userManager.addUser(1, { name: "Alice", email: "alice@example.com" });
userManager.addUser("U-001", { name: "Bob", email: "bob@example.com" });
console.log("All users:", userManager.getAllUsers());
userManager.removeUser(1);
console.log();

// ============================================
console.log("=".repeat(60));
console.log("EXERCISE 7: E-COMMERCE SYSTEM");
console.log("=".repeat(60));

// Solution for Exercise 7
// (Complete implementation from previous artifact)

// 1. TYPE ALIASES
type ProductId = string | number;
type Currency = "USD" | "EUR" | "GBP";
type OrderStatus = "pending" | "processing" | "shipped" | "delivered";

// 2. INTERFACES
interface ProductType {
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
	products: ProductType[];
	status: OrderStatus;
	total: number;
}

// 3. SHOPPING CART CLASS
class ShoppingCart {
	private items: ProductType[] = [];

	addItem(product: ProductType): void {
		if (!product.inStock) {
			console.log(`❌ Cannot add "${product.name}" - out of stock`);
			return;
		}

		const existingItem = this.items.find((item) => item.id === product.id);
		if (existingItem) {
			console.log(`⚠️  "${product.name}" is already in cart`);
			return;
		}

		this.items.push(product);
		console.log(`✅ Added "${product.name}" to cart`);
	}

	removeItem(productId: ProductId): void {
		const initialLength = this.items.length;
		this.items = this.items.filter((item) => item.id !== productId);

		if (this.items.length < initialLength) {
			console.log(`✅ Removed product (ID: ${productId}) from cart`);
		} else {
			console.log(`⚠️  Product (ID: ${productId}) not found in cart`);
		}
	}

	calculateTotal(): number {
		return this.items.reduce((total, item) => total + item.price, 0);
	}

	getItems(): ProductType[] {
		return [...this.items];
	}

	checkout(customer: Customer): Order {
		if (this.items.length === 0) {
			throw new Error("Cannot checkout with empty cart");
		}

		const order: Order = {
			orderId: this.generateOrderId(),
			customerId: customer.id,
			products: [...this.items],
			status: "pending",
			total: this.calculateTotal(),
		};

		customer.orders.push(order);
		this.items = [];

		console.log(
			`✅ Order created successfully! Order ID: ${order.orderId}`
		);
		return order;
	}

	private generateOrderId(): string {
		return `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
	}
}

// 4. GENERIC REPOSITORY CLASS
class Repository<T extends { id: ProductId }> {
	private items: T[] = [];

	add(item: T): void {
		const existingItem = this.items.find((i) => i.id === item.id);
		if (existingItem) {
			console.log(`⚠️  Item with ID ${item.id} already exists`);
			return;
		}

		this.items.push(item);
		console.log(`✅ Item added to repository (ID: ${item.id})`);
	}

	findById(id: ProductId): T | undefined {
		return this.items.find((item) => item.id === id);
	}

	getAll(): T[] {
		return [...this.items];
	}

	update(id: ProductId, updates: Partial<T>): boolean {
		const itemIndex = this.items.findIndex((item) => item.id === id);

		if (itemIndex === -1) {
			console.log(`⚠️  Item with ID ${id} not found`);
			return false;
		}

		this.items[itemIndex] = {
			...this.items[itemIndex],
			...updates,
		};

		console.log(`✅ Item updated (ID: ${id})`);
		return true;
	}
}

// 5. UTILITY FUNCTIONS
function filterByCategory(
	products: ProductType[],
	category: string
): ProductType[] {
	return products.filter(
		(product) => product.category.toLowerCase() === category.toLowerCase()
	);
}

function convertCurrency(amount: number, from: Currency, to: Currency): number {
	if (from === to) return amount;

	const rates: Record<Currency, number> = {
		USD: 1.0,
		EUR: 0.85,
		GBP: 0.73,
	};

	const inUSD = amount / rates[from];
	const converted = inUSD * rates[to];

	return Math.round(converted * 100) / 100;
}

function isProduct(obj: any): obj is ProductType {
	return (
		typeof obj === "object" &&
		obj !== null &&
		"id" in obj &&
		(typeof obj.id === "string" || typeof obj.id === "number") &&
		typeof obj.name === "string" &&
		typeof obj.price === "number" &&
		typeof obj.currency === "string" &&
		["USD", "EUR", "GBP"].includes(obj.currency) &&
		typeof obj.inStock === "boolean" &&
		typeof obj.category === "string"
	);
}

// 6. TESTING
const productRepo = new Repository<ProductType>();
const cart = new ShoppingCart();

const laptop: ProductType = {
	id: 1,
	name: "Gaming Laptop",
	price: 1299.99,
	currency: "USD",
	inStock: true,
	category: "Electronics",
};

const mouse: ProductType = {
	id: 2,
	name: "Wireless Mouse",
	price: 29.99,
	currency: "USD",
	inStock: true,
	category: "Accessories",
};

const keyboard: ProductType = {
	id: 3,
	name: "Mechanical Keyboard",
	price: 89.99,
	currency: "USD",
	inStock: false,
	category: "Accessories",
};

const customer: Customer = {
	id: 1,
	name: "John Doe",
	email: "john@example.com",
	orders: [],
};

// Test repository
console.log("\n📦 Testing Repository:");
productRepo.add(laptop);
productRepo.add(mouse);
productRepo.add(keyboard);

// Test cart
console.log("\n🛒 Testing Shopping Cart:");
cart.addItem(laptop);
cart.addItem(mouse);
cart.addItem(keyboard); // Should fail - out of stock
console.log(`Total: $${cart.calculateTotal()}`);

// Test utilities
console.log("\n🔧 Testing Utilities:");
const accessories = filterByCategory(productRepo.getAll(), "Accessories");
console.log(`Found ${accessories.length} accessories`);

const eurPrice = convertCurrency(100, "USD", "EUR");
console.log(`$100 USD = €${eurPrice} EUR`);

console.log(`Is laptop a product? ${isProduct(laptop)}`);

// Test checkout
console.log("\n💳 Testing Checkout:");
const order = cart.checkout(customer);
console.log(`Order total: $${order.total}`);
console.log(`Customer has ${customer.orders.length} order(s)`);

console.log("\n🎉 All Exercises Complete!");
console.log("=".repeat(60));
