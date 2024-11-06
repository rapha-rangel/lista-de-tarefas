import mysql from "mysql2";
import dotenv from 'dotenv';
const dot = dotenv.config({path:'.env'})
export const db= mysql.createPool({
  host: dot.parsed.DB_HOST,
  user: dot.parsed.DB_USER,
  password: dot.parsed.DB_PASS,
  database: dot.parsed.DB_NAME,
  port:dot.parsed.DB_PORT,
  connectionLimit: 10,
});
