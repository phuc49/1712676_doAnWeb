const mysql = require("mysql");
const dbConfig = require("../config/db.config");
const util = require('util');

const pool = mysql.createPool({
    host: dbConfig.host,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database
});

const mysql_query = util.promisify(pool.query).bind(pool);
module.exports = {
    load: mysql_query
};

