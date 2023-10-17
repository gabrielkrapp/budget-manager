import { Pool } from 'pg';


export const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'budget-manager',
  port: 5432
});

