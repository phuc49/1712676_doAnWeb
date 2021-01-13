const nodemailer = require("nodemailer");
require('dotenv').config();



module.exports = {
    buildCondition: (condition,params,bt,field)=>{
        if(field){
            condition+=bt;
            params.push(field); 
        }
        return condition;
    }, 

    getCurrentDate: () =>{
        let today = new Date();
        let m = today.getMonth() + 1;
        return (today.getFullYear() + '-' + m + '-' + today.getDate()); 
    },

    sendVerifiedMail: (user) =>{
        var smtpTransport = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.gmail_username,
                pass: process.env.gmail_password
            }
        });

        link=process.env.HOST + ":" + process.env.PORT +"/users/verify?id=" + user.id + "&code=" + user.verified_code;
        mailOptions={
            to : user.email,
            subject : "Xác thực email",
            html : "Xin chào quý khách,<br> Quý khách vui lòng click vào link sau để xác thực tài khoản.<br><a href="+link+">Click vào đây</a>"
        }
        smtpTransport.sendMail(mailOptions);
    },
    sendChangePwMail: (user) =>{
        var smtpTransport = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.gmail_username,
                pass: process.env.gmail_password
            }
        });

        link=process.env.HOST + ":" + process.env.PORT +"/users/change-password?id=" + user.id + "&code=" + user.verified_code;
        mailOptions={
            to : user.email,
            subject : "Khôi phục mật khẩu",
            html : "Xin chào quý khách,<br> Quý khách vui lòng click vào link sau để khôi phục mật khẩu.<br><a href="+link+">Click vào đây</a>"
        }
        smtpTransport.sendMail(mailOptions);
    }
}