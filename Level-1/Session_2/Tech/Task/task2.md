# TypeScript Fundamentals - Simple Library Task 📚

## 📋 Overview
Build a **simplified Library System** to practice basic TypeScript concepts: variables, interfaces, loops, conditions, and utility types.

---

## 📝 Task Requirements

### Part 1: Variables & Basic Types
1. Declare basic variables with types then print its values and dataType:
```typescript
 totalBooks (number) 
 libraryName(string) 
 isOpen (boolean)
 lateFeePerDay (number) e.g 2.5
 maxBooksPerPerson(number) e.g 20
 currentDate (string) e.g "2025-11-25"
```

2. Create a `Book` interface with variables:
```typescript
    id(number)
    title (string)
    author (string)
    publishYear (number)
    add your own dataTye `status` with values "available" | "borrowed" | "reserved"
    pages (number)
```

3. Create a `Magazine` interface that extends Book:
```typescript
    issueNumber (number)
    monthlySubscription (boolean)

```

4. Create sample book and magazine objects and update totalBooks then print them
e.g. increment it's value by 2:

---

### Part 2: Loops & If Conditions
1.declare array of type interface `Book` Print all books using a `for` loop and `if` condition (book is avaliable):


2. Calculate total pages of all books using a `for` loop:
---

### Part 3: Utility Types

#### 1.What is Utility Types?

#### 2.You have an existing book in the library but want to update only some of its properties (e.g., pages or status).


#### 3.Sometimes you only need specific information about the book (e.g., title and author) to display in the library.


#### 4. Sometimes you want to share book information without revealing certain properties like pages or publish year.


#### 5. You have an important book, and you don’t want its data to change after adding it to the library.
##### Practical Question:
##### Make all properties of the book readonly, then try to change the title. What happens?

#### 6. You have a partial book object (some fields are missing), and you want to ensure all properties exist before adding it to the library.
---

### Part 4: Optional Extra
- Use `if` and loops to find a book by id:

## ⏰ Estimated Time
**1-2 hours** for this simplified implementation

