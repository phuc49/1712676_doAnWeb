const { query } = require("express");
const queryString = require("query-string");
const dateFormat = require("dateformat");

const model = require("../model/cart");
const customer = require("../model/customers");

const all = async (req, res, next) => {
  if (!req.user) {
    res.redirect("/login");
  }
  const dssp = await model.all(req.user.id)
  ///    "line_total"
  for(let i = 0; i < dssp.length; i++) {
    dssp[i].line_total = dssp[i].price * dssp[i].order_quantity;
  }
  const customers = await customer.getFull(req.user.id);

  res.render("cart", {title:"Giỏ hàng" ,dssp, customer: customers[0]});
};

const add = async (req, res, next) => {
  if (!req.user) {
    res.redirect("/login");
  }
  const dssp = await model.add(req.query);
  res.render("cart", { dssp });
};

module.exports = {
  all,
  add
};
