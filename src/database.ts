import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';

// Enable verbose mode for debugging
sqlite3.verbose();

export async function initializeDatabase(): Promise<Database> {
  const db = await open({
    filename: './tasks.db',
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      priority TEXT CHECK(priority IN ('High', 'Medium', 'Low')),
      dueDate TEXT,
      status TEXT CHECK(status IN ('Pending', 'In Progress', 'Completed')),
      createdAt TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  return db;
}
