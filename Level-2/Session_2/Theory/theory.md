# NestJS Framework - Theory Session

## 📋 Session Objectives

By the end of this session, you will:

1. Understand why NestJS was created and the problems it solves
2. Grasp the difference between Node.js, Express, and NestJS
3. Master decorators as a core concept
4. Understand Separation of Concerns (Controllers, Services, Modules)
5. Learn Middleware and Guards for request processing

---

## 🗂️ Table of Contents

1. [What is NestJS & Why it Was Created](#1-What-is-NestJS-&-Why-it-Was-Created)
2. [Node.js vs Express vs NestJS](#2-nodejs-vs-express-vs-nestjs)
3. [NestJS Philosophy](#3-nestjs-philosophy)
4. [Understanding Decorators](#4-understanding-decorators)
5. [Separation of Concerns](#5-separation-of-concerns)
6. [Module System Architecture](#6-module-system-architecture)
7. [Middleware](#7-middleware)
8. [Guards](#8-guards)
9. [Pips](#9-Pips)
10. [Interceptors](#10-Interceptors)

---

## 1. The Evolution & Why NestJS

### The Node.js Framework Timeline

-   **2010: Express.js** → Minimalist, unopinionated, flexible
-   **2013: Koa.js** → Async/await focus
-   **2011: Hapi.js** → Configuration-centric
-   **2016: Fastify** → Performance-first
-   **2017: NestJS** → Enterprise, opinionated, TypeScript-first

### Express Problems at Scale

As projects grow, Express applications often face several challenges:

-   ❌ **No enforced structure** → Code becomes messy
-   ❌ **No standard patterns** → Every developer does it differently
-   ❌ **Manual dependency management** → Hard to test
-   ❌ **Mixing concerns** → Business logic in route handlers


### What is NestJS & Why it Was Created?
a progressive opinionated Node.js framework for building efficient, scalable, and reliable server-side applications using TypeScript or JavaScript

NestJS solves these problems by providing:

1. **Structure Chaos** → Enforced modular architecture
2. **Scalability Issues** → Built for large teams and projects
3. **Testing Overhead** → Built-in testing utilities
4. **Dependency Hell** → Automatic dependency injection
5. **Inconsistent Patterns** → Standardized approach

---

## 2. Node.js vs Express vs NestJS

### Understanding the Layers

-   **NestJS Application Code** (Top Layer)
-   **NestJS Framework**
-   **Express (or Fastify) Framework**
-   **Node.js Runtime**
-   **V8 JavaScript Engine** (Bottom Layer)

**Key Distinctions:**

-   **Node.js** = Runtime environment (like Java JVM)
-   **Express** = Minimalist web framework
-   **NestJS** = Opinionated framework built on Express/Fastify

### Quick Comparison

| Aspect             | Express        | NestJS               |
| ------------------ | -------------- | -------------------- |
| **Structure**      | None           | Enforced modules     |
| **Dependencies**   | Manual imports | Dependency Injection |
| **TypeScript**     | Optional       | First-class          |
| **Testing**        | Manual setup   | Built-in             |
| **Learning Curve** | Easy           | Steeper              |
| **Best For**       | Small apps     | Enterprise apps      |

---

## 3. NestJS Philosophy

### Core Principles

#### 1. TypeScript-First

NestJS is built with and for TypeScript, catching errors at compile-time rather than runtime.

#### 2. Dependency Injection

The framework manages dependencies for you, making code cleaner and easier to test.

#### 3. Modularity

Code is organized into feature modules (e.g., Users, Products), keeping related code together.

#### 4. Platform Agnostic

NestJS can run on top of Express (default) or Fastify, allowing you to switch underlying frameworks easily.

### Architectural Inspirations

-   **Angular** → Module system, DI, decorators
-   **Spring (Java)** → Enterprise patterns, annotations
-   **ASP.NET Core** → Middleware pipeline, service registration

---

## 4. Understanding Decorators

### What Are Decorators?

**Definition:** Functions that attach metadata to classes, methods, or parameters. They are the "magic" that makes NestJS work.

**Think of them as:** Labels or tags that give special meaning to code.

### Types of Decorators

1.  **Class Decorators**: Mark a class as a Controller, Service, or Module.
2.  **Method Decorators**: Define HTTP methods (Get, Post) for functions.
3.  **Parameter Decorators**: Extract data from the request (Body, Param, Query).


### Why Decorators Matter

-   Route definitions live with handlers
-   Type-safe parameters
-   Self-documenting
-   Framework can analyze structure

---

## 5. Separation of Concerns
Separation of Concerns is a software design principle that says:
“Each part of your application should have a single, well-defined responsibility.”
Instead of mixing everything together, you split your code into layers, so each layer only does one thing.
This makes your code: Clean, Maintainable, Testable, and  Scalable .
### The Three core Layers

1.  **Controllers**: HTTP concerns only. Handle requests and send responses(calls the service).
2.  **Services/Providers**: Business logic. Where the actual work happens.
3.  **Data Access**: Database operations.

### Controllers: HTTP Layer

**Responsibility:** Handle HTTP requests and responses ONLY.
**Should NOT:** Contain business logic, make database queries, or perform calculations.


### Services: Business Logic Layer

**Responsibility:** Implement business rules and logic.
**The @Injectable() Decorator:** Marks a class as managed by the NestJS container.


---

## 6. Module System Architecture

### What Are Modules?

**Definition:** Groups related components (controllers, services) into cohesive blocks. Every NestJS application has at least one module called the root module (contains all other modules).

### Module Relationships

-   **Feature Modules**: Encapsulate specific features (e.g., UserModule).
-   **Shared Modules**: Share services (like DatabaseService) across the application.
-   **Global Modules**: Available everywhere without importing (e.g., LoggerModule).


---

## 7. Middleware

### What is Middleware?

**Definition:** Functions that execute **before** the route handler. They sit between the request and the controller.

**Common Uses:**

-   Logging
-   Parsing request bodies
-   Authentication (basic)

### Types in NestJS

1.  **Functional Middleware**: Simple functions.
2.  **Class-based Middleware**: Classes that can inject dependencies.

---

## 8. Guards

### What Are Guards?

**Definition:** Determine if a request should proceed based on conditions (auth, roles, etc.).

**Key Difference from Middleware:**

-   Guards run **after** middleware
-   Have access to **execution context** (knows what handler will be called)
-   Specifically for **authorization** decisions

### Common Guards

-   **AuthGuard**: Checks if a user is logged in.
-   **RolesGuard**: Checks if a user has the required permission.

## 9.Pips

### What are Pips?

Its job is to process incoming data before it reaches the controller.

**Key points:**

 **validate**, transform, or sanitize request data.
Keeps controllers clean, because all input processing is handled here.

## 10. Interceptors

**What are Interceptors?**

An Interceptor is a class that wraps around a controller method. Can run before and after the controller executes.

**Key points:**

Can log requests, measure execution time, cache responses, or transform output.
Can inject other services/providers using DI.



### Execution Order

Request → Middleware → Guards → Interceptors (Before) → Pipes → Controller → Interceptors (After) → Service → response

---

## 📊 Quick Reference

### When to Use What

| Use Case              | Tool        |
| --------------------- | ----------- |
| Logging requests      | Middleware  |
| Parsing body          | Middleware  |
| Authentication        | Guard       |
| Authorization (roles) | Guard       |
| Validation            | Pipe        |
| Transform response    | Interceptor |

---

## 🎯 Key Takeaways

1. **NestJS** = Express + Structure + TypeScript + Enterprise Patterns
2. **Decorators** = Metadata for framework magic
3. **Controllers** = HTTP only, delegate to services
4. **Services** = Business logic, no HTTP knowledge
5. **Modules** = Organize features, manage dependencies
6. **Middleware** = Pre-process requests (logging, parsing)
7. **Guards** = Authorization decisions (auth, roles)

---

## 🚀 What's Next?

**Practical Implementation:**

-   Setting up NestJS project
-   Creating modules, controllers, services