# 🚀 How To Get Started

> Your complete guide to begin your backend development journey

Welcome to the Backend Learning Hub! This guide will walk you through everything you need to know to get started.

---

## 📋 Table of Contents

1. [Prerequisites](#-prerequisites)
2. [Initial Setup](#-initial-setup)
3. [Forking the Repository](#-forking-the-repository)
4. [Understanding the Structure](#-understanding-the-structure)
5. [How to Study Each Session](#-how-to-study-each-session)
6. [Working with Tasks](#-working-with-tasks)
7. [Submitting Your Work](#-submitting-your-work)
8. [Getting Help](#-getting-help)

---

## ✅ Prerequisites

Before you begin, make sure you have:

### Required Software
- **Git** - [Download here](https://git-scm.com/)
- **Code Editor** - [VS Code](https://code.visualstudio.com/) (recommended)
- **Terminal/Command Line** - Built into your OS

### Required Knowledge
- Basic computer literacy
- Willingness to learn and practice
- Patience and persistence 💪

### Verify Installation

Open your terminal and run:

```bash
# Check Git
git --version
# Should show: git version 2.x.x or higher
```

If any command doesn't work, install it.

---

## 🔧 Initial Setup

### 1. Configure Git

```bash
# Set your name
git config --global user.name "Your Name"

# Set your email
git config --global user.email "your.email@example.com"

# Verify configuration
git config --list
```

### 2. Set Up VS Code (Recommended Extensions)

Install these extensions in VS Code:
1. **ESLint** - Code quality
2. **Prettier** - Code formatting
3. **JavaScript (ES6) code snippets** - Quick code snippets
4. **Path Intellisense** - Auto-complete file paths
5. **GitLens** - Git integration

**To install:**
- Open VS Code
- Press `Ctrl+Shift+X` (Windows/Linux) or `Cmd+Shift+X` (Mac)
- Search for each extension and click "Install"

---

## 🍴 Forking the Repository

### What is Forking?

Forking creates your own copy of this repository where you can work independently and save your solutions.

### Step-by-Step: Fork the Repository

**1. Go to the repository on GitHub:**
```
https://github.com/OSC-Backend-Committee/backend-learning-hub-26
```

**2. Click the "Fork" button (top right corner)**

**3. Wait for GitHub to create your fork**
- You'll be redirected to your forked repository
- The URL will be: [https://github.com/Open-Source-Community/backend-learning-hub-26.git](https://github.com/Open-Source-Community/backend-learning-hub-26.git)

**4. Clone your forked repository to your computer:**

```bash
# Navigate to where you want to store the project
cd ~/Documents  # or wherever you prefer

# Clone YOUR fork (replace YOUR-USERNAME)
git clone https://github.com/YOUR-USERNAME/backend-learning-hub-26.git

# Navigate into the folder
cd backend-learning-hub-26

# Verify it worked
ls  # You should see the repository folders
```

### Keep Your Fork Updated 

To get the latest content from the original repository:

```bash
# Add the original repo as "upstream"
git remote add upstream https://github.com/OSC-Backend-Committee/backend-learning-hub-26.git

# Fetch latest changes
git fetch upstream

# Merge changes into your fork
git merge upstream/main

# Push updates to your fork
git push origin main
```

**Do this weekly** to get new sessions and updates!

### or you can just click sync in Your Forked Repo in Github

---

## 📚 Understanding the Structure

### Repository Layout

```
backend-learning-hub-26/
│
├── Welcome/                    ← START HERE!
│   ├── Session_0/             
│   └── How_To_Get_Started.md  ← You are here
│
├── Level-1/                    ← Begin your learning journey
│   ├── Session-1/
│   │   ├── Theory/            ← Read first
│   │   ├── Tech/              ← Setup tools
│   │   └── Code/              ← Practice coding
│   ├── Session-2/
│   └── ...
│
├── Level-2/                    ← Advanced topics
│   ├── Session-1/
│   └── ...
│
└── More/                       ← Extra materials
    ├── Assets/
    ├── Best_Practices/
    ├── Challenges/
    ├── Problem_Solving/
    └── extra_resources/
```

### What Each Folder Contains

**📁 Theory/**
- Concept explanations
- Why topics matter
- Real-world applications
- Best practices

**📁 Tech/**
- Required tools
- Installation guides
- Configuration steps
- Setup verifications
- Practical examples
- Hands-on exercises

**📁 Code/**
- Cumulative project
- Solution templates

---

## 📖 How to Study Each Session

Follow this proven learning path for every session:

### Step 1: Read the Theory 📚

```bash
cd Level-1/Session-1/Theory
```

- **Open all theory files**
- **Read carefully** - Don't rush!
- **Take notes** - Write down key concepts
- **Ask questions** - Note anything unclear


### Step 2: Setup Required Tech 🛠️

```bash
cd ../Tech
```

- **Follow installation guides**
- **Install required tools**
- **Configure settings**
- **Verify everything works**

### Step 3: Study Code Examples 💻

- **Read code examples thoroughly**
- **Type code yourself** (don't copy-paste!)
- **Run each example**
- **Experiment with modifications**
- **Understand every line**


### Step 4: Complete Exercises ✏️

- **Attempt all exercises**
- **Don't look at solutions immediately**
- **Struggle is part of learning!**
- **Ask for help when truly stuck**

### Step 5: Build the Project 🏗️

Each session has a cumulative project:
- **Follow project requirements**
- **Apply what you learned**
- **Test your code**
- **Commit your work**

---

## 📝 Working with Tasks and HandsOn

**1. fill in the files:**
- open any HandsOn file in the session and start filling it with your answers
- do the same with Tasks if the Task is just a requirment file or with extension (.md) then create your own Task.js file and solve the Task in it

**2. Compare with provided solutions:**
- Only after completing your attempt
- Learn from different approaches
- Understand why solutions work

### Working on Projects

* to be announced soon

---

## 📤 Submitting Your Work

### Committing Your Solutions

**1. Check what changed:**
```bash
git status
```

**2. Add your changes:**
```bash
# Add specific files
git add session-1/HandsOn

# Or add everything
git add .
```

**3. Commit with a meaningful message:**
```bash
git commit -m "Complete Session 1: JavaScript & TypeScript basics"

- Completed all theory readings
- Finished 8/8 exercises
- Built calculator project
- Added personal notes"
```

**4. Push to your fork:**
```bash
git push origin main
```

### Sharing Your Work 

**Want feedback from instructors?**

* **Create an issue on the original repo:**
   - Go to: [https://github.com/Open-Source-Community/backend-learning-hub-26.git](https://github.com/Open-Source-Community/backend-learning-hub-26.git)
   - Click "New Issue"
   - Title: "Session [X] Submission - [Your Name]"
   - Include:
     - Link to your fork
     - Specific questions
     - What you found challenging
     - What you learned
* **Don't Forget to make the Repo Private From the Settings Then Invite The Istructors**

---

## 🎯 Best Practices

### DO ✅

- **Read theory before coding**
- **Type code manually** (no copy-paste)
- **Test your code frequently**
- **Take breaks** when frustrated
- **Ask questions** when stuck
- **Review solutions** after attempting
- **Track your progress**
- **Celebrate small wins!**

### DON'T ❌

- **Skip theory sections**
- **Copy-paste code without understanding**
- **Rush through material**
- **Compare your pace to others**
- **Give up when exercises are hard**
- **Skip testing your code**
- **Procrastinate on projects**

---

## 🆘 Getting Help

### When You're Stuck

**1. Use the debugging process:**
```
- Read the error message carefully
- Google the specific error
- Check documentation
- Review similar examples
- Ask for help (see below)
```

**2. Where to get help:**
- **Discord Server** 
- **GitHub Issues** 
- **offline Session** 

**3. How to ask good questions:**
```markdown
**What I'm trying to do:**
[Describe the goal]

**What I've tried:**
[Show your code and attempts]

**The error I'm getting:**
[Copy the exact error message]

**What I think the problem is:**
[Your analysis]
```

### Common Issues

**Issue:** Code doesn't run
**Solution:** 
- Check syntax errors
- Verify file path
- Check Node.js installation

**Issue:** Git commands not working
**Solution:**
- Verify you're in the right directory
- Check Git is installed
- Review git configuration

**Issue:** Package installation fails
**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

---

## 📊 Tracking Your Progress

### Create a Progress Tracker

Create `my-progress.md` in your fork:

```markdown
# My Backend Learning Progress

**Start Date:** [Date]
**Target Completion:** [Date]

## Level 1

- [x] Session 1: JavaScript & TypeScript Basics
  - Date Completed: [Date]
  - Time Spent: [Hours]
  - Difficulty: ⭐⭐⭐ (Medium)
  - Notes: [Your thoughts]
  
- [ ] Session 2: More TypeScript
  - Date Started: [Date]
  - Currently: Theory section
  
- [ ] Session 3: Advanced TypeScript
- [ ] Session 4: Networking + Node.js
...

## Level 2
- [ ] Session 1-4: NestJS
...

## Achievements 🏆
- Completed first session! 🎉
- Built first Node.js project
...

## Challenges Faced
- Understanding closures (solved with extra practice)
- Setting up TypeScript (resolved with documentation)
...

## Next Steps
- Complete Session 2 this week
- Review Session 1 concepts
- Start planning Session 2 project
```

---

## 🎉 Your Learning Journey Starts Now!

### Quick Start Checklist

Before moving to Session 1:

- [ ] All software installed (Git, VS Code)
- [ ] Repository forked and cloned
- [ ] Git configured with your details
- [ ] VS Code extensions installed
- [ ] Read this entire guide
- [ ] Ready to learn! 💪

### Next Steps

1. **Navigate to Welcome/Session_0/**
   - Read the introduction materials
   - Understand the curriculum structure

2. **Start Level 1, Session 1:**
   ```bash
   cd Level-1/Session-1/Theory
   ```

3. **Follow the study method above**

4. **Join the community:**
   - Discord

---

## 💡 Final Tips

**Remember:**
- Learning takes time - be patient with yourself
- Struggling is normal - it means you're learning
- Practice consistently - even 1 hour daily helps
- Ask questions - no question is too small
- Help others - teaching reinforces learning
- Have fun! - You're building amazing skills 🚀

---

## 📞 Contact & Support

**Questions about this guide?**
- Email: omniiaibrahim2@gamil.com

**Technical problems?**
- Check troubleshooting section above
- Search existing GitHub issues
- Create new issue with details

---

<div align="center">

**Ready to become a backend developer?**

**Let's do this! 🚀**

[← Back to Main README](../../README.md) | [Start Session 1 →](../../Level-1/Session_1)

</div>

---

**Last Updated:** [18/11/2025]
**Version:** 1.0
