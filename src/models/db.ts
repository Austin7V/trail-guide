import sqlite3 from "sqlite3";
import { open, type Database} from "sqlite";

let db: Database | null = null;

export async function connectDB() {
    const dbPath = process.env.DB_PATH;
    if(!dbPath) {
        throw new Error("DB_PATH is missing in .env");
    }
    db = await open({
        filename: dbPath,
        driver: sqlite3.Database,
    });
    console.log(`Database connected: ${dbPath}`);
}

export function getDB() {
    if(!db) {
        throw new Error("Database is not connected");
    }
    return db;
}

export async function closeDB() {
    if (db) {
        await db.close();
        db = null;
        console.log("Database connection closed")
    }
}