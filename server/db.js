const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'urbanpulse.db');
const db = new Database(dbPath);

// Enable WAL mode for better concurrency & performance
db.pragma('journal_mode = WAL');

// Initialize database schema
const initDb = () => {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      full_name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL COLLATE NOCASE,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'citizen',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);
};

initDb();

module.exports = db;
