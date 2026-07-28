import * as SQLite from "expo-sqlite";

export const database = SQLite.openDatabaseSync("jobtime.db");

// Habilita o suporte a chaves estrangeiras
database.execSync(`
  PRAGMA foreign_keys = ON;
`);