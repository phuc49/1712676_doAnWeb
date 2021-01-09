const bcrypt = require('bcrypt');

const db = require("./db.js");

const TABLE = "users";
const viewFields = [
    "id",
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
    edit: (entity, id) => db.edit("users", entity, {id: id}),
    checkCredential: async (username, password) => {
        const user = await db.load(`SELECT id, email, password, status
                                    FROM ${TABLE}
                                    WHERE email = ?`, username);

        if(!user || user.length == 0) return false;

        let checkPassword = await bcrypt.compare(password, user[0].password);
        if(checkPassword) return user[0];
        return false;
    }
};
  
  




