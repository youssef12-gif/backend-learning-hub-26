# Session 4: HTTP from Scratch - Building Your First Server

## 📋 Session Agenda

**Part 1: HTTP Protocol Fundamentals**

1. Request/Response Cycle
2. HTTP Methods (GET, POST, PUT, DELETE)
3. Headers and Their Purpose
4. Status Codes
5. URL Structure Breakdown

**Part 2: Building HTTP Server with Node's http Module**

1. Creating a Basic Server
2. Handling Different Routes Manually
3. Parsing Request Data
4. Setting Response Headers
5. Sending Different Content Types

**Part 3: Request Handling Patterns**

1. Routing Logic
2. Method Checking
3. Query Parameters Parsing
4. Request Body Parsing

**Part 4: Building a Simple REST API**

1. In-Memory Data Store
2. CRUD Operations Implementation
3. JSON Responses
4. Error Handling

**Part 5: Testing Your API**

1. Using Thunder Client / Postman
2. Testing Different Endpoints
3. Verifying Responses

---

## 📚 Session Objectives

By the end of this session, you will be able to:

1. Understand how HTTP protocol works
2. Explain the request/response cycle
3. Build an HTTP server using only Node.js (no frameworks)
4. Handle different HTTP methods and routes
5. Parse request data (URL, query params, body)
6. Build a complete REST API from scratch

---

## 🎯 Why This Session Matters

### Understanding Before Using Frameworks

Most tutorials start with Express.js, but you need to understand:

- ❓ What happens when you visit a URL?
- ❓ How do servers receive requests?
- ❓ How do servers send responses?
- ❓ What is Express.js actually doing for you?

**The Goal:** Build foundation knowledge so frameworks make sense later!

---

# Part 1: HTTP Protocol Fundamentals

## 1️⃣ Request/Response Cycle

### What Happens When You Visit a Website?

**Example:** You type `https://api.example.com/users/123` in your browser.

```
1. Browser              →  DNS Server
   "Where is api.example.com?"

2. DNS Server          →  Browser
   "It's at 192.168.1.100"

3. Browser             →  Server (192.168.1.100)
   HTTP Request:
   GET /users/123 HTTP/1.1
   Host: api.example.com

4. Server              →  Browser
   HTTP Response:
   HTTP/1.1 200 OK
   Content-Type: application/json

   {"id": 123, "name": "Mohsen"}
```

---

### The HTTP Request Structure

Every HTTP request has three main parts:

```
GET /users/123?active=true HTTP/1.1        ← Request Line
Host: api.example.com                       ← Headers
Content-Type: application/json
Authorization: Bearer token123
                                            ← Blank Line
{"data": "request body"}                    ← Body (optional)
```

**1. Request Line:**

- Method (GET, POST, etc.)
- Path (/users/123)
- Query string (?active=true)
- HTTP version (HTTP/1.1)

**2. Headers:**

- Key-value pairs with metadata
- Tell server about the request
- Examples: Content-Type, Authorization

**3. Body:**

- Optional (only for POST, PUT, PATCH)
- Contains data being sent
- Format specified in Content-Type header

---

### The HTTP Response Structure

```
HTTP/1.1 200 OK                             ← Status Line
Content-Type: application/json              ← Headers
Content-Length: 45
Date: Mon, 29 Nov 2025 10:00:00 GMT
                                            ← Blank Line
{"id": 123, "name": "Mohsen"}              ← Body
```

**1. Status Line:**

- HTTP version
- Status code (200, 404, 500)
- Status text (OK, Not Found, etc.)

**2. Headers:**

- Metadata about the response
- Content type, length, date, etc.

**3. Body:**

- The actual response data
- Could be HTML, JSON, XML, etc.

---

## 2️⃣ HTTP Methods

HTTP methods (verbs) indicate the desired action.

### GET - Retrieve Data

**Purpose:** Read/retrieve data from server

```http
GET /users HTTP/1.1
Host: api.example.com
```

**Characteristics:**

- ✅ Safe (doesn't change server state)
- ✅ Idempotent (same result every time)
- ✅ Can be cached
- ✅ Data in URL (query params)
- ❌ No request body

**Use Cases:**

- Fetching list of items
- Getting single item details
- Search queries
- Loading web pages

---

### POST - Create New Resource

**Purpose:** Create new data on server

```http
POST /users HTTP/1.1
Host: api.example.com
Content-Type: application/json

{
  "name": "Mohsen",
  "email": "mohsen@example.com"
}
```

**Characteristics:**

- ❌ Not safe (changes server state)
- ❌ Not idempotent (creates new resource each time)
- ✅ Has request body
- ✅ Data in body (not URL)

**Use Cases:**

- Creating new user
- Submitting forms
- Uploading files
- Placing orders

---

### PUT - Update/Replace Resource

**Purpose:** Update entire resource

```http
PUT /users/123 HTTP/1.1
Host: api.example.com
Content-Type: application/json

{
  "name": "Mohsen Updated",
  "email": "new@example.com"
}
```

**Characteristics:**

- ❌ Not safe (changes server state)
- ✅ Idempotent (same result every time)
- ✅ Has request body
- ✅ Replaces entire resource

**Use Cases:**

- Updating user profile
- Replacing document
- Overwriting settings

---

### PATCH - Partial Update

**Purpose:** Update part of resource

```http
PATCH /users/123 HTTP/1.1
Host: api.example.com
Content-Type: application/json

{
  "email": "new@example.com"
}
```

**Characteristics:**

- ❌ Not safe
- ⚠️ May or may not be idempotent
- ✅ Has request body
- ✅ Updates only specified fields

**Use Cases:**

- Updating single field
- Partial modifications
- Efficient updates

---

### DELETE - Remove Resource

**Purpose:** Delete resource from server

```http
DELETE /users/123 HTTP/1.1
Host: api.example.com
```

**Characteristics:**

- ❌ Not safe (changes server state)
- ✅ Idempotent (deleting same thing multiple times = same result)
- ❌ Usually no request body
- ✅ May return deleted resource in response

**Use Cases:**

- Deleting user account
- Removing item from cart
- Canceling subscription

---

### Method Comparison Table

| Method     | Purpose  | Safe?  | Idempotent? | Has Body?     |
| ---------- | -------- | ------ | ----------- | ------------- |
| **GET**    | Retrieve | ✅ Yes | ✅ Yes      | ❌ No         |
| **POST**   | Create   | ❌ No  | ❌ No       | ✅ Yes        |
| **PUT**    | Replace  | ❌ No  | ✅ Yes      | ✅ Yes        |
| **PATCH**  | Update   | ❌ No  | ⚠️ Maybe    | ✅ Yes        |
| **DELETE** | Remove   | ❌ No  | ✅ Yes      | ❌ Usually No |

**Idempotent:** Making the same request multiple times has the same effect as making it once.

---

## 3️⃣ HTTP Headers

Headers provide metadata about the request or response.

### Common Request Headers

```typescript
// Content-Type: Format of the body
"Content-Type: application/json";
"Content-Type: application/x-www-form-urlencoded";
"Content-Type: multipart/form-data";

// Authorization: Authentication credentials
"Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...";
"Authorization: Basic dXNlcm5hbWU6cGFzc3dvcmQ=";

// Accept: What formats client can handle
"Accept: application/json";
"Accept: text/html";
"Accept: */*";

// User-Agent: Information about client
"User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)...";

// Host: Target server
"Host: api.example.com";

// Content-Length: Size of body in bytes
"Content-Length: 1234";
```

---

### Common Response Headers

```typescript
// Content-Type: Format of response body
"Content-Type: application/json; charset=utf-8";

// Content-Length: Size of response body
"Content-Length: 456";

// Date: When response was sent
"Date: Mon, 29 Nov 2025 10:00:00 GMT";

// Server: Server software info
"Server: Node.js";

// Cache-Control: Caching instructions
"Cache-Control: no-cache";
"Cache-Control: max-age=3600";

// Set-Cookie: Set cookies on client
"Set-Cookie: sessionId=abc123; HttpOnly; Secure";

// Location: Redirect target
"Location: https://example.com/new-url";

// Access-Control-Allow-Origin: CORS
"Access-Control-Allow-Origin: *";
"Access-Control-Allow-Origin: https://example.com";
```

---

### Why Headers Matter

**Example: Content-Type Header**

```typescript
// Without Content-Type, browser doesn't know what this is:
{"name": "Mohsen"}

// With Content-Type: application/json, browser knows to parse as JSON
// With Content-Type: text/plain, browser shows raw text
// With Content-Type: text/html, browser renders as webpage
```

**Example: Authorization Header**

```typescript
// Server checks this header to authenticate user
"Authorization: Bearer token123";

// If valid → Allow access
// If invalid → 401 Unauthorized
// If missing → 403 Forbidden
```

---

## 4️⃣ HTTP Status Codes

Status codes tell the client what happened with their request.

### Status Code Categories

```
1xx - Informational  (Request received, continuing)
2xx - Success        (Request successful)
3xx - Redirection    (Further action needed)
4xx - Client Error   (Bad request from client)
5xx - Server Error   (Server failed to fulfill valid request)
```

---

### Common Status Codes

#### 2xx - Success

```typescript
200 OK               // Request succeeded
201 Created          // New resource created (POST)
204 No Content       // Success, but no body to return

// Example:
GET /users/123
Response: 200 OK
Body: {"id": 123, "name": "Mohsen"}

POST /users
Response: 201 Created
Body: {"id": 456, "name": "New User"}

DELETE /users/123
Response: 204 No Content
Body: (empty)
```

---

#### 3xx - Redirection

```typescript
301 Moved Permanently    // Resource permanently moved
302 Found                // Temporary redirect
304 Not Modified         // Use cached version

// Example:
GET /old-page
Response: 301 Moved Permanently
Location: /new-page
```

---

#### 4xx - Client Errors

```typescript
400 Bad Request          // Invalid syntax/data
401 Unauthorized         // Authentication required
403 Forbidden            // Authenticated but not allowed
404 Not Found            // Resource doesn't exist
405 Method Not Allowed   // Wrong HTTP method
409 Conflict             // Conflict with current state
422 Unprocessable Entity // Validation failed

// Examples:
GET /users/999
Response: 404 Not Found
Body: {"error": "User not found"}

POST /users
Body: {"name": ""}
Response: 400 Bad Request
Body: {"error": "Name is required"}

GET /admin/users
Response: 401 Unauthorized
Body: {"error": "Authentication required"}
```

---

#### 5xx - Server Errors

```typescript
500 Internal Server Error  // Generic server error
502 Bad Gateway           // Invalid response from upstream
503 Service Unavailable   // Server overloaded/down
504 Gateway Timeout       // Upstream server timeout

// Example:
GET /users
Response: 500 Internal Server Error
Body: {"error": "Database connection failed"}
```

---

### Status Code Selection Guide

```typescript
// Successfully retrieved data
return 200 OK

// Successfully created resource
return 201 Created

// Successfully deleted (no content to return)
return 204 No Content

// Client sent invalid data
return 400 Bad Request

// Client needs to authenticate
return 401 Unauthorized

// Client authenticated but not authorized
return 403 Forbidden

// Resource not found
return 404 Not Found

// Something broke on server
return 500 Internal Server Error
```

---

## 5️⃣ URL Structure

Understanding every part of a URL is crucial for backend development.

### Complete URL Breakdown

```
https://api.example.com:3000/users/123?active=true&sort=name#profile
└──┬─┘ └──────┬────────┘ └┬─┘ └────┬───┘ └────────┬────────┘ └──┬──┘
 Protocol   Domain      Port   Path        Query String        Hash
```

---

### URL Components Explained

#### 1. Protocol (Scheme)

```typescript
http://   - Unencrypted HTTP
https://  - Encrypted HTTP (SSL/TLS)
ws://     - WebSocket
wss://    - Secure WebSocket
```

**Always use HTTPS in production!**

---

#### 2. Domain (Host)

```typescript
api.example.com    - Subdomain + domain
localhost          - Your local machine
192.168.1.100      - IP address
```

---

#### 3. Port (Optional)

```typescript
:80    - Default HTTP port (omitted in URLs)
:443   - Default HTTPS port (omitted in URLs)
:3000  - Common development port
:5432  - PostgreSQL default port
```

---

#### 4. Path

```typescript
/users              - Collection endpoint
/users/123          - Specific resource
/users/123/posts    - Nested resource
/api/v1/users       - Versioned API path
```

**Path Parameters:**

```typescript
/users/:id          - Dynamic segment
/posts/:postId/comments/:commentId
```

---

#### 5. Query String

```typescript
?key=value                    - Single parameter
?key1=value1&key2=value2     - Multiple parameters
?search=node&limit=10        - Search with limit

// Common query patterns:
?page=2&limit=20             - Pagination
?sort=name&order=asc         - Sorting
?filter=active               - Filtering
?search=mohsen               - Searching
```

**Encoding Special Characters:**

```typescript
?name=Mohsen Ahmed    - Invalid (space)
?name=Mohsen%20Ahmed  - Valid (encoded space)
```

---

#### 6. Hash (Fragment)

```typescript
#section      - Jump to page section
#profile      - Navigate to tab
#comment-123  - Scroll to element
```

**Important:** Hash is NOT sent to server! It's client-side only.

---

### URL Parsing in Node.js

```typescript
const url = new URL(
  "https://api.example.com:3000/users/123?active=true#profile"
);

console.log(url.protocol); // 'https:'
console.log(url.hostname); // 'api.example.com'
console.log(url.port); // '3000'
console.log(url.pathname); // '/users/123'
console.log(url.search); // '?active=true'
console.log(url.hash); // '#profile'

// Query parameters
console.log(url.searchParams.get("active")); // 'true'
console.log(url.searchParams.get("sort")); // null
```

---

# Part 2: Building HTTP Server with Node's http Module

## 6️⃣ Creating a Basic Server

### Your First HTTP Server

```typescript
import http from "http";

// Create server
const server = http.createServer((req, res) => {
  // This function runs for EVERY request
  console.log("Request received!");

  // Send response
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello, World!");
});

// Start listening
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
```

**What's happening?**

1. `http.createServer()` - Creates server instance
2. Callback function receives `req` (request) and `res` (response)
3. `res.writeHead()` - Sets status code and headers
4. `res.end()` - Sends response and closes connection
5. `server.listen()` - Starts server on specified port

---

### Understanding req and res Objects

```typescript
const server = http.createServer((req, res) => {
  // Request object (req) - Information from client
  console.log("Method:", req.method); // GET, POST, etc.
  console.log("URL:", req.url); // /users/123?active=true
  console.log("Headers:", req.headers); // Object with all headers

  // Response object (res) - Send data back to client
  res.statusCode = 200; // Set status code
  res.setHeader("Content-Type", "application/json");
  res.write('{"message": "Hello"}'); // Write body data
  res.end(); // Finish response
});
```

---

## 7️⃣ Handling Different Routes

### Manual Routing with if/else

```typescript
import http from "http";
import { URL } from "url";

const server = http.createServer((req, res) => {
  // Parse URL
  const url = new URL(req.url || "", `http://localhost:3000`);
  const pathname = url.pathname;

  // Route handling
  if (pathname === "/") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Welcome to home page!");
  } else if (pathname === "/about") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("About page");
  } else if (pathname === "/users") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ users: ["Mohsen", "Yomna"] }));
  } else {
    // 404 - Not Found
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 - Page Not Found");
  }
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
```

---

### Method-Based Routing

```typescript
const server = http.createServer((req, res) => {
  const url = new URL(req.url || "", `http://localhost:3000`);
  const pathname = url.pathname;
  const method = req.method;

  // GET /users
  if (method === "GET" && pathname === "/users") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ users: ["User1", "User2"] }));
  }
  // POST /users
  else if (method === "POST" && pathname === "/users") {
    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "User created" }));
  }
  // Method not allowed
  else if (pathname === "/users") {
    res.writeHead(405, { "Content-Type": "text/plain" });
    res.end("Method Not Allowed");
  }
  // Route not found
  else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});
```

---

## 8️⃣ Parsing Request Data

### Parsing URL and Query Parameters

```typescript
import http from "http";
import { URL } from "url";

const server = http.createServer((req, res) => {
  const url = new URL(req.url || "", `http://localhost:3000`);

  // Get pathname
  const pathname = url.pathname;
  console.log("Path:", pathname); // /users

  // Get query parameters
  const page = url.searchParams.get("page") || "1";
  const limit = url.searchParams.get("limit") || "10";

  console.log("Page:", page); // 2
  console.log("Limit:", limit); // 20

  // Example: GET /users?page=2&limit=20
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(
    JSON.stringify({
      page: parseInt(page),
      limit: parseInt(limit),
      users: ["User1", "User2"],
    })
  );
});

server.listen(3000);
```

---

### Parsing Path Parameters

```typescript
// Example: /users/123 → Extract user ID

function matchPath(pattern: string, path: string) {
  const patternParts = pattern.split("/");
  const pathParts = path.split("/");

  if (patternParts.length !== pathParts.length) {
    return null;
  }

  const params: Record<string, string> = {};

  for (let i = 0; i < patternParts.length; i++) {
    if (patternParts[i].startsWith(":")) {
      // This is a parameter
      const paramName = patternParts[i].slice(1);
      params[paramName] = pathParts[i];
    } else if (patternParts[i] !== pathParts[i]) {
      // Parts don't match
      return null;
    }
  }

  return params;
}

// Usage
const server = http.createServer((req, res) => {
  const url = new URL(req.url || "", `http://localhost:3000`);
  const pathname = url.pathname;

  // Check if path matches /users/:id
  const params = matchPath("/users/:id", pathname);

  if (params) {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        message: `Getting user with ID: ${params.id}`,
      })
    );
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});
```

---

### Parsing Request Body (POST/PUT)

Request body comes in **chunks** (streams), not all at once!

```typescript
function parseBody(req: http.IncomingMessage): Promise<any> {
  return new Promise((resolve, reject) => {
    let body = "";

    // Data comes in chunks
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    // All data received
    req.on("end", () => {
      try {
        const parsed = JSON.parse(body);
        resolve(parsed);
      } catch (error) {
        reject(new Error("Invalid JSON"));
      }
    });

    // Error handling
    req.on("error", (error) => {
      reject(error);
    });
  });
}

// Usage
const server = http.createServer(async (req, res) => {
  if (req.method === "POST" && req.url === "/users") {
    try {
      const body = await parseBody(req);
      console.log("Received data:", body);

      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          message: "User created",
          data: body,
        })
      );
    } catch (error) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          error: "Invalid request body",
        })
      );
    }
  }
});
```

---

## 9️⃣ Sending Different Content Types

### Sending JSON

```typescript
const data = {
  id: 123,
  name: "Mohsen",
  email: "mohsen@example.com",
};

res.writeHead(200, { "Content-Type": "application/json" });
res.end(JSON.stringify(data));
```

---

### Sending HTML

```typescript
const html = `
<!DOCTYPE html>
<html>
  <head>
    <title>My Server</title>
  </head>
  <body>
    <h1>Hello from Node.js!</h1>
    <p>This is a dynamically generated page.</p>
  </body>
</html>
`;

res.writeHead(200, { "Content-Type": "text/html" });
res.end(html);
```

---

### Sending Plain Text

```typescript
res.writeHead(200, { "Content-Type": "text/plain" });
res.end("This is plain text response");
```

---

### Content-Type Reference

```typescript
"text/plain"; // Plain text
"text/html"; // HTML
"application/json"; // JSON
"application/xml"; // XML
"text/csv"; // CSV
"application/pdf"; // PDF
"image/png"; // PNG image
"image/jpeg"; // JPEG image
"video/mp4"; // MP4 video
```

---

# Part 3: Building a Complete REST API

## 🔟 Setting Up In-Memory Data Store

```typescript
// types.ts
export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  createdAt: string;
}

// database.ts - In-memory storage
let todos: Todo[] = [
  {
    id: 1,
    title: "Learn Node.js",
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    title: "Build REST API",
    completed: false,
    createdAt: new Date().toISOString(),
  },
];

let nextId = 3;

export function getAllTodos(): Todo[] {
  return todos;
}

export function getTodoById(id: number): Todo | undefined {
  return todos.find((todo) => todo.id === id);
}

export function createTodo(title: string): Todo {
  const newTodo: Todo = {
    id: nextId++,
    title,
    completed: false,
    createdAt: new Date().toISOString(),
  };
  todos.push(newTodo);
  return newTodo;
}

export function updateTodo(
  id: number,
  updates: Partial<Todo>
): Todo | undefined {
  const index = todos.findIndex((todo) => todo.id === id);

  if (index === -1) {
    return undefined;
  }

  todos[index] = { ...todos[index], ...updates };
  return todos[index];
}

export function deleteTodo(id: number): boolean {
  const index = todos.findIndex((todo) => todo.id === id);

  if (index === -1) {
    return false;
  }

  todos.splice(index, 1);
  return true;
}
```

---

## 1️⃣1️⃣ Complete TODO REST API

```typescript
import http from "http";
import { URL } from "url";
import * as db from "./database";

// Helper function to parse JSON body
function parseBody(req: http.IncomingMessage): Promise<any> {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => (body += chunk.toString()));
    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (error) {
        reject(new Error("Invalid JSON"));
      }
    });
    req.on("error", reject);
  });
}

// Helper function to send JSON response
function sendJSON(res: http.ServerResponse, statusCode: number, data: any) {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
}

// Helper function to match path with parameters
function matchPath(pattern: string, path: string) {
  const patternParts = pattern.split("/").filter(Boolean);
  const pathParts = path.split("/").filter(Boolean);

  if (patternParts.length !== pathParts.length) {
    return null;
  }

  const params: Record<string, string> = {};

  for (let i = 0; i < patternParts.length; i++) {
    if (patternParts[i].startsWith(":")) {
      params[patternParts[i].slice(1)] = pathParts[i];
    } else if (patternParts[i] !== pathParts[i]) {
      return null;
    }
  }

  return params;
}

// Create server
const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url || "", `http://localhost:3000`);
    const pathname = url.pathname;
    const method = req.method;

    // GET /todos - Get all todos
    if (method === "GET" && pathname === "/todos") {
      const todos = db.getAllTodos();
      sendJSON(res, 200, { success: true, data: todos });
    }

    // GET /todos/:id - Get single todo
    else if (method === "GET" && matchPath("/todos/:id", pathname)) {
      const params = matchPath("/todos/:id", pathname);
      const id = parseInt(params!.id);

      const todo = db.getTodoById(id);

      if (!todo) {
        sendJSON(res, 404, {
          success: false,
          error: "Todo not found",
        });
        return;
      }

      sendJSON(res, 200, { success: true, data: todo });
    }

    // POST /todos - Create new todo
    else if (method === "POST" && pathname === "/todos") {
      const body = await parseBody(req);

      if (!body.title || typeof body.title !== "string") {
        sendJSON(res, 400, {
          success: false,
          error: "Title is required and must be a string",
        });
        return;
      }

      const newTodo = db.createTodo(body.title);
      sendJSON(res, 201, { success: true, data: newTodo });
    }

    // PUT /todos/:id - Update todo
    else if (method === "PUT" && matchPath("/todos/:id", pathname)) {
      const params = matchPath("/todos/:id", pathname);
      const id = parseInt(params!.id);
      const body = await parseBody(req);

      // Validate input
      if (body.title !== undefined && typeof body.title !== "string") {
        sendJSON(res, 400, {
          success: false,
          error: "Title must be a string",
        });
        return;
      }

      if (body.completed !== undefined && typeof body.completed !== "boolean") {
        sendJSON(res, 400, {
          success: false,
          error: "Completed must be a boolean",
        });
        return;
      }

      const updatedTodo = db.updateTodo(id, body);

      if (!updatedTodo) {
        sendJSON(res, 404, {
          success: false,
          error: "Todo not found",
        });
        return;
      }

      sendJSON(res, 200, { success: true, data: updatedTodo });
    }

    // DELETE /todos/:id - Delete todo
    else if (method === "DELETE" && matchPath("/todos/:id", pathname)) {
      const params = matchPath("/todos/:id", pathname);
      const id = parseInt(params!.id);

      const deleted = db.deleteTodo(id);

      if (!deleted) {
        sendJSON(res, 404, {
          success: false,
          error: "Todo not found",
        });
        return;
      }

      sendJSON(res, 200, {
        success: true,
        message: "Todo deleted successfully",
      });
    }

    // Route not found
    else {
      sendJSON(res, 404, {
        success: false,
        error: "Route not found",
      });
    }
  } catch (error: any) {
    console.error("Server error:", error);
    sendJSON(res, 500, {
      success: false,
      error: "Internal server error",
      message: error.message,
    });
  }
});

// Start server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}/`);
  console.log("\nAvailable endpoints:");
  console.log("  GET    /todos      - Get all todos");
  console.log("  GET    /todos/:id  - Get single todo");
  console.log("  POST   /todos      - Create new todo");
  console.log("  PUT    /todos/:id  - Update todo");
  console.log("  DELETE /todos/:id  - Delete todo");
});
```

---

## 1️⃣2️⃣ API Response Structure

### Consistent Response Format

Always return consistent response structure:

```typescript
// Success response
{
  success: true,
  data: { ... }
}

// Error response
{
  success: false,
  error: "Error message"
}
```

---

### Status Code Guidelines

```typescript
// Success cases
200 OK               // GET, PUT - Resource retrieved/updated
201 Created          // POST - Resource created
204 No Content       // DELETE - Resource deleted (optional)

// Client error cases
400 Bad Request      // Invalid data format
404 Not Found        // Resource doesn't exist
405 Method Not Allowed // Wrong HTTP method
422 Unprocessable Entity // Validation failed

// Server error cases
500 Internal Server Error // Something broke on server
```

---

## 1️⃣3️⃣ Error Handling Patterns

### Input Validation

```typescript
// Validate required fields
if (!body.title) {
  return sendJSON(res, 400, {
    success: false,
    error: "Title is required",
  });
}

// Validate types
if (typeof body.title !== "string") {
  return sendJSON(res, 400, {
    success: false,
    error: "Title must be a string",
  });
}

// Validate length
if (body.title.length < 3) {
  return sendJSON(res, 400, {
    success: false,
    error: "Title must be at least 3 characters",
  });
}

// Validate email format
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(body.email)) {
  return sendJSON(res, 400, {
    success: false,
    error: "Invalid email format",
  });
}
```

---

### Try-Catch for Unexpected Errors

```typescript
const server = http.createServer(async (req, res) => {
  try {
    // All your route handling code
    // ...
  } catch (error: any) {
    console.error("Server error:", error);

    // Send generic error response
    sendJSON(res, 500, {
      success: false,
      error: "Internal server error",
      // Only include details in development
      ...(process.env.NODE_ENV === "development" && {
        details: error.message,
        stack: error.stack,
      }),
    });
  }
});
```

---

### Validation Helper Functions

```typescript
// validators.ts
export function validateTodo(data: any): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data.title) {
    errors.push("Title is required");
  } else if (typeof data.title !== "string") {
    errors.push("Title must be a string");
  } else if (data.title.length < 3) {
    errors.push("Title must be at least 3 characters");
  } else if (data.title.length > 100) {
    errors.push("Title must not exceed 100 characters");
  }

  if (data.completed !== undefined && typeof data.completed !== "boolean") {
    errors.push("Completed must be a boolean");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

// Usage in route handler
const validation = validateTodo(body);
if (!validation.valid) {
  return sendJSON(res, 400, {
    success: false,
    errors: validation.errors,
  });
}
```

---

# Part 4: Testing Your API with Postman
## 1️⃣4️⃣ Using Postman
### Setting Up Postman

Download & install Postman (Windows / Mac / Linux)

Open Postman and click Collections

Create a New Collection → name it Todo API

Inside it, create individual Requests (GET / POST / etc.)

# Testing GET Requests
* ##  Get All Todos

### Postman Setup:

  ```
  Method: GET

  URL: http://localhost:3000/todos

  Headers: none

  Body: none
  ```
### Expected Response:
```json 
{
"success": true,
"data": [
    {
      "id": 1,
      "title": "Learn Node.js",
      "completed": false,
      "createdAt": "2025-11-30T10:00:00.000Z"
    }
  ]
}
```
---

* ## Get Single Todo

### Postman Setup:

```json
Method: GET
URL: http://localhost:3000/todos/1
Headers: none
Body: none
```

### Expected Response:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Learn Node.js",
    "completed": false,
    "createdAt": "2025-11-30T10:00:00.000Z"
  }
}
```
---
# Testing POST Requests
* ## Create New Todo

### Postman Setup:

```json
Method: POST
URL: http://localhost:3000/todos
Headers:
Content-Type: application/json
Body (raw → JSON):
{
  "title": "Learn TypeScript"
}
```
### Expected Response:
```json
{
  "success": true,
  "data": {
    "id": 3,
    "title": "Learn TypeScript",
    "completed": false,
    "createdAt": "2025-11-30T10:15:00.000Z"
  }
}
```
# Testing PUT Requests
* ## Update Todo

### Postman Setup:
```josn
Method: PUT
URL: http://localhost:3000/todos/1
Headers:
Content-Type: application/json
Body (raw → JSON):
{
  "completed": true
}
```

### Expected Response:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Learn Node.js",
    "completed": true,
    "createdAt": "2025-11-30T10:00:00.000Z"
  }
}
```
---
# Testing DELETE Requests
* ## Delete Todo

### Postman Setup:
```josn
Method: DELETE
URL: http://localhost:3000/todos/1
Headers: none
Body: none
```
### Expected Response:
```json
{
  "success": true,
  "message": "Todo deleted successfully"
}
```
---

# Testing Error Cases
* ## 404 Not Found

```json
Method: GET
URL: http://localhost:3000/todos/999
```
### Expected:
```json
{
  "success": false,
  "error": "Todo not found"
}
```
---
* ## 400 Bad Request
```
Method: POST
URL: http://localhost:3000/todos
Body (raw → JSON):
{
  "title": ""
}
```
### Expected:
```json
{
  "success": false,
  "error": "Title is required and must be a string"
}
```
---
* ## 405 Method Not Allowed
```
Method: PATCH
URL: http://localhost:3000/todos/1
```
### Expected:
```json
{
"success": false,
"error": "Route not found"
}
```

# 1️⃣5️⃣ Postman Testing Checklist
## Functional Tests
* ✅ GET /todos returns all todos
* ✅ GET /todos/:id returns single todo
* ✅ GET /todos/999 returns 404
* ✅ POST /todos creates new todo
* ✅ POST /todos empty title returns 400
* ✅ PUT /todos/:id updates todo
* ✅ PUT /todos/999 returns 404
* ✅ DELETE /todos/:id deletes todo
* ✅ DELETE /todos/999 returns 404

## Edge Case Tests
* ✅ Very long title (1000+ chars)
* ✅ Special characters
* ✅ Emojis / Arabic text
* ✅ Empty body
* ✅ Wrong JSON format
* ✅ Missing Content-Type header
* ✅ Extra fields in body

---

# 🎯 Complete Project Structure

```
todo-api/
├── src/
│   ├── server.ts          # Main server file
│   ├── database.ts        # In-memory data store
│   ├── types.ts           # TypeScript interfaces
│   ├── validators.ts      # Input validation
│   └── utils.ts           # Helper functions
├── package.json
├── tsconfig.json
└── README.md
```

---

# 🎓 Summary

## What We Built

* ✅ **HTTP Server from Scratch** - No frameworks, pure Node.js
* ✅ **Manual Routing** - Understanding how routers work
* ✅ **Request Parsing** - URL, query params, body
* ✅ **Complete REST API** - Full CRUD operations
* ✅ **Error Handling** - Proper status codes and messages
* ✅ **Input Validation** - Protecting against bad data

---

## Key Takeaways

### 1. HTTP Request/Response Cycle

- Every web interaction is a request → response cycle
- Browser sends request, server sends response
- Headers carry metadata, body carries data

---

### 2. HTTP Methods Have Meaning

```
GET    - Retrieve data (safe, idempotent)
POST   - Create data (not idempotent)
PUT    - Update/replace data (idempotent)
DELETE - Remove data (idempotent)
```

---

### 3. Status Codes Communicate Results

```
2xx - Success
4xx - Client error (bad request)
5xx - Server error (something broke)
```

---

### 4. Routing is Pattern Matching

```typescript
if (method === "GET" && pathname === "/users") {
  // Handle GET /users
} else if (method === "POST" && pathname === "/users") {
  // Handle POST /users
}
```

---

## 📝 Practice Tasks

### Task 1: Basic Server

Build a server that:

- Responds "Hello World" at `/`
- Responds with current time at `/time`
- Returns 404 for other routes

---

### Task 2: Calculator API

Build an API with:

- `GET /add?a=5&b=3` → Returns sum
- `GET /subtract?a=10&b=4` → Returns difference
- `GET /multiply?a=6&b=7` → Returns product
- `GET /divide?a=20&b=4` → Returns quotient

---

### Task 3: User Management API

Build a complete CRUD API for users:

```typescript
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}
```

Endpoints:

- `GET /users` - List all users
- `GET /users/:id` - Get single user
- `POST /users` - Create user
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user

Include validation:

- Name: required, 2-50 characters
- Email: required, valid format
- Age: required, 13-120

---

Endpoints:

- `GET /posts` - All posts (with query filters)
- `GET /posts/:id` - Single post
- `POST /posts` - Create post
- `PUT /posts/:id` - Update post
- `DELETE /posts/:id` - Delete post
- `GET /posts?published=true` - Filter published
- `GET /posts?author=Mohsen` - Filter by author

---

## 💡 Best Practices Recap

### 1. Always Validate Input

```typescript
✅ Check required fields
✅ Validate types
✅ Validate formats
✅ Validate ranges
✅ Return clear error messages
```

---

### 2. Use Consistent Response Format

```typescript
// Success
{ success: true, data: {...} }

// Error
{ success: false, error: "message" }
```

---

### 3. Handle All Error Cases

```typescript
✅ 400 - Invalid input
✅ 404 - Not found
✅ 405 - Method not allowed
✅ 500 - Server error
```

---

### 4. Use Proper Status Codes

```typescript
✅ 200 - Success (GET, PUT)
✅ 201 - Created (POST)
✅ 204 - No content (DELETE)
✅ 400 - Bad request
✅ 404 - Not found
✅ 500 - Server error
```

---

### 5. Log Everything

```typescript
✅ Log incoming requests
✅ Log errors
✅ Log response times
✅ Log validation failures
```

---

## 🎯 Next Session Preview

**Session 5: Express.js Framework**

Now that you understand HTTP from scratch, you'll learn:

- Why Express makes life easier
- Routing with Express
- Middleware system
- Request/response helpers
- Error handling in Express
- Building the same TODO API with 50% less code!

---

## 📚 Additional Resources

### Documentation

- [Node.js HTTP Module](https://nodejs.org/api/http.html)
- [MDN: HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP)
- [REST API Tutorial](https://restfulapi.net/)

### Tools

- Postman (API testing)
- cURL (command line testing)

---

## 🔥 Final Thoughts

**You just built a complete REST API from scratch!**

- ✅ No frameworks
- ✅ Pure Node.js
- ✅ Understanding every line
- ✅ Ready for Express.js

**This foundation makes you a better backend developer because you understand what's happening under the hood!**

When you use Express.js next, you'll appreciate:

- How much it simplifies
- What problems it solves
- When to use it vs raw Node.js

**Remember:** Frameworks come and go, but HTTP fundamentals remain the same. Master the basics! 🚀

---

## ✅ Session Checklist

Before moving to the next session, make sure you can:

```
□ Explain the HTTP request/response cycle
□ List HTTP methods and their purposes
□ Explain status codes (2xx, 4xx, 5xx)
□ Create a basic HTTP server with Node.js
□ Parse URL and query parameters
□ Parse request body (JSON)
□ Send different content types
□ Handle different routes manually
□ Implement CRUD operations
□ Validate user input
□ Handle errors properly
□ Test API with Postman
```

**If you can do all of these, you're ready for Express.js!** 🎓
