const path = require("path");
const sqlite3 = require("sqlite3").verbose();

const dbPath =  path.resolve(__dirname, "database.sqlite3");

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error(" Error opening database:", err.message);
    process.exit(1);
  } else {
    console.log(" Connected to SQLite database", dbPath);
  }
});

db.serialize(() => {
  db.run('PRAGMA foreign_keys = ON;');

   db.run(`
     CREATE TABLE IF NOT EXISTS users (
     id INTEGER PRIMARY KEY AUTOINCREMENT,
     first_name TEXT NOT NULL,
     last_name TEXT NOT NULL,
     email TEXT UNIQUE NOT NULL,
     department TEXT NOT NULL,
     created_at TEXT DEFAULT (datetime('now')),
     updated_at TEXT DEFAULT (datetime('now'))
     );

    `);

})  

module.exports = db;
