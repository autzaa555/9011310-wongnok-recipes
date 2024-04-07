import sqlite3 from "sqlite3";
import { open } from "sqlite";

let db = null;

export async function connectDB() {
  if (!db) {
    db = await open({
      filename: "./db/devpool.db",
      driver: sqlite3.Database,
    });
  }
  return db;
}