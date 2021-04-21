'use strict';
const secretCodeData = require('../data/secret_code');
const accountData = require('../data/account');
const config = require('../../config');
const nodemailer = require("nodemailer");

const defaultExpried = 2

const smtpTransport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: config.mail.user,
        pass: config.mail.pass,
    }
});

const sendMail = async (req, res, next) => {
    try {
        let user_id = req.body.user_id;
        if (!user_id) {
            return res.status(400).json({ message: "user_id is required" });
        }
        let rand = Math.floor((Math.random() * 8999) + 1000);
        rand = rand.toString();
        const link = config.url + "/api/secrets/verify?id=" + rand + "&user_id=" + user_id;
        const isExisted = await secretCodeData.existedSecretCode(user_id);
        if (isExisted) {
            await secretCodeData.updateSecretCode({ code: rand, user_id: user_id }, defaultExpried);
        } else {
            await secretCodeData.createSecretCode({ code: rand, user_id: user_id }, defaultExpried);
        }
        const mailOptions = {
            to: req.body.email,
            subject: "Please confirm your Email account",
            html: "Hello,<br> Please Click on the link to verify your email.<br><a href=" + link + ">Click here to verify</a>\
            <br>\
            <h3>Your link will be exprired after 10 minutes</h3>\
            "
        }
        smtpTransport.sendMail(mailOptions, function (error, response) {
            if (error) {
                console.log(error);
                res.end("error");
            } else {
                res.end("sent");
            }
        });
    } catch (err) {
        res.status(400).send(err.message); // trả về lỗi thì lấy dữ liệu thất bại
    }
}

const getSecretCodeByUserId = async (req, res, next) => {
    try {
        const user_id = req.query.user_id;
        if (!user_id) {
            return res.status(400).json({ message: "user_id is required" });
        }
        const secretCode = await secretCodeData.getByUserId(user_id);
        if (secretCode.code.length > 0)
            res.send(secretCode);
        else return res.status(400).json({ message: "Not found" });
    } catch (err) {
        res.status(400).send(err.message); // trả về lỗi thì lấy dữ liệu thất bại
    }
}

const verify = async function (req, res) {
    if ((req.protocol + "://" + req.get('host')) == ("http://" + req.get('host'))) {
        let user_id = req.query.user_id;
        if (!user_id) {
            return res.status(400).json({ message: "url is not valid" });
        }
        user_id = parseInt(user_id);
        const secretCode = await secretCodeData.getByUserId(user_id);
        if (req.query.id == secretCode.code) {
            const result = await secretCodeData.verifySecretCode(user_id);
            if(!result) return res.render("verify/failure", {error: "The link has been expried"});
            await accountData.verifyAccount(user_id);
            return res.render("verify/index");
        }
        else {
            return res.end("<h1>Bad request</h1>")
        }
    }
    else {
        res.end("<h1>Request is from unknown source</h1>");
    }
}

module.exports = {
    getSecretCodeByUserId,
    sendMail,
    verify
}