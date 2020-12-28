const db = require("./db.js");

module.exports = {
    findUser: (email) => db.load(`SELECT * 
                                     FROM users
                                     WHERE email = '${email}'`),
    addUser: (entity) => db.add("users", entity),
};
  
  




