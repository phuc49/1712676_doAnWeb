const { buildCondition } = require("../helper/helper.js");
const db = require("./db.js");

const TABLE = "products p JOIN category c ON p.category_id = c.id";
const viewFields = [
  "p.id as product_id",
  "p.name as product_name",
  "p.price",
  "p.inventory_quantity",
  "p.description",
  "p.discount",
  "p.image",
  "c.id as category_id",
  "c.name as category_name",
];

module.exports = {
  singleID: (productId) =>
    db.load(
      `SELECT ${viewFields} 
             FROM ${TABLE}
             WHERE p.id = ?`,
      [productId]
    ),
  top: () =>
    db.load(`SELECT ${viewFields}
             FROM ${TABLE}
             ORDER BY buys DESC
             LIMIT 20 `),
  all: (offset, limit, { name, category_id, price }) => {
    let condition = "";
    let params = [];
    if (name) {
      condition = buildCondition(
        condition,
        params,
        ` AND p.name LIKE ?`,
        `%${name}%`
      );
    }
    condition = buildCondition(
      condition,
      params,
      ` AND category_id = ?`,
      category_id
    );
    condition = buildCondition(condition, params, ` AND price <= ?`, price);

    console.log(offset,limit)
    params.push(offset * limit, limit);

    return db.load(
      `SELECT ${viewFields}
       FROM ${TABLE}
       WHERE 1 = 1 ${condition}
       LIMIT ?,?`,
      params
    );
  },
  count: ({ name, category_id, price }) => {
    let condition = "";
    let params = [];
    if (name) {
      condition = buildCondition(
        condition,
        params,
        ` AND p.name LIKE ? `,
        `%${name}%`
      );
    }
    condition = buildCondition(
      condition,
      params,
      ` AND category_id = ?`,
      category_id
    );
    condition = buildCondition(condition, params, ` AND price <= ?`, price);

    return db.load(
      `SELECT COUNT(*) AS sl 
                    FROM products p WHERE 1=1  ${condition}`,
      params
    );
  },
  // allByCategory: (category, offset,limit)=>db.load(`SELECT ${viewFields}
  //                                                   FROM ${TABLE}
  //                                                   WHERE  p.category_id = ${category}
  //                                                   LIMIT ?,?`,[offset * limit, limit]),
  // countByCategory: (category) => db.load(`SELECT COUNT(*) AS sl FROM products WHERE id = ${category}`),
  // allByName: (productName, offset,limit)=>db.load(`SELECT ${viewFields}
  //                                                  FROM ${TABLE}
  //                                                  WHERE p.name LIKE '%${productName}%'
  //                                                  LIMIT ?,?`,[offset * limit, limit]),
  // countByName: (productName) => db.load(`SELECT COUNT(*) AS sl FROM products WHERE name LIKE '%${productName}%'`)
};
