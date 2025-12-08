// Task 2: Calculator API

import http from 'http';
import { URL } from 'url';

// Create the server
const server = http.createServer((req, res) => {
  
  // Parse the URL to get path and query parameters
  const parsedUrl = new URL(req.url || '', 'http://localhost:3000');
  const path = parsedUrl.pathname;
  
  // Get 'a' and 'b' from query parameters
  // Example: /add?a=5&b=3 → a=5, b=3
  const a = parsedUrl.searchParams.get('a');
  const b = parsedUrl.searchParams.get('b');
  
  // Convert strings to numbers
  const num1 = Number(a);
  const num2 = Number(b);
  
  // Check if numbers are valid
  const areNumbersValid = a && b && !isNaN(num1) && !isNaN(num2);
  
  // Route 1: Addition
  if (path === '/add') {
    if (!areNumbersValid) {
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.end('Error: Please provide valid numbers for a and b');
      return;
    }
    const result = num1 + num2;
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`${num1} + ${num2} = ${result}`);
  }
  
  // Route 2: Subtraction
  else if (path === '/subtract') {
    if (!areNumbersValid) {
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.end('Error: Please provide valid numbers for a and b');
      return;
    }
    const result = num1 - num2;
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`${num1} - ${num2} = ${result}`);
  }
  
  // Route 3: Multiplication
  else if (path === '/multiply') {
    if (!areNumbersValid) {
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.end('Error: Please provide valid numbers for a and b');
      return;
    }
    const result = num1 * num2;
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`${num1} × ${num2} = ${result}`);
  }
  
  // Route 4: Division
  else if (path === '/divide') {
    if (!areNumbersValid) {
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.end('Error: Please provide valid numbers for a and b');
      return;
    }
    if (num2 === 0) {
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.end('Error: Cannot divide by zero!');
      return;
    }
    const result = num1 / num2;
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`${num1} ÷ ${num2} = ${result}`);
  }
  
  // Route 5: Home page (shows instructions)
  else if (path === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`
Calculator API
==============

Available operations:
- /add?a=5&b=3
- /subtract?a=10&b=4
- /multiply?a=6&b=7
- /divide?a=20&b=4

Try it: http://localhost:3000/add?a=10&b=5
    `);
  }
  
  // Route 6: 404 - Not found
  else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 - Page Not Found');
  }
  
});

// Start the server
server.listen(3000, () => {
  console.log('✅ Calculator API is running!');
  console.log('🌐 Visit: http://localhost:3000');
  console.log('');
  console.log('Try these URLs:');
  console.log('  http://localhost:3000/add?a=5&b=3');
  console.log('  http://localhost:3000/subtract?a=10&b=4');
  console.log('  http://localhost:3000/multiply?a=6&b=7');
  console.log('  http://localhost:3000/divide?a=20&b=4');
});

/*
HOW TO TEST:
1. Open browser and try:
   - http://localhost:3000/add?a=5&b=3
   - http://localhost:3000/subtract?a=10&b=4
   - http://localhost:3000/multiply?a=6&b=7
   - http://localhost:3000/divide?a=20&b=4

2. Try error cases:
   - http://localhost:3000/divide?a=10&b=0  → Error: Cannot divide by zero
   - http://localhost:3000/add?a=hello&b=world  → Error: Invalid numbers
*/