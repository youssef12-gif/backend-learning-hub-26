
# TypeScript Advanced – Callback & Async/Await Task  
📌 Practice Task for Session 2

## 📋 Overview
Build a Simple Weather Data Fetcher that demonstrates:
- Callbacks  
- Promises  
- Async/Await  
- Error Handling  
- setTimeout  
- Asynchronous flow  

---

# 📝 Submission Guidelines
- Create a file named asyncTask.ts 
- Make sure to make it Type safe Using Typescript 
- Add clear comments  
- Test your code  
- Output should be formatted  
- LLMs NOT allowed  
- Searching is allowed  

---

# 🎯 Task Requirements

## Part 1 — Callback Basics
Create a function `getWeather(city, callback)`:
- Uses setTimeout (2 seconds)
- If city exists : callback(null, temp)
- If missing : callback("City missing", null)

**Expected Output**
```
Fetching weather...
Weather in Cairo: 27°C
```

---

## Part 2 — Callback Hell Simulation
Create nested callbacks:
1. getUser  
2. getLocation  
3. getWeather  

**Expected Output**
```
Getting user...
Getting location...
Getting weather...
Final Result: Ahmed lives in Cairo | Temp: 27°C
```

---

## Part 3 — Convert Callback to Promise
Rewrite getWeather(city) using Promises:
- resolve(temp)
- reject(error)

**Output**
```
Promise resolved → Cairo: 27°C
```

---

## Part 4 — Async/Await
Async function showWeather():
- await weather
- try/catch

**Output**
```
Weather (Async): 27°C
```

---

## Part 5 — Promise Chaining
Create:
- getUser()
- getLocation(user)
- getWeather(city)

Chain them.

**Output**
```
User: Ahmed
Location: Cairo
Temp: 27°C
```

---

## Part 6 — Async Await Chain
Rewrite flow using async generateReport()

**Output**
```
User Ahmed | City: Cairo | Temperature: 27°C
```

---

## Part 7 — Bonus: Full Report
Function generateFullReport()

**Output**
```
╔════════════════════════════╗
║     WEATHER DATA REPORT    ║
╚════════════════════════════╝

User: AHMED
City: CAIRO
Temperature: 27°C

Status: Data fetched successfully ✔️
```

---

## 💡 Hints
- Use new Promise()
- async/await needs try/catch
- setTimeout to simulate delay
- Don’t mix callbacks with promises

---

## 🚀 Extra Challenge
- Validate inputs  
- Retry weather fetch  
- Use finally (need to search) 

