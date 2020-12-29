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
        return (today.getFullYear() + '-' + today.getMonth() + '-' + today.getDate()); 
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
            subject : "Please confirm your Email account",
            html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>"
        }
        smtpTransport.sendMail(mailOptions);
    },

    // getVerifiedCode: () => {
    //     const num = Math.floor(Math.random() * 100);

    // }
}