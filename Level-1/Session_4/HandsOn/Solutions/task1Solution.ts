// Task 1: Basic Server

import http from 'http';

// Create the server
const server = http.createServer((req, res) => {
  
  // Get the URL from the request
  const url = req.url;
  
  // Route 1: Home page
  if (url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World! 👋');
  }
  
  // Route 2: Time page
  else if (url === '/time') {
    const currentTime = new Date().toLocaleString();
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`Current time is: ${currentTime}`);
  }
  
  // Route 3: 404 - Page not found
  else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 - Page Not Found');
  }
  
});

// Start the server on port 3000
server.listen(3000, () => {
  console.log('✅ Server is running!');
  console.log('🌐 Visit: http://localhost:3000');
  console.log('🌐 Visit: http://localhost:3000/time');
});

/*
HOW TO RUN:
1. Save this file as src/server.ts
2. Run: npm run dev
3. Open browser: http://localhost:3000

HOW TO TEST:
- Go to http://localhost:3000/ → See "Hello World!"
- Go to http://localhost:3000/time → See current time
- Go to http://localhost:3000/anything → See "404 - Page Not Found"
*/