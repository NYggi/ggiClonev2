const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

// Open the SQLite database
let db = new sqlite3.Database('./products.db');

// Set up a route to fetch top-selling products
app.get('/api/top-selling', (req, res) => {
  db.all('SELECT * FROM products ORDER BY sales DESC LIMIT 5', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// Serve frontend (basic HTML for now)
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Start server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
