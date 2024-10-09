const sqlite3 = require('sqlite3').verbose();

// Open database
let db = new sqlite3.Database('./products.db');

db.serialize(() => {
  // Create product table
  db.run(`CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    price REAL,
    discount INTEGER,
    sales INTEGER,
    image TEXT
  )`);

  // Insert some product data
  db.run(`INSERT INTO products (name, price, discount, sales, image) VALUES 
    ('Thuja Green Giant Arborvitae', 14.95, 40, 2675, 'thuja.jpg'),
    ('Honeycrisp Apple Tree', 144.95, 24, 343, 'honeycrisp.jpg'),
    ('Autumn Blaze Red Maple Tree', 164.95, 28, 749, 'autumn_blaze.jpg'),
    ('Emerald Green Arborvitae', 24.95, 0, 637, 'emerald_arborvitae.jpg'),
    ('Full Speed A Hedge American Pillar', 36.95, 25, 128, 'full_speed.jpg')
  `);
});

db.close();
