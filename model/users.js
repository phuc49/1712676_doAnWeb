const db = require("./db.js");

const TABLE = "users";
const viewFields = [
    "email", 
    "password", 
    "role", 
    "created_date", 
    "status", 
    "verified_code"
];

module.exports = {
    findUser: (email) => db.load(`SELECT ${viewFields}
                                  FROM ${TABLE}
                                  WHERE email = '${email}'`),
    getUser: (id) => db.load(`SELECT ${viewFields} 
                              FROM ${TABLE}
                              WHERE id = '${id}'`),
    addUser: (entity) => db.add("users", entity),
    edit: (entity, id) => db.edit("users", entity, {id: id})
};
  
  




