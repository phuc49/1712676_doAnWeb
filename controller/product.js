const { query } = require("express");
const queryString = require("query-string");

const model = require("../model/product");
const loai = require("../model/category");

//const { param } = require('../routes/index.route');

const index = async (req, res, next) => {
  const dssp = await model.top();
  res.render("index", { dssp });
};



const all = async (req, res, next) => {
  let qs = { ...req.query };
  //const q = queryString.stringify(qs);
  /// phân trang
  let page = +req.query.page || 1;
  const limit = +req.query.page_size || 12;
  const { category: category_id, name, price, discount, orderBy } = req.query;

  const count = await model.count({ category_id, name, price, discount });
  lastPage = Math.ceil(count[0].sl / limit);
  qs.page = lastPage;
  const lastPageQs = queryString.stringify(qs);

  const pageList = [];
  page = Math.min(lastPage, page);
  page = Math.max(1, page);
  for (let i = Math.max(1, page - 1); i <= Math.min(page + 1, lastPage); i++) {
    qs.page = i;
    pageList.push({
      qs: queryString.stringify(qs),
      active: i === page,
      page: i,
    });
  }

  delete qs.page;
  delete qs.orderBy;
  const dssp = await model.all(page - 1, limit, {
    category_id,
    name,
    price,
    discount,
    orderBy 
  });
  const dsl = await loai.all();
  res.render("dssp", {
    dssp,
    pageList,
    lastPageQs,
    dsl,
    qs: queryString.stringify(qs)
  });
};
const singleID = async (req, res, next) => {
  const product = await model.singleID(req.params.product_id);
  res.render("sp", product[0]);
};

module.exports = {
  all,
  index,
  singleID,
};
