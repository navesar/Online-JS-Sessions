import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

// deployed database
const db = new pg.Client({
    	connectionString:  process.env.DATABASE_URL
    });

// // local database
// const db = new pg.Client({
// 	user: process.env.DB_USERNAME,
// 	host: process.env.DB_HOST,
// 	database: process.env.DB_DATABASE_NAME,
// 	password: process.env.DB_PASSWORD,
// 	port: process.env.DB_PORT,
// });

export default db;