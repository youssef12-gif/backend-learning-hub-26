// Task 3: User Management API

import http from 'http';
import { URL } from 'url';

// User type definition
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

// Our "database" - just an array in memory
let users: User[] = [
  { id: 1, name: 'Mohsen Ahmed', email: 'mohsen@example.com', age: 28 },
  { id: 2, name: 'Yomna Hassan', email: 'yomna@example.com', age: 25 }
];

// Keep track of next ID
let nextId = 3;

// Helper function: Read request body (for POST and PUT)
function getRequestBody(req: http.IncomingMessage): Promise<any> {
  return new Promise((resolve) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        resolve(JSON.parse(body));
      } catch (error) {
        resolve({});
      }
    });
  });
}

// Helper function: Validate user data
function validateUser(data: any): string[] {
  const errors: string[] = [];
  
  // Check name
  if (!data.name || typeof data.name !== 'string') {
    errors.push('Name is required and must be text');
  } else if (data.name.length < 2 || data.name.length > 50) {
    errors.push('Name must be between 2 and 50 characters');
  }
  
  // Check email
  if (!data.email || typeof data.email !== 'string') {
    errors.push('Email is required');
  } else if (!data.email.includes('@') || !data.email.includes('.')) {
    errors.push('Email must be valid (example: user@example.com)');
  }
  
  // Check age
  if (data.age === undefined || typeof data.age !== 'number') {
    errors.push('Age is required and must be a number');
  } else if (data.age < 13 || data.age > 120) {
    errors.push('Age must be between 13 and 120');
  }
  
  return errors;
}

// Create the server
const server = http.createServer(async (req, res) => {
  
  const parsedUrl = new URL(req.url || '', 'http://localhost:3000');
  const path = parsedUrl.pathname;
  const method = req.method;
  
  // Set response header to JSON
  res.setHeader('Content-Type', 'application/json');
  
  // ========================================
  // ROUTE 1: GET /users - Get all users
  // ========================================
  if (method === 'GET' && path === '/users') {
    res.writeHead(200);
    res.end(JSON.stringify({
      success: true,
      count: users.length,
      users: users
    }, null, 2));
  }
  
  // ========================================
  // ROUTE 2: GET /users/:id - Get one user
  // ========================================
  else if (method === 'GET' && path.startsWith('/users/')) {
    // Extract ID from URL (e.g., /users/1 → id = 1)
    const id = Number(path.split('/')[2]);
    
    // Find user by ID
    const user = users.find(u => u.id === id);
    
    if (user) {
      res.writeHead(200);
      res.end(JSON.stringify({
        success: true,
        user: user
      }, null, 2));
    } else {
      res.writeHead(404);
      res.end(JSON.stringify({
        success: false,
        error: 'User not found'
      }, null, 2));
    }
  }
  
  // ========================================
  // ROUTE 3: POST /users - Create new user
  // ========================================
  else if (method === 'POST' && path === '/users') {
    // Get data from request body
    const body = await getRequestBody(req);
    
    // Validate the data
    const errors = validateUser(body);
    if (errors.length > 0) {
      res.writeHead(400);
      res.end(JSON.stringify({
        success: false,
        errors: errors
      }, null, 2));
      return;
    }
    
    // Check if email already exists
    const emailExists = users.some(u => u.email === body.email);
    if (emailExists) {
      res.writeHead(400);
      res.end(JSON.stringify({
        success: false,
        error: 'Email already exists'
      }, null, 2));
      return;
    }
    
    // Create new user
    const newUser: User = {
      id: nextId++,
      name: body.name,
      email: body.email,
      age: body.age
    };
    
    // Add to database
    users.push(newUser);
    
    res.writeHead(201);
    res.end(JSON.stringify({
      success: true,
      message: 'User created successfully',
      user: newUser
    }, null, 2));
  }
  
  // ========================================
  // ROUTE 4: PUT /users/:id - Update user
  // ========================================
  else if (method === 'PUT' && path.startsWith('/users/')) {
    const id = Number(path.split('/')[2]);
    const body = await getRequestBody(req);
    
    // Find user
    const userIndex = users.findIndex(u => u.id === id);
    if (userIndex === -1) {
      res.writeHead(404);
      res.end(JSON.stringify({
        success: false,
        error: 'User not found'
      }, null, 2));
      return;
    }
    
    // Validate data (if provided)
    if (body.name !== undefined || body.email !== undefined || body.age !== undefined) {
      const dataToValidate = {
        name: body.name || users[userIndex].name,
        email: body.email || users[userIndex].email,
        age: body.age !== undefined ? body.age : users[userIndex].age
      };
      
      const errors = validateUser(dataToValidate);
      if (errors.length > 0) {
        res.writeHead(400);
        res.end(JSON.stringify({
          success: false,
          errors: errors
        }, null, 2));
        return;
      }
    }
    
    // Check if new email already exists (for another user)
    if (body.email && body.email !== users[userIndex].email) {
      const emailExists = users.some(u => u.email === body.email && u.id !== id);
      if (emailExists) {
        res.writeHead(400);
        res.end(JSON.stringify({
          success: false,
          error: 'Email already exists'
        }, null, 2));
        return;
      }
    }
    
    // Update user
    if (body.name) users[userIndex].name = body.name;
    if (body.email) users[userIndex].email = body.email;
    if (body.age !== undefined) users[userIndex].age = body.age;
    
    res.writeHead(200);
    res.end(JSON.stringify({
      success: true,
      message: 'User updated successfully',
      user: users[userIndex]
    }, null, 2));
  }
  
  // ========================================
  // ROUTE 5: DELETE /users/:id - Delete user
  // ========================================
  else if (method === 'DELETE' && path.startsWith('/users/')) {
    const id = Number(path.split('/')[2]);
    
    // Find user index
    const userIndex = users.findIndex(u => u.id === id);
    if (userIndex === -1) {
      res.writeHead(404);
      res.end(JSON.stringify({
        success: false,
        error: 'User not found'
      }, null, 2));
      return;
    }
    
    // Remove user from array
    const deletedUser = users[userIndex];
    users.splice(userIndex, 1);
    
    res.writeHead(200);
    res.end(JSON.stringify({
      success: true,
      message: 'User deleted successfully',
      user: deletedUser
    }, null, 2));
  }
  
  // ========================================
  // ROUTE 6: Home page (API info)
  // ========================================
  else if (method === 'GET' && path === '/') {
    res.writeHead(200);
    res.end(JSON.stringify({
      message: 'User Management API',
      endpoints: [
        'GET /users - Get all users',
        'GET /users/:id - Get one user',
        'POST /users - Create user',
        'PUT /users/:id - Update user',
        'DELETE /users/:id - Delete user'
      ]
    }, null, 2));
  }
  
  // ========================================
  // ROUTE 7: 404 - Not found
  // ========================================
  else {
    res.writeHead(404);
    res.end(JSON.stringify({
      success: false,
      error: '404 - Route not found'
    }, null, 2));
  }
  
});

// Start server
server.listen(3000, () => {
  console.log('✅ User Management API is running!');
  console.log('🌐 Visit: http://localhost:3000');
  console.log('');
  console.log('Available endpoints:');
  console.log('  GET    /users          - Get all users');
  console.log('  GET    /users/1        - Get user by ID');
  console.log('  POST   /users          - Create new user');
  console.log('  PUT    /users/1        - Update user');
  console.log('  DELETE /users/1        - Delete user');
});

/*
HOW TO TEST WITH POSTMAN OR THUNDER CLIENT:

1. GET all users:
   Method: GET
   URL: http://localhost:3000/users

2. GET one user:
   Method: GET
   URL: http://localhost:3000/users/1

3. CREATE user:
   Method: POST
   URL: http://localhost:3000/users
   Headers: Content-Type: application/json
   Body (raw JSON):
   {
     "name": "Ahmed Ali",
     "email": "ahmed@example.com",
     "age": 30
   }

4. UPDATE user:
   Method: PUT
   URL: http://localhost:3000/users/1
   Headers: Content-Type: application/json
   Body (raw JSON):
   {
     "name": "Updated Name",
     "age": 31
   }

5. DELETE user:
   Method: DELETE
   URL: http://localhost:3000/users/1
*/