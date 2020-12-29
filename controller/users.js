const { query } = require("express");
const queryString = require('query-string');
const bcrypt = require('bcrypt');
var crypto = require("crypto");

const model = require("../model/users");
const helper = require("../helper/helper");
const { use } = require("passport");

exports.register = async (req, res, next) => {
    let user = await model.findUser(req.body.email);
    let msg = "";
    if(user.length > 0){
        msg = "tên đăng nhập đã tồn tại";
        res.render("register", {e: "tên đăng nhập đã tồn tại"});
        return;
    }

    const saltRounds = 10;
    req.body.password = bcrypt.hashSync(req.body.password, saltRounds);

    req.body.created_date = helper.getCurrentDate();
    req.body.verified_code = crypto.randomBytes(25).toString('hex')  //Math.floor((Math.random() * 100) + 54);
console.log(req.body);
    user = await model.addUser(req.body);

    req.body.id=user.insertId;
    helper.sendVerifiedMail(req.body);

    res.render("register", {user});
};
  

exports.verify = async (req,res,next) => {
    const id = +req.query.id || -1;
    let user = await model.getUser(id);

    if (!user) {
        //return done(null, false, { message: 'Người dùng không tồn tại' });
    }
    let newUser = { status: 2, verified_code: null };
    if(user[0].verified_code == req.query.code)
    {
        model.edit(newUser, id).then(() => {
            res.redirect("/");
        })
    }
}