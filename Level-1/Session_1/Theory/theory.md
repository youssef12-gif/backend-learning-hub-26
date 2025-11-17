# Backend Session 1 - Theory

## 📋 Session Objectives

By the end of this session, you will be able to:

1. Understand what "backend" means and how it fits in a full-stack system
2. Describe the role of a backend engineer
3. Set up development environment (Node.js + JavaScript)
4. Write and run basic JavaScript code
5. Understand variables, data types, and simple logic in JavaScript

---

## 📜 Committee Rules

### Punishment System
- **Lateness**: 15 mins late is acceptable. After 15 mins, every minute = 1 pound (max 20 pounds)
- **Absence without excuse**: 2 warnings
- **Missing task without excuse**: 1 warning
- **Unacceptable behavior**: 1 warning

### Rewarding System
- Any correct answer in the session = Mohsens
- Best member of the week will be awarded next session
- Best of the month will be awarded 1/12 based on mohsens
- Best of the season will be awarded at the end based on mohsens and overall performance

---

## 🗂️ Resources Tour

Make sure you have access to:
- **WhatsApp Groups** - Communication and announcements
- **GitHub** - Code repositories and assignments
- **Discord** - Live discussions and Q&A
- **Google Sheet** - Tracking and schedules
- **Forms** - Attendance, Feedback, and Excuses

---

## 🎯 What is Backend?

### Definition
The backend is the **logic, data, and communication layer** of any application. It handles:
- Receiving requests
- Processing business logic
- Interacting with databases
- Sending responses

### Backend vs Frontend
- **Frontend**: What the user sees (UI/UX)
- **Backend**: What makes it work (logic, data, APIs)

### Responsibilities
The core workflow: **Receive → Process → Store → Respond**

### Client-Server Communication
1. **Client** sends a request
2. **Server** processes it
3. **Server** sends a response

### Other Communication Types
- Server-to-server communication
- Asynchronous messaging patterns
- Real-time communication

---

## 🧠 Backend Engineer Mindset

### How Backend Engineers Think
- **Logic-oriented and detail-driven**
- Understand data flow & system behavior
- Predict edge cases & failure points
- Debug-first mindset

### Core Responsibilities
- API design
- Database structure
- Security
- Performance optimization

### Required Attitude
- **Patient** → **Analytical** → **Problem solver**
- Ability to work with ambiguity
- Attention to detail

---

## 🛠️ Backend Languages & Tools

### Common Backend Languages

| Language | Description |
|----------|-------------|
| **JavaScript/Node.js** | Allows using JavaScript on both frontend and backend. Non-blocking I/O makes it efficient for real-time applications. Huge npm ecosystem. |
| **Python** | Used for its simplicity and vast ecosystem. Django, Flask frameworks. |
| **Java** | Spring Boot framework is widely used. Excellent for large-scale, mission-critical systems. |
| **C#/.NET** | Microsoft's ecosystem with strong tooling. Cross-platform with .NET Core. |
| **Go (Golang)** | Built by Google for high performance and concurrency. Fast compilation and execution. |
| **PHP** | Powers much of the web (WordPress, Laravel). Easy to deploy and host. |
| **Ruby** | Known for Ruby on Rails framework. Developer-friendly with "convention over configuration". |

---

## 📚 Important Terms

### Language
**What it is**: The syntax and rules for writing code. The vocabulary and grammar.

**Examples**: JavaScript, C++, TypeScript, Python

**Think of it as**: The actual words and grammar rules - like English, Spanish, French.

```javascript
// JavaScript language syntax:
let name = "John";
if (name === "John")
  console.log("Hello");
```

**Key point**: A language is just the rules for writing code. It doesn't DO anything by itself - it needs something to run it.

---

### Runtime Environment
**What it is**: Everything your code needs to actually RUN. The "stage" where your code performs.

**Components**:
- Engine/Interpreter (executes your code)
- Built-in APIs (tools your code can use)
- Memory management
- Event loop (for async operations)

**Examples**:
- **Browser** (Chrome, Firefox) - runtime for JavaScript on web pages
- **Node.js** - runtime for JavaScript on servers/computers
- **Python Interpreter** - runtime for Python code
- **JVM** (Java Virtual Machine) - runtime for Java code

**Think of it as**: A theater with a stage, props, lighting - everything needed for a performance.

```javascript
// In BROWSER runtime:
document.getElementById('btn'); // Works - browser provides 'document'
fs.readFile('file.txt'); // Doesn't exist in browser

// In NODE.JS runtime:
fs.readFile('file.txt'); // Works - Node provides 'fs'
document.getElementById('btn'); // Doesn't exist in Node
```

**Key point**: Same language (JavaScript), different runtimes = different capabilities.

---

### Framework
**What it is**: Pre-written code that provides structure and tools for building applications. It makes decisions for you about architecture.

**Characteristics**:
- **Opinionated** - tells you how to organize code
- **Inversion of Control** - YOU call libraries, FRAMEWORK calls your code
- Provides structure, patterns, and best practices

**Examples**:
- **React** - framework for building UIs
- **Angular** - complete framework for web apps
- **NestJS** - framework for Node.js backend
- **Django** - framework for Python web apps
- **Spring** - framework for Java apps

**Think of it as**: A pre-built house frame. Walls, roof structure already there - you just add finishing touches.

**Key point**: Framework = someone built structure for you, you fill in the details.

---

### Ecosystem
**What it is**: The entire interconnected world of tools, resources, people, and infrastructure that grows around a language or platform.

**Think of it like a city**:
- Language = the main language spoken
- But a city needs: roads, stores, hospitals, schools, communities, laws, services
- All of these working together = the ecosystem

**How Ecosystem Affects You**:

**Strong Ecosystem (JavaScript, Python)**:
- Problem? Someone already solved it - use a package
- Stuck? Tons of Stack Overflow answers
- Learning? Thousands of free tutorials
- Jobs? Lots of opportunities
- Deployment? Easy platforms available

---

## 🚀 JavaScript Deep Dive

### What is JavaScript?
- A **high-level, interpreted programming language**
- Primarily known for enabling **interactive and dynamic content** on web pages
- One of the **three core technologies** of the World Wide Web:
  - **HTML** - structures content
  - **CSS** - styles content
  - **JavaScript** - adds interactivity

---

### Runtime Environments for JavaScript

#### 1. Browser
**What is a Browser?**
- A browser is an application/software installed on your computer (Chrome, Firefox, Safari, Edge)

**How JavaScript Runs in the Browser**:

**The JavaScript Engine** - Inside every browser, there's a JavaScript engine that reads and executes JavaScript code:
- Chrome/Edge → **V8 engine**
- Firefox → **SpiderMonkey**
- Safari → **JavaScriptCore**

Think of the engine like a **translator** that converts your JavaScript code into machine code.

**The Process**:
```
Your JS code → JS Engine reads it → Converts to machine code → CPU executes it
```

**When you visit a website**:
1. Browser downloads HTML, CSS, and JavaScript files
2. Browser reads the HTML and builds the page
3. When it encounters `<script>` tags, the JS engine executes that code
4. JavaScript can manipulate the page (change colors, respond to clicks, etc.)

**What Actually Happens When You Visit a Website**:

Step by step:
1. You type: `www.facebook.com`
2. Server sends you files:
   - `index.html` (plain text HTML)
   - `styles.css` (plain text CSS)
   - `app.js` (plain text JavaScript)
3. Your browser receives JavaScript as **TEXT**
4. The engine converts it to machine code **RIGHT NOW**, on your computer
5. Then it runs

**Why doesn't the server send machine code?**
- Different computers have different architectures
- The browser's JS engine handles the conversion for your specific machine

---

#### 2. Node.js
- **Node.js is JavaScript running OUTSIDE the browser**
- It's a different runtime environment

**Key Difference**:
- **Browser runtime** = JS Engine + Web APIs (for web pages)
- **Node.js runtime** = JS Engine (V8) + Node APIs (for servers/computers)

---

## 🎓 Next Steps

This theory session laid the foundation for understanding backend development. The practical work begins now!

**Get ready to**:
- Set up your Node.js environment
- Write your first JavaScript code
- Build basic backend logic
- Work with variables, data types, and control flow

---

## 📝 Important Notes

- Review these concepts before the next session
- Complete any assigned tasks on time
- Use the Discord and WhatsApp groups for questions
- Check GitHub regularly for code examples and assignments

---

**Remember**: Backend engineering is about being patient, analytical, and solution-oriented. Keep practicing, stay curious, and don't hesitate to ask questions!

---

*Session completed successfully! Ready for practical implementation.*