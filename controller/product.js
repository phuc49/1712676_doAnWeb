const { query } = require("express");
const queryString = require("query-string");
const dateFormat = require("dateformat");

const model = require("../model/product");
const loai = require("../model/category");
const comments = require("../model/comment");

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

  const page = +req.query.page || 1;
  const limit = +req.query.page_size || 5;
  const count = await comments.count(req.params.product_id);
  const len = Math.ceil((count[0].sl)/limit);

  const pageList = [];
  for (let i = page - 1; i <= Math.min(page + 1, len) ; i++) {
    if (i > 0) pageList.push({ page: i, active: i === page });
  }

  const cmt = await comments.all( page - 1, limit, req.params.product_id ) 

  for (let i = 0; i < cmt.length; i++){
    if(cmt[i].customer_id == null) cmt[i].name = cmt[i].customer_name;
    dateFormat.masks.hammerTime = "dd-mm-yyyy";
    cmt[i].created_date = dateFormat(cmt[i].created_date,"hammerTime");
  }

  res.render("sp", {p: product[0], cmt,page, pageList, len});
};

const addCmt = async (req, res, next) => {
  if(req.user) {
    req.body.customer_id = req.user.id;
    delete req.body.customer_name;
  }
  req.body.product_id = req.params.product_id;
  const cmt = await comments.add(req.body);

  res.redirect("/product/" + req.body.product_id);
}

module.exports = {
  all,
  index,
  singleID,
  addCmt
};
