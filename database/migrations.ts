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

    CREATE TABLE IF NOT EXISTS employees (
      id INTEGER PRIMARY KEY AUTOINCREMENT,

      company_id INTEGER NOT NULL,

      name TEXT NOT NULL,
      cpf TEXT NOT NULL,

      phone TEXT,
      email TEXT,

      role TEXT NOT NULL,

      admission_date TEXT,
      birth_date TEXT,

      active INTEGER NOT NULL DEFAULT 1,

      FOREIGN KEY(company_id)
      REFERENCES companies(id)
    );
  `);
}