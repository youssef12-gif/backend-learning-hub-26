// ============================================
//  SESSION 1 - HANDS-ON PRACTICE - SOLUTIONS
// ============================================
// Complete all exercises below to practice what you learned!
// Uncomment each section when you're ready to work on it.

console.log("🎯 Welcome to Session 1 Practice!\n");

// ============================================
// 1️⃣ VARIABLES & DATA TYPES
// ============================================

console.log("--- 1. Variables & Data Types ---\n");

// TODO 1.1: Declare a variable called 'studentName' with YOUR name
let studentName = "Ahmed Hassan";

// TODO 1.2: Declare a constant called 'birthYear' with your birth year
const birthYear = 2000;

// TODO 1.3: Calculate your age and store it in a variable called 'age'
const currentYear = 2025;
let age = currentYear - birthYear;

// TODO 1.4: Create a boolean variable 'isStudent' and set it to true
let isStudent = true;

// TODO 1.5: Print all variables and their types
console.log("Name:", studentName, "- Type:", typeof studentName);
console.log("Birth Year:", birthYear, "- Type:", typeof birthYear);
console.log("Age:", age, "- Type:", typeof age);
console.log("Is Student:", isStudent, "- Type:", typeof isStudent);

// CHALLENGE 1: What happens if you try to reassign a const variable?
// Try it and see the error!
// birthYear = 2000; // Uncomment this line
// Answer: You get a TypeError: Assignment to constant variable.


// ============================================
// 2️⃣ BASIC OPERATORS
// ============================================

console.log("\n--- 2. Basic Operators ---\n");

// TODO 2.1: Perform basic arithmetic
let num1 = 20;
let num2 = 5;

let sum = num1 + num2;
let difference = num1 - num2;
let product = num1 * num2;
let quotient = num1 / num2;
let remainder = num1 % num2;

console.log("Sum:", sum);
console.log("Difference:", difference);
console.log("Product:", product);
console.log("Quotient:", quotient);
console.log("Remainder:", remainder);

// TODO 2.2: Use compound assignment operators
let score = 10;
score += 5;  // What is score now? // Your Answer = 15
score *= 2;  // What is score now? // Your Answer = 30
score -= 3;  // What is score now? // Your Answer = 27
console.log("Final score:", score);

// CHALLENGE 2: Calculate the area of a circle (πr²)
let radius = 7;
const PI = 3.14159;
let area = PI * radius * radius;
console.log("Circle area:", area);


// ============================================
// 3️⃣ OPERATOR PRECEDENCE
// ============================================

console.log("\n--- 3. Operator Precedence ---\n");

// TODO 3.1: Predict the output before running!
let result1 = 10 + 5 * 2; // What do you expect? // Your Answer = 20 (multiplication first)
console.log("Result 1:", result1); 

// TODO 3.2: Use parentheses to change the order
let result2 = (10 + 5) * 2; // What do you expect? // Your Answer = 30
console.log("Result 2:", result2);

// CHALLENGE 3: Calculate the average of three numbers
let grade1 = 85, grade2 = 90, grade3 = 78;
let average = (grade1 + grade2 + grade3) / 3;
console.log("Average grade:", average);


// ============================================
// 4️⃣ IF/ELSE STATEMENTS
// ============================================

console.log("\n--- 4. If/Else Statements ---\n");

// TODO 4.1: Check if a number is positive, negative, or zero
let number = -5;
if (number > 0) {
  console.log("Positive");
} else if (number < 0) {
  console.log("Negative");
} else {
  console.log("Zero");
}

// TODO 4.2: Check if a student passed (grade >= 50)
let studentGrade = 65;
if (studentGrade >= 50) {
  console.log("Passed!");
} else {
  console.log("Failed!");
}

// CHALLENGE 4: Grade classification system
// A: 90+, B: 80-89, C: 70-79, D: 60-69, F: <60
let examScore = 85;
if (examScore >= 90) {
  console.log("Grade: A");
} else if (examScore >= 80) {
  console.log("Grade: B");
} else if (examScore >= 70) {
  console.log("Grade: C");
} else if (examScore >= 60) {
  console.log("Grade: D");
} else {
  console.log("Grade: F");
}


// ============================================
// 5️⃣ TYPE CONVERSION & COERCION
// ============================================

console.log("\n--- 5. Type Conversion & Coercion ---\n");

// TODO 5.1: Convert strings to numbers
let strNum1 = "25";
let strNum2 = "10";
let convertedSum = Number(strNum1) + Number(strNum2);
console.log("Converted sum:", convertedSum);

// TODO 5.2: See type coercion in action
console.log("5" + 5);     // What happens? // Your Answer = "55" (string concatenation)
console.log("10" - 5);    // What happens? // Your Answer = 5 (converts to number)
console.log("10" * "2");  // What happens? // Your Answer = 20 (converts to number)

// CHALLENGE 5: Fix this calculation bug
let userInput1 = "100";
let userInput2 = "50";
let total1 = userInput1 + userInput2; // This gives "10050" instead of 150
//Fix it:
let correctTotal = Number(userInput1) + Number(userInput2);
console.log("Correct total:", correctTotal);


// ============================================
// 6️⃣ BOOLEAN LOGIC & OPERATORS
// ============================================

console.log("\n--- 6. Boolean Logic & Operators ---\n");

// TODO 6.1: Use logical operators
let hasLicense = true;
let hasInsurance = false;

console.log("Can drive legally:", hasLicense && hasInsurance);
console.log("Has at least one:", hasLicense || hasInsurance);
console.log("Doesn't have license:", !hasLicense);

// TODO 6.2: Compare with == vs ===
console.log(10 == "10");   // What's the output? true (loose equality)
console.log(10 === "10");  // What's the output? false (strict equality)
console.log(10 != "10");   // What's the output? false
console.log(10 !== "10");  // What's the output? true

// CHALLENGE 6: Login validation
// User can login if: (hasEmail AND hasPassword) OR isAdmin
let hasEmail = true;
let hasPassword = true;
let isAdmin = false;
let canLogin = (hasEmail && hasPassword) || isAdmin;
console.log("Can login:", canLogin);


// ============================================
// 7️⃣ STRINGS & STRING METHODS
// ============================================

console.log("\n--- 7. Strings & String Methods ---\n");

// TODO 7.1: Basic string methods
let message = "  Hello Backend World!  ";
console.log("Original:", message);
console.log("Uppercase:", message.toUpperCase());
console.log("Lowercase:", message.toLowerCase());
console.log("Trimmed:", message.trim());
console.log("Character at index 2:", message.charAt(2));

// TODO 7.2: String searching
let text = "JavaScript is awesome, JavaScript is fun!";
console.log("Includes 'awesome':", text.includes("awesome"));
console.log("Index of 'JavaScript':", text.indexOf("JavaScript"));
console.log("Last index of 'JavaScript':", text.lastIndexOf("JavaScript"));

// TODO 7.3: String extraction
let fullName = "John Doe Smith";
let firstName = fullName.slice(0, 4);
let lastName = fullName.slice(9);
console.log("First name:", firstName);
console.log("Last name:", lastName);

// TODO 7.4: String replacement
let sentence = "I love Python. Python is great!";
let newSentence = sentence.replaceAll("Python", "JavaScript");
console.log("New sentence:", newSentence);

// CHALLENGE 7: Extract file extension (like in the session)
let filename = "document.pdf";
// Method 1: Using slice
let extension1 = filename.slice(-3);

// Method 2: Using split (more generic)
let parts = filename.split(".");
let extension2 = parts[parts.length - 1];

console.log("Extension:", extension2);

// CHALLENGE 7.2: Create a username from email
let email = "john.doe@example.com";
// Extract everything before @ and convert to lowercase
let username = email.split("@")[0].toLowerCase();
console.log("Username:", username);


// ============================================
// 8️⃣ TEMPLATE LITERALS
// ============================================

console.log("\n--- 8. Template Literals ---\n");

// TODO 8.1: Use template literals
let personName = "Alice";
let personAge = 25;
let personCity = "Cairo";

// Old way:
console.log("Name: " + personName + ", Age: " + personAge + ", City: " + personCity);

// New way with template literals:
let info = `Name: ${personName}, Age: ${personAge}, City: ${personCity}`;
console.log(info);

// TODO 8.2: Multi-line strings
let multiLine = `
This is line 1
This is line 2
This is line 3
`;
console.log(multiLine);

// CHALLENGE 8: Create a formatted receipt
let itemName = "Laptop";
let price = 15000;
let quantity = 2;
let total2 = price * quantity;

let receipt = `
========== RECEIPT ==========
Item: ${itemName}
Price: ${price} EGP
Quantity: ${quantity}
----------------------------
Total: ${total2} EGP
=============================
`;
console.log(receipt);


// ============================================
// 9️⃣ FUNCTIONS
// ============================================

console.log("\n--- 9. Functions ---\n");

// TODO 9.1: Create a greeting function
function greet(name) {
  return `Hello, ${name}!`;
}
console.log(greet("Ahmed"));

// TODO 9.2: Create a function that adds two numbers
function add(a, b) {
  return a + b;
}
console.log("5 + 3 =", add(5, 3));

// TODO 9.3: Create an arrow function for multiplication
const multiply = (a, b) => {
  return a * b;
};
console.log("4 * 7 =", multiply(4, 7));

// TODO 9.4: Arrow function with implicit return
const square = (x) => x * x;
console.log("Square of 6:", square(6));

// CHALLENGE 9: Create a function to calculate BMI
// BMI = weight(kg) / (height(m))²
function calculateBMI(weight, height) {
  let bmi = weight / (height * height);
  return bmi.toFixed(2);
}
console.log("BMI:", calculateBMI(70, 1.75));

// CHALLENGE 9.2: Convert function to arrow function
function isEven(num) {
  return num % 2 === 0;
}
// Convert this to arrow function:
const isEvenArrow = (num) => num % 2 === 0;
console.log("Is 4 even?", isEvenArrow(4));
console.log("Is 7 even?", isEvenArrow(7));


// ============================================
// 🔟 ARRAYS
// ============================================

console.log("\n--- 10. Arrays ---\n");

// TODO 10.1: Create and manipulate arrays
let fruits = ["Apple", "Banana", "Orange"];
console.log("Fruits:", fruits);
console.log("First fruit:", fruits[0]);
console.log("Last fruit:", fruits[fruits.length - 1]);
console.log("Number of fruits:", fruits.length);

// TODO 10.2: Modify arrays
fruits.push("Mango");        // Add to end
fruits.unshift("Strawberry"); // Add to beginning
console.log("After adding:", fruits);

// Given 10.3: Remove from arrays
fruits.pop();    // Remove from end
fruits.shift();  // Remove from beginning
console.log("After removing:", fruits);

// CHALLENGE 10: Find and display even numbers from an array
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let evenNumbers = [];
for (let i = 0; i < numbers.length; i++) {
  if (numbers[i] % 2 === 0) {
    evenNumbers.push(numbers[i]);
  }
}
console.log("Even numbers:", evenNumbers);


// ============================================
// 1️⃣1️⃣ OBJECTS
// ============================================

console.log("\n--- 11. Objects ---\n");

// TODO 11.1: Create an object (name,age,major,gpa)
let student = {
  name: "Sara Ahmed",
  age: 21,
  major: "Computer Science",
  gpa: 3.8
};

console.log("Student:", student);
console.log("Name:", student.name);
console.log("GPA:", student.gpa);

// TODO 11.2: Modify object properties
student.gpa = 3.9;
student.year = "Senior";
console.log("Updated student:", student);

// CHALLENGE 11: Create a book object with title, author, pages, isRead
// Add a method that returns a summary string
let book = {
  title: "Clean Code",
  author: "Robert Martin",
  pages: 464,
  isRead: true,
  getSummary: function() {
    return `${this.title} by ${this.author}, ${this.pages} pages. ${this.isRead ? 'Already read' : 'Not read yet'}.`;
  }
};
console.log(book.getSummary());


// ============================================
// 1️⃣2️⃣ LOOPS
// ============================================

console.log("\n--- 12. Loops ---\n");

// TODO 12.1: For loop - count from 1 to 5
for (let i = 1; i <= 5; i++) {
  console.log("Count:", i);
}

// TODO 12.2: Loop through an array
let colors = ["Red", "Green", "Blue", "Yellow"];
for (let i = 0; i < colors.length; i++) {
  console.log("Color:", colors[i]);
}

// TODO 12.3: While loop - count down from 5
let countdown = 5;
while (countdown > 0) {
  console.log("Countdown:", countdown);
  countdown--;
}
console.log("Blast off! 🚀");

// CHALLENGE 12.1: Sum all numbers from 1 to 100
let sum100 = 0;
for (let i = 1; i <= 100; i++) {
  sum100 += i;
}
console.log("Sum of 1 to 100:", sum100);

// CHALLENGE 12.2: FizzBuzz!
// Print numbers 1-20, but:
// - If divisible by 3, print "Fizz"
// - If divisible by 5, print "Buzz"
// - If divisible by both, print "FizzBuzz"
console.log("\nFizzBuzz:");
for (let i = 1; i <= 20; i++) {
  if (i % 3 === 0 && i % 5 === 0) {
    console.log("FizzBuzz");
  } else if (i % 3 === 0) {
    console.log("Fizz");
  } else if (i % 5 === 0) {
    console.log("Buzz");
  } else {
    console.log(i);
  }
}


// ============================================
// 🎯 FINAL MEGA CHALLENGE
// ============================================

console.log("\n--- 🏆 FINAL MEGA CHALLENGE ---\n");

/*
Create a simple Student Management System:

1. Create an array of student objects with: name, age, grade
2. Create functions to:
   - Add a new student
   - Calculate average grade
   - Find top student
   - Display all students

3. Use template literals for nice formatting
4. Use loops to process the data
5. Use conditionals for logic
*/

let students = [
  { name: "Ahmed", age: 20, grade: 85 },
  { name: "Fatima", age: 21, grade: 92 },
  { name: "Omar", age: 19, grade: 78 }
];

function addStudent(name, age, grade) {
  students.push({ name: name, age: age, grade: grade });
  console.log(`✅ Added ${name} to the system.`);
}

function calculateAverageGrade() {
  let totalGrade = 0;
  for (let i = 0; i < students.length; i++) {
    totalGrade += students[i].grade;
  }
  return (totalGrade / students.length).toFixed(2);
}

function findTopStudent() {
  let topStudent = students[0];
  for (let i = 1; i < students.length; i++) {
    if (students[i].grade > topStudent.grade) {
      topStudent = students[i];
    }
  }
  return topStudent.name;
}

function displayAllStudents() {
  console.log("\n📚 All Students:");
  console.log("=".repeat(50));
  for (let i = 0; i < students.length; i++) {
    let s = students[i];
    console.log(`${i + 1}. ${s.name} - Age: ${s.age}, Grade: ${s.grade}`);
  }
  console.log("=".repeat(50));
}

// Test your functions:
addStudent("Nour", 22, 95);
console.log("Average grade:", calculateAverageGrade());
console.log("Top student:", findTopStudent());
displayAllStudents();


// ============================================
// 🎉 CONGRATULATIONS!
// ============================================

console.log("\n🎉 Great job completing the practice exercises!");
console.log("Keep practicing and experimenting with the code!");
console.log("Remember: The more you code, the better you get! 💪\n");

// ============================================
// 📝 NOTES & REMINDERS
// ============================================

/*
TIPS FOR SUCCESS:
1. Uncomment each section one at a time
2. Try to solve without looking at solutions first
3. Experiment! Change values and see what happens
4. Use console.log() liberally to debug
5. If stuck, review the README.md or ask on Discord
6. searching is valid

COMMON MISTAKES TO AVOID:
- Forgetting semicolons (not required but good practice)
- Confusing = (assignment) with == or === (comparison)
- Using var instead of let/const
- Not checking data types when debugging

KEYBOARD SHORTCUTS:
- Ctrl/Cmd + / : Comment/uncomment line
- Ctrl/Cmd + S : Save file
- Node filename.js : Run your code

HOW TO RUN THIS FILE:
1. Open terminal in the file's directory
2. Type: node HandsOn.js
3. Press Enter

Good luck! 🚀

*/