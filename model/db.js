const mysql = require("mysql");
const util = require('util');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.db_host,
    user: process.env.db_user,
    password: process.env.db_password,
    database: process.env.db_database,
    connectionLimit: process.env.db_connectionLimit
});

const mysql_query = util.promisify(pool.query).bind(pool);
module.exports = {
    load: mysql_query,
    add: (tableName, entity) => mysql_query(`INSERT INTO ${tableName} SET ? `, entity) ,
    del: (tableName, condition) => mysql_query(`DELETE FROM ${tableName} WHERE ?`, condition),
    edit: (tableName, entity, condition) => mysql_query(`UPDATE ${tableName} SET ? WHERE ?`, [entity, condition])
};

