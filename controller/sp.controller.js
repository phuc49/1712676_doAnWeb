const model = require("../model/sp.model");
const loai = require("../model/loai.model");

//const { param } = require('../routes/index.route');

exports.index = async (req, res, next) => {
  const dssp = await model.all();
  res.render("index", { dssp });
};

exports.all = async (req, res, next) => {
  const page = +req.query.page || 1;
  const limit = +req.query.page_size || 12;
  const count = await model.count();
  const len = Math.ceil((count[0].sl)/limit);
  console.log(len);

  const pageList = [];
  for (let i = page - 1; i <= Math.min(page + 1, len) ; i++) {
    if (i > 0) pageList.push({ page: i, active: i === page });
  }

  const dssp = await model.allByPage(page-1, limit);
  const dsl = await loai.all();
  res.render("dssp", { dssp, page, pageList, len, dsl });
};

exports.singleID = async (req, res, next) => {
  const sp = await model.singleID(req.params.ma_sp);
  res.render("sp", sp[0]);
};

exports.allByName = async (req, res, next) => {
  const page = +req.query.page || 1;
  const limit = +req.query.page_size || 12;
  const count = await model.countByName(req.body.ten);
  const len = Math.ceil((count[0].sl)/limit);
  

  const pageList = [];
  for (let i = page - 1; i <= Math.min(page + 1, len) ; i++) {
    if (i > 0) pageList.push({ page: i, active: i === page });
  }

  const dssp = await model.allByName(req.body.ten, page-1, limit);
  const dsl = await loai.all();
  res.render("dssp", { dssp, page, pageList, len, dsl });
};
