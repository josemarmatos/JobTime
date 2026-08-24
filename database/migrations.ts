import { database } from "./database";

export function runMigrations() {
  database.execSync(`
    CREATE TABLE IF NOT EXISTS companies (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      cnpj TEXT NOT NULL,
      phone TEXT,
      email TEXT,
      manager TEXT,
      active INTEGER NOT NULL DEFAULT 1
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

    CREATE TABLE IF NOT EXISTS scales (
      id INTEGER PRIMARY KEY AUTOINCREMENT,

      employee_id INTEGER NOT NULL,

      work_date TEXT NOT NULL,

      start_time TEXT NOT NULL,

      end_time TEXT NOT NULL,

      shift_name TEXT NOT NULL,

      status TEXT NOT NULL DEFAULT 'scheduled',

      notes TEXT,

      created_at TEXT NOT NULL,

      updated_at TEXT,

      FOREIGN KEY(employee_id)
        REFERENCES employees(id)
        ON DELETE CASCADE
    );

    CREATE INDEX IF NOT EXISTS idx_scales_employee_date
      ON scales(employee_id, work_date);
  `);

  const columns = database.getAllSync<{
    name: string;
  }>(`
    PRAGMA table_info(companies);
  `);

  const hasActiveColumn = columns.some(
    (column) => column.name === "active"
  );

  if (!hasActiveColumn) {
    database.execSync(`
      ALTER TABLE companies
      ADD COLUMN active INTEGER NOT NULL DEFAULT 1;
    `);
  }
}