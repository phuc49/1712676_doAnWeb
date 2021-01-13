const db = require("./db.js");

const TABLE = "comments cmt LEFT JOIN customers c ON cmt.customer_id = c.id";
const viewFields = [
    "cmt.customer_id customer_id",
    "cmt.product_id product_id",
    "cmt.content content",
    "cmt.customer_name customer_name",
    "c.name name",
    "c.image image"
];


module.exports = {  
    all: (offset, limit, product_id) => {
      return db.load(
        `SELECT ${viewFields}
         FROM ${TABLE}
         WHERE product_id = ?
         ORDER BY cmt.id 
         LIMIT ?,?`,[product_id, offset * limit, limit]
      );
    },
    
    count: (product_id) => {
        return db.load(
          `SELECT COUNT(cmt.id) AS sl
           FROM ${TABLE}
           WHERE product_id = ?`
           ,product_id
        );
      },
      add: (entity) => db.add("comments", entity)
  };
  
