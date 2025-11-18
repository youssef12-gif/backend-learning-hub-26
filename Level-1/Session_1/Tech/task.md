#  JavaScript Fundamentals - Practice Task

## 📋 Overview
Build a **Student Grade Calculator** that demonstrates all fundamental JavaScript concepts covered in Session 1.

---

## 🎓 Task Requirements

### Part 1: Student Information (Variables & Data Types)
Create a student profile system:

1. Declare variables for:
   - Student name (use `const`)
   - Student age (use `let`)
   - Student ID (use `const`)
   - Is enrolled (boolean)
   - Grade (initially `null`)
   
2. Print the data type of each variable using `typeof`

**Expected Output Example:**
```
Name: Ahmed - Type: string
Age: 20 - Type: number
Is Enrolled: true - Type: boolean
```

---

### Part 2: Grade Calculation (Operators & Type Conversion)
Calculate the final grade:

1. Create variables for 3 exam scores (use string numbers like `"85"`, `"90"`, `"78"`)
2. Convert them to numbers using `Number()`
3. Calculate:
   - Total score
   - Average score
   - Add 5 bonus points using `+=` operator
4. Use template literals to display results

**Expected Output:**
```
Total Score: 253
Average Before Bonus: 84.33
Average After Bonus: 89.33
```

---

### Part 3: Grade Classification (If/Else Statements)
Implement grade classification logic:

1. If average >= 90: Grade = "A"
2. Else if average >= 80: Grade = "B"
3. Else if average >= 70: Grade = "C"
4. Else if average >= 60: Grade = "D"
5. Else: Grade = "F"

6. Use logical operators to check:
   - If student passed (grade !== "F") AND is enrolled
   - Print appropriate message

**Expected Output:**
```
Final Grade: B
Status: ✅ Student Ahmed has passed and is enrolled!
```

---

### Part 4: String Manipulation
Process the student's name:

1. Convert name to uppercase
2. Convert name to lowercase
3. Get the first character using `charAt()`
4. Check if name includes "Ahmed" using `includes()`
5. Get name length
6. Split full name into array (if it contains spaces)

**Expected Output:**
```
Uppercase: AHMED ALI
Lowercase: ahmed ali
First Letter: A
Contains 'Ahmed': true
Name Length: 9
Name Parts: ["Ahmed", "Ali"]
```

---

### Part 5: Functions
Create reusable functions:

1. **Regular function** `calculateGrade(score1, score2, score3)`:
   - Takes 3 scores as parameters
   - Returns the average

2. **Arrow function** `getGradeLevel = (average) => { ... }`:
   - Takes average as parameter
   - Returns grade letter (A, B, C, D, or F)

3. **Arrow function** `formatStudentInfo = (name, age, grade) => { ... }`:
   - Uses template literals
   - Returns formatted string

**Call these functions and print results**

---

### Part 6: Arrays & Objects
Create data structures:

1. **Array** of all exam scores `[85, 90, 78, 92, 88]`
2. **Object** for student:
```javascript
{
  name: "Ahmed",
  age: 20,
  id: "STD001",
  scores: [85, 90, 78, 92, 88],
  grade: "B"
}
```

3. Access and print:
   - First score from array
   - Last score from array
   - Student name from object
   - Student ID from object

---

### Part 7: Loops
Use loops to process data:

1. **For Loop**: Print all scores from the array with their index
2. **While Loop**: Calculate the sum of all scores
3. Print average using the sum

**Expected Output:**
```
Score 0: 85
Score 1: 90
Score 2: 78
Score 3: 92
Score 4: 88
---
Total Sum: 433
Average: 86.6
```

---

### Part 8: Bonus Challenge 🌟
Combine everything:

Create a function `generateStudentReport()` that:
1. Uses all variables created
2. Calculates statistics using loops
3. Formats output with template literals
4. Returns a complete student report

**Expected Final Report:**
```
╔════════════════════════════════════════╗
║       STUDENT GRADE REPORT             ║
╚════════════════════════════════════════╝

Student: AHMED ALI (ID: STD001)
Age: 20 years old
Enrollment Status: ✅ Enrolled

📊 Academic Performance:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Exam 1: 85
Exam 2: 90
Exam 3: 78
Exam 4: 92
Exam 5: 88
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Total Score: 433
Average: 86.6
Final Grade: B

✅ Status: PASSED
```

---

## 📝 Submission Guidelines

1. Create a file named `task.js` in your forked repo
2. Add clear comments explaining each section
3. Test your code with different values
4. Make sure all outputs are clear and formatted

---

## 💡 Hints

1. Use `const` for values that won't change (like student ID)
2. Use `let` for values that will change (like grade)
3. Remember: `===` checks value AND type, `==` only checks value
4. Template literals use backticks: `` `text ${variable}` ``
5. Array indices start at 0
6. Test your code step by step - don't write everything at once!

---

## 🚀 Extra Challenge (Optional)

Add these features:
- Check if a score is `undefined` or `null` before calculation
- Handle the case where the student name is an empty string
- Add validation: scores should be between 0 and 100
- Use the ternary operator (`condition ? true : false`) for at least one condition


---

## ⏰ Estimated Time
**2-3 hours** for complete implementation

Good luck! 🍀