import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: 'postgres',
  password: 'bakadesu',
  host: 'localhost',
  port: 5432,
  database: 'topup_db'
});

export default pool;

// import { Pool } from 'pg';

// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'topup_db',
//   password: 'bakadesu',
//   port: 5432,
// });

// export default pool;
