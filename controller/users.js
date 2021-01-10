const { query } = require("express");
const queryString = require("query-string");
const bcrypt = require("bcrypt");
var crypto = require("crypto");

const model = require("../model/users");
const helper = require("../helper/helper");
const { use } = require("passport");

const register = async (req, res, next) => {
  let user = await model.findUser(req.body.email);
  if (user.length > 0) {
    res.render("register", { e: "tên đăng nhập đã tồn tại" });
    return;
  }

  const saltRounds = 10;
  req.body.password = bcrypt.hashSync(req.body.password, saltRounds);

  //req.body.created_date = helper.getCurrentDate();
  req.body.verified_code = crypto.randomBytes(25).toString("hex"); //Math.floor((Math.random() * 100) + 54);

  user = await model.addUser(req.body);
  console.log(req.body);
  req.body.id = user.insertId;
  helper.sendVerifiedMail(req.body);

  res.render("register", { user });
};

const verify = async (req, res, next) => {
  const id = +req.query.id || -1;
  let user = await model.getUser(id);

  //   if (!user) {
  //     //
  //   }
  let newUser = { status: 2, verified_code: null };
  if (user[0].verified_code == req.query.code) {
    model.edit(newUser, id).then(() => {
      res.redirect("/");
    });
  }
};

const editAccount = async (req, res, next) => {
  console.log(req.body);
  if (!req.user) {
    res.redirect("/login");
  }
  let checkPassword = await bcrypt.compare(
    req.body.password,
    req.user.password
  );
  if (!checkPassword) {
    res.render("user-account", { error: "Mật khẩu không chính xác" });
    return;
  }

  const saltRounds = 10;
  const password = bcrypt.hashSync(req.body.new_password, saltRounds);

  model.edit({ password }, req.user.id).then(() => {
    res.redirect("/");
  });
};

const editAccountView = async (req, res, next) => {
  if (!req.user) {
    res.redirect("/login");
  }
  res.render("user-account", { email: req.user.email });
};

const forgetPw = async (req, res, next) => {
  let user = await model.findUser(req.body.email);
  if (!user) {
    res.render("forget-password", { e: "tên đăng nhập không tồn tại" });
    return;
  }
  const verified_code = crypto.randomBytes(25).toString("hex");
  await model.edit({ verified_code }, user[0].id);
  user[0].verified_code = verified_code;
  helper.sendChangePwMail(user[0]);

  res.render("index", { user });
};

// const changePwView = async (req, res, next) => {
//   let q = "?id=" + req.query.id + "&code=" + req.query.code;
//   res.render("user-change-pw", { q });
// };

const changePassword = async (req, res, next) => {
  const id = +req.query.id || -1;
  let user = await model.getUser(id);

  const saltRounds = 10;
  const password = bcrypt.hashSync(req.body.password, saltRounds);

  if (user[0].verified_code != req.query.code) {
    res.render("user-change-pw", { error: "Link khôi phục không chính xác" });
    return;
  }
  
  model.edit({ password, verified_code: null }, id).then(() => {
    res.redirect("/login");
  });
};

module.exports = {
  register,
  verify,
  editAccount,
  editAccountView,
  forgetPw,
  //changePwView,
  changePassword,
};
