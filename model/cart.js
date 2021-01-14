const db = require("./db.js");

const TABLE = "cart_detail c JOIN products p ON p.id = c.product_id";
const viewFields = [
    "c.id id",
    "customer_id",
    "product_id",
    "order_quantity",
    "c.created_date created_date",
    "name",
    "price",
    "image"
];


module.exports = {      
    all: (id) => {
        return db.load(
          `SELECT ${viewFields}
           FROM ${TABLE}
           WHERE customer_id = ?
           ORDER BY c.id DESC`
           ,id
        );
      },
      add: (entity) => db.add("cart_detail", entity),
      edit: (entity, id) => db.edit("cart_detail", entity, { id: id }),
      del: (id) => db.add("cart_detail", { id: id })
  };
  
