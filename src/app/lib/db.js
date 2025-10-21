// lib/db.js
import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  //max: 10,
  //idleTimeoutMillis: 30000,
  //connectionTimeoutMillis: 2000,
});

export default pool;
