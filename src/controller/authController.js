'use strict';
// import module kết nối với cơ sở dữ liệu
const accountData = require('../data/account');
const roleData = require('../data/role');
const user_role = require('../data/user_role');
const utils = require('../utils/auth');

const getListAccount = async (req, res, next) => {
    try {
        const accounts = await accountData.getListAccount();
        res.send(accounts);
    } catch (err) {
        res.status(400).send(err.message); // trả về lỗi thì lấy dữ liệu thất bại
    }
}
const sigup = async (req, res, next) => {
    try {
        let data = {};
        data.username = req.body.username;
        data.password = req.body.password;
        if (!data.password || !data.username) {
            res.status(400).json({ message: 'Thiếu tên tài khoản hoặc mật khẩu' });
            return;
        }
        if (data.password.length < 8) {
            res.status(400).json({ message: 'Mật khẩu phải lơn hơn 8 ký tự' });
            return;
        }
        data.password = utils.hashCode(data.password);
        const newAccount = await accountData.createAccount(data);
        let addRole = true;
        if (newAccount.user_id) {
            req.body.roles.forEach(async (role_name) => {
                const role = await roleData.getByRoleName(role_name);
                const result = await user_role.addRole(role[0].role_id, newAccount.user_id);
                if (result.length == 0) {
                    addRole = false;
                    return;
                }
            });
            if (!addRole) {
                res.status(400).json({ message: "Add roles failure!" });
                return;
            }
            res.status(200).json({ message: 'signup successfully' });
        } else {
            res.status(400).json({ message: "signup failure" });
        }

    } catch (err) {
        res.status(400).send(err.message); // trả về lỗi thì lấy dữ liệu thất bại
    }
}
const signin = async (req, res, next) => {
    try {
        let data = {};
        data.username = req.body.username;
        data.password = req.body.password;
        if (!data.password || !data.username) {
            res.status(400).json({ message: 'Thiếu tên tài khoản hoặc mật khẩu' });
            return;
        }
        if (data.password.length < 8) {
            res.status(400).json({ message: 'Mật khẩu phải lơn hơn 8 ký tự' });
            return;
        }
        const user = await accountData.getByUsername(data.username);

        if (user.length > 0) {
            const passwordPassed = await utils.checkPassword(data.password, user[0].password);
            if (passwordPassed) {
                res.status(200).send({ token: utils.generateAccessToken({ username: user[0].username, user_id: user[0].user_id }) });
            } else {
                res.status(400).json({ message: 'Đăng nhập thất bại' });
                return;
            }
        } else {
            res.status(400).send({ message: 'Đăng nhập thất bại' });
        }
    } catch (err) {
        res.status(400).send(err.message);
    }
}
const updateAccount = async (req, res, next) => {
    try {
        let data = {};
        data.username = req.body.username;
        data.password = req.body.password;
        data.user_id = req.params.user_id;
        if (data.password == "" || data.password.length > 8) {
            const accounts = await accountData.updateAccount(data);
            res.send(accounts);
        } else {
            res.status(200).json({ message: 'mật khẩu  quá ngắn' });
        }

    } catch (err) {
        res.status(400).send(err.message); // trả về lỗi thì lấy dữ liệu thất bại
    }
}
const searchAccount = async (req, res, next) => {
    try {
        let text_search = req.query.text_search;
        console.log('====================================');
        console.log(req.query);
        console.log('====================================');
        const accounts = await accountData.searchAccount(text_search);
        res.send(accounts);
    } catch (err) {
        res.status(400).send(err.message); // trả về lỗi thì lấy dữ liệu thất bại
    }
}
module.exports = {
    getListAccount,
    updateAccount,
    searchAccount,
    sigup,
    signin
}