# 🍕 The Great Pizza Disaster of 2026

> **The story:** You are Ahmed, a broke university student. It's 2 AM. You ordered pizza 45 minutes ago. The delivery guy, Khaled, just called — his GPS died and he's lost. Your mission: write a JavaScript program to help Khaled deliver your pizza before it turns into a frisbee.

---

## Tasks

### 1️⃣ Values & Variables
Declare a `let` variable called `studentName` (that's you) and a `const` called `pizzaFlavor` set to `"pepperoni"`. You are NOT changing your pizza order. Ever.

---

### 2️⃣ Data Types
Create these variables:
- `hungerLevel` = `10` (number)
- `isPizzaHot` = `true` (boolean)
- `deliveryAddress` = your address (string)

Log each one with `typeof` to prove to Khaled you know your data types.

---

### 3️⃣ Type Conversion & Coercion
Khaled sent the order total as `"85"` (a string — typo). Convert it to a number and add a `15` tip. Then coerce the boolean `true` to a number and add it too — Khaled deserves at least 1 extra pound for surviving this night.

---

### 4️⃣ Basic Operators
- Calculate `totalBill` = pizza cost + tip
- Calculate `minutesWaiting` = 45 + 15
- Use `%` to check if `minutesWaiting` is even or odd (useless but satisfying)

---

### 5️⃣ Operator Precedence
Write this expression and **guess the result before running it**:
```
2 + 3 * 4 - 1
```
Then try:
```
(2 + 3) * (4 - 1)
```
Log both. Cry a little.

---

### 6️⃣ If / Else Statements
- If `isPizzaHot` is `true` AND `hungerLevel > 7` → log `"OPEN THE DOOR AND SPRINT"`
- Else if hunger is between 5–7 → log `"Walk, you have dignity"`
- Else → log `"Order sushi next time"`

---

### 7️⃣ Statements & Expressions
Spot the difference:
- `hungerLevel > 5` is an **expression** (produces a value)
- `if (hungerLevel > 5) { ... }` is a **statement** (performs an action)

Write one of each and add a comment explaining the difference.

---

### 8️⃣ Strings
Using `pizzaFlavor`:
- Call `.toUpperCase()` on it
- Check its `.length`
- Use `.includes("pepper")` to confirm you did NOT order pineapple

Log all three results.

---

### 9️⃣ Template Literals
Log the full order summary using a **template literal** (backticks). Include `studentName`, `pizzaFlavor`, `totalBill`, and `minutesWaiting` in one sentence.

> No `+` concatenation on the values. Backticks only.

---

### 🔟 Intro to Arrays & Objects
- Create an array `toppings` with 3 items
- Create an object `order` with keys: `customer`, `flavor`, `isDelivered` (set to `false`)
- After the pizza arrives, update `isDelivered` to `true`

---

### 1️⃣1️⃣ Functions & Arrow Functions
- Write a regular function `calculateTotal(price, tip)` that returns their sum
- Rewrite it as an arrow function
- Call both and confirm they give the same result

---

### 1️⃣2️⃣ Loops
Khaled has 4 stops: `["Ahmed", "Sara", "Mona", "Tarek"]`

Use a `for` loop to log `"Delivering to [name]..."` for each one. Use `break` to stop as soon as you hit `"Ahmed"` — you're first, obviously.

---

### 1️⃣3️⃣ Comments
- Add a **single-line comment** above your `calculateTotal` function
- Add a **multi-line comment** at the very top of your file describing the entire tragedy

---

## Expected output hints

| Task | Output |
|------|--------|
| Task 3 | `101` (85 + 15 + 1) |
| Task 5 | `2 + 3 * 4 - 1` → `13` (not 19!) |
| Task 5 | `(2 + 3) * (4 - 1)` → `15` |
| Task 6 | `"OPEN THE DOOR AND SPRINT"` |
| Task 12 | Stops after `"Delivering to Ahmed..."` |

---

*Run your file with `node pizza.js` . Good luck — the pizza is counting on you.* 🍕