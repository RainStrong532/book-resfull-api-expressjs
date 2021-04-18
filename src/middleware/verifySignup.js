const User = require('../data/account');
const { ROLES } = require('../../contants');

checkDuplicateUsername = async (req, res, next) => {
    // Username
    const username = req.body.username;
    if (!username) {
        res.status(400).json({ message: 'Thiếu tên tài khoản' });
        return;
    }
    try {
        const isExisted = await User.existedUser(req.body.username);
        if (isExisted) {
            res.status(200).json({ message: "Tài khoản đã tồn tại" });
            return;
        } else {
            next();
        }
    } catch (err) {
        res.status(400).json(err);
        return;
    }
};

checkRolesExisted = (req, res, next) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!ROLES[req.body.roles[i]]) {
                res.status(400).json({
                    message: "Failed! Role does not exist = " + req.body.roles[i]
                });
                return;
            }
        }
    }else{
        res.status(400).json({
            message: "Role is required!"
        });
        return;
    }
    next();
};

const verifySignUp = {
    checkDuplicateUsername,
    checkRolesExisted
};

module.exports = verifySignUp;