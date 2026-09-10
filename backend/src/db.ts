import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

// pool = connection between nodejs and postgres database
const { Pool } = pg;
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});
