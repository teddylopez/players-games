import dotenv from 'dotenv'
dotenv.config()
import pg from 'pg'
const { Pool } = pg
let pool = null;
let production = process.env.DATABASE_URL;

if (production) {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });
} else {
  pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PG_PASSWORD,
    port: "5432",
  });
}

export default pool;
