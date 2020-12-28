const { query } = require("express");
const queryString = require('query-string');
const bcrypt = require('bcrypt');

const model = require("../model/customer");

exports.register = async (req, res, next) => {
    let user = await model.findUser(req.body.email);
    let msg = "";
    if(user.length > 0){
        msg = "tên đăng nhập đã tồn tại";
        res.render("register", {e: "tên đăng nhập đã tồn tại"});
        return;
    }
    let today = new Date();
    req.body.created_date = today.getFullYear() + '-' + today.getMonth() + '-' + today.getDate();
    const saltRounds = 10;
    req.body.password = bcrypt.hashSync(req.body.password, saltRounds);
    console.log(req.body);
    user = await model.addUser(req.body);
    res.render("register", {user});
};
  