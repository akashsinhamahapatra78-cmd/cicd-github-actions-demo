/**
 * Simple demo application for CI/CD pipeline
 * This file demonstrates basic Node.js functionality
 */

const http = require('http');

const hostname = 'localhost';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  
  if (req.url === '/') {
    res.end(`
      <html>
        <head><title>CI/CD Demo</title></head>
        <body>
          <h1>Welcome to CI/CD GitHub Actions Demo!</h1>
          <p>This application was built and deployed by GitHub Actions.</p>
          <p>Build Status: ✓ Success</p>
          <p>Deployment: ✓ Active</p>
        </body>
      </html>
    `);
  } else if (req.url === '/api/status') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ status: 'ok', timestamp: new Date().toISOString() }));
  } else {
    res.statusCode = 404;
    res.end('404 - Page Not Found');
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

module.exports = server;
