//Connecting db w/ server
const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "docker",
    host: "localhost",
    port: 5432,
    database: "simpler_todo"
});

module.exports = pool;