import { database } from "./database";

export function runMigrations() {
  database.execSync(`
    CREATE TABLE IF NOT EXISTS companies (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      cnpj TEXT NOT NULL,
      phone TEXT,
      email TEXT,
      manager TEXT
    );
  `);
}