// ====================================================================
// JAVASCRIPT FUNDAMENTALS - PRACTICE TASK SOLUTION
// Student Grade Calculator
// ====================================================================

console.log("╔════════════════════════════════════════╗");
console.log("║   JAVASCRIPT FUNDAMENTALS PRACTICE     ║");
console.log("╚════════════════════════════════════════╝\n");

// ====================================================================
// PART 1: STUDENT INFORMATION (Variables & Data Types)
// ====================================================================
console.log("=== PART 1: Student Information ===\n");

// Student information using const and let
const studentName = "Ahmed Ali";
let studentAge = 20;
const studentID = "STD001";
let isEnrolled = true;
let grade = null; // Will be assigned later

// Print data types
console.log(`Name: ${studentName} - Type: ${typeof studentName}`);
console.log(`Age: ${studentAge} - Type: ${typeof studentAge}`);
console.log(`Student ID: ${studentID} - Type: ${typeof studentID}`);
console.log(`Is Enrolled: ${isEnrolled} - Type: ${typeof isEnrolled}`);
console.log(`Grade: ${grade} - Type: ${typeof grade}`);
console.log("\n");

// ====================================================================
// PART 2: GRADE CALCULATION (Operators & Type Conversion)
// ====================================================================
console.log("=== PART 2: Grade Calculation ===\n");

// Scores as strings (demonstrating type conversion)
let score1 = "85";
let score2 = "90";
let score3 = "78";

// Convert to numbers
score1 = Number(score1);
score2 = Number(score2);
score3 = Number(score3);

// Calculate total and average
let totalScore = score1 + score2 + score3;
let averageScore = totalScore / 3;

console.log(`Total Score: ${totalScore}`);
console.log(`Average Before Bonus: ${averageScore.toFixed(2)}`);

// Add bonus points
averageScore += 5;

console.log(`Average After Bonus: ${averageScore.toFixed(2)}`);
console.log("\n");

// ====================================================================
// PART 3: GRADE CLASSIFICATION (If/Else Statements)
// ====================================================================
console.log("=== PART 3: Grade Classification ===\n");

// Determine grade letter
if (averageScore >= 90) {
  grade = "A";
} else if (averageScore >= 80) {
  grade = "B";
} else if (averageScore >= 70) {
  grade = "C";
} else if (averageScore >= 60) {
  grade = "D";
} else {
  grade = "F";
}

console.log(`Final Grade: ${grade}`);

// Check if student passed AND is enrolled (using logical operators)
if (grade !== "F" && isEnrolled) {
  console.log(`Status: ✅ Student ${studentName} has passed and is enrolled!`);
} else if (grade === "F" && isEnrolled) {
  console.log(`Status: ❌ Student ${studentName} has failed but is still enrolled.`);
} else {
  console.log(`Status: ⚠️ Student ${studentName} is not enrolled.`);
}
console.log("\n");

// ====================================================================
// PART 4: STRING MANIPULATION
// ====================================================================
console.log("=== PART 4: String Manipulation ===\n");

// String methods demonstration
console.log(`Uppercase: ${studentName.toUpperCase()}`);
console.log(`Lowercase: ${studentName.toLowerCase()}`);
console.log(`First Letter: ${studentName.charAt(0)}`);
console.log(`Contains 'Ahmed': ${studentName.includes("Ahmed")}`);
console.log(`Name Length: ${studentName.length}`);

// Split name into array
let nameParts = studentName.split(" ");
console.log(`Name Parts: [${nameParts.map(part => `"${part}"`).join(", ")}]`);
console.log("\n");

// ====================================================================
// PART 5: FUNCTIONS
// ====================================================================
console.log("=== PART 5: Functions ===\n");

// Regular function to calculate average
function calculateGrade(s1, s2, s3) {
  let total = s1 + s2 + s3;
  let avg = total / 3;
  return avg;
}

// Arrow function to get grade level
const getGradeLevel = (average) => {
  if (average >= 90) return "A";
  else if (average >= 80) return "B";
  else if (average >= 70) return "C";
  else if (average >= 60) return "D";
  else return "F";
};

// Arrow function to format student info
const formatStudentInfo = (name, age, gradeLevel) => {
  return `Student: ${name}, Age: ${age}, Grade: ${gradeLevel}`;
};

// Test functions
let testAverage = calculateGrade(85, 90, 78);
console.log(`Calculated Average: ${testAverage.toFixed(2)}`);
console.log(`Grade Level: ${getGradeLevel(testAverage)}`);
console.log(formatStudentInfo(studentName, studentAge, grade));
console.log("\n");

// ====================================================================
// PART 6: ARRAYS & OBJECTS
// ====================================================================
console.log("=== PART 6: Arrays & Objects ===\n");

// Array of exam scores
let examScores = [85, 90, 78, 92, 88];

// Student object
let student = {
  name: "Ahmed Ali",
  age: 20,
  id: "STD001",
  scores: [85, 90, 78, 92, 88],
  grade: "B",
  isEnrolled: true
};

// Access array elements
console.log(`First Score: ${examScores[0]}`);
console.log(`Last Score: ${examScores[examScores.length - 1]}`);

// Access object properties
console.log(`Student Name from Object: ${student.name}`);
console.log(`Student ID from Object: ${student.id}`);
console.log(`All Scores from Object: [${student.scores.join(", ")}]`);
console.log("\n");

// ====================================================================
// PART 7: LOOPS
// ====================================================================
console.log("=== PART 7: Loops ===\n");

// For loop - Print all scores with index
console.log("--- For Loop: All Scores ---");
for (let i = 0; i < examScores.length; i++) {
  console.log(`Score ${i}: ${examScores[i]}`);
}
console.log("---");

// While loop - Calculate sum of all scores
console.log("\n--- While Loop: Calculate Sum ---");
let sum = 0;
let index = 0;
while (index < examScores.length) {
  sum += examScores[index];
  index++;
}

console.log(`Total Sum: ${sum}`);
console.log(`Average: ${(sum / examScores.length).toFixed(2)}`);
console.log("\n");

// ====================================================================
// PART 8: BONUS CHALLENGE - Complete Student Report
// ====================================================================
console.log("=== PART 8: Complete Student Report ===\n");

// Function that generates complete student report
function generateStudentReport() {
  // Calculate statistics
  let total = 0;
  for (let i = 0; i < student.scores.length; i++) {
    total += student.scores[i];
  }
  let avg = total / student.scores.length;
  let finalGrade = getGradeLevel(avg);
  
  // Build report using template literals
  let report = `╔════════════════════════════════════════╗
║       STUDENT GRADE REPORT             ║
╚════════════════════════════════════════╝

Student: ${student.name.toUpperCase()} (ID: ${student.id})
Age: ${student.age} years old
Enrollment Status: ${student.isEnrolled ? "✅ Enrolled" : "❌ Not Enrolled"}

📊 Academic Performance:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;

  // Add each exam score using loop
  for (let i = 0; i < student.scores.length; i++) {
    report += `\nExam ${i + 1}: ${student.scores[i]}`;
  }
  
  report += `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Total Score: ${total}
Average: ${avg.toFixed(2)}
Final Grade: ${finalGrade}

${finalGrade !== "F" ? "✅ Status: PASSED" : "❌ Status: FAILED"}`;

  return report;
}

// Generate and display the report
console.log(generateStudentReport());
console.log("\n");

// ====================================================================
// EXTRA CHALLENGE: Validation and Error Handling
// ====================================================================
console.log("=== EXTRA CHALLENGE: Validation ===\n");

// Function to validate score
const validateScore = (score) => {
  // Check if undefined or null
  if (score === undefined || score === null) {
    return "Invalid: Score is undefined or null";
  }
  
  // Check if score is between 0 and 100
  if (score < 0 || score > 100) {
    return `Invalid: Score ${score} is out of range (0-100)`;
  }
  
  return "Valid";
};

// Test validation
console.log(`Validate 85: ${validateScore(85)}`);
console.log(`Validate 120: ${validateScore(120)}`);
console.log(`Validate null: ${validateScore(null)}`);
console.log(`Validate undefined: ${validateScore(undefined)}`);

// Check if name is empty
const checkName = (name) => {
  return name && name.trim().length > 0 
    ? "Name is valid" 
    : "Name is empty or invalid";
};

console.log(`\nCheck "${studentName}": ${checkName(studentName)}`);
console.log(`Check "": ${checkName("")}`);

// Using ternary operator for pass/fail
let passStatus = grade !== "F" ? "PASSED ✅" : "FAILED ❌";
console.log(`\nUsing Ternary Operator: ${passStatus}`);

console.log("\n");
console.log("╔════════════════════════════════════════╗");
console.log("║     ALL TESTS COMPLETED SUCCESSFULLY   ║");
console.log("╚════════════════════════════════════════╝");