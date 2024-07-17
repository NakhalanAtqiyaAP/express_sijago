const { Pool } = require('pg').Pool;

const pool = new Pool({
  user: 'postgres',
  password: 'bakadesu',
  host: 'localhost',
  port: 5432,
  database: 'db_learning'
});

module.exports = {
 pool
}