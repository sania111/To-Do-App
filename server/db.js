const Pool= require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "todoproject",
  password: "sania111",
  port: 5432,
});

module.exports=pool;