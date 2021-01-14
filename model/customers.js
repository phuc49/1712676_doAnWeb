const db = require("./db.js");

const TABLE = "customers";
const CustomerViewFields = [
  "name",
  "phone_number",
  "date_of_birth",
  "image",
];
const CartViewFields = ["updated_cart_date", "order_quantity", "total"];

module.exports = {
  getCustomer: (id) =>
    db.load(`SELECT ${CustomerViewFields} 
             FROM ${TABLE}
             WHERE id = '${id}'`),
  getCustomer: (id) =>
    db.load(`SELECT ${CustomerViewFields} 
             FROM ${TABLE}
             WHERE id = '${id}'`),
  edit: (entity, id) => db.edit("customers", entity, { id: id }),
  getFull: (id) => {
    return db.load(
      `SELECT *
       FROM customers
       WHERE id = ?`,
       id
    );
  },
};
