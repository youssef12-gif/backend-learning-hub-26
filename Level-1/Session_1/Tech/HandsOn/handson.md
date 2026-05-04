# The Group Chat Roast

> **The story:** Your friend Mariam just texted the group chat: *"i got 40/100 on the exam"*. Everyone's reacting. Your job: write a small JS program that reads the score, decides the reaction, and roasts her (lovingly) using a template literal.
>
> *3 minutes. No excuses.*

---

## Tasks

### 1️⃣ Variables
Declare `const name = "Mariam"`, `let score = 40`, and `const passing = 50`. She did not pass.

---

### 2️⃣ If / Else
Write an `if / else if / else` block:
- score ≥ 85 → `"genius"`
- score ≥ 50 → `"fine"`
- else → `"yikes"`

Store the result in a variable called `reaction`.

---

### 3️⃣ Template Literals
Use a template literal to log the roast message. Include `name`, `score`, and `reaction` in one sentence. Make it funny. Mariam will understand.

---

### 4️⃣ Arrow Functions
Write an arrow function `passed` that takes a score and returns `true` if it's ≥ 50, else `false`. Call it with Mariam's score and log the result.

---

### 5️⃣ Arrays & Loops
Create an array `scores = [40, 78, 55, 91, 33]`. Loop through it and log each score with a pass/fail label. Use your `passed` function inside the loop.

---

## Expected output hints

| Task | Output |
|------|--------|
| Task 3 | `"Mariam got 40/100. Reaction: yikes. We still love you though."` |
| Task 4 | `false` |
| Task 5 | `40 → fail`, `78 → pass`, `55 → pass`, `91 → pass`, `33 → fail` |

---

*Run with `node roast.js` .*