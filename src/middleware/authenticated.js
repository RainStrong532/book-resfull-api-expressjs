const jwt = require('jsonwebtoken');
const config = require('../../config');
const User = require('../data/account');
const User_Role = require('../data/user_role');
const { ROLES } = require('../../contants')

const authenticateToken = function (req, res, next) {
  const authHeader = req.headers['authorization']

  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.status(401).json({ message: "Token not found" })

  jwt.verify(token, config.token_secret, (err, user) => {
    if (err) return res.status(403).json(err)

    req.user = user

    next()
  })
}

const isVerify = (req, res, next) => {
  if(req.user.verify == 0) return res.status(400).json({message: "Tài khoản chưa được xác thực"});
  next();
};


const isAdmin = (req, res, next) => {
  User_Role.getRoleByUsername(req.user.user_id).then(roles => {
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].role_name === ROLES.admin) {
        next();
        return;
      }
    }

    res.status(403).json({
      message: `Require ${ROLES.admin} Role!`
    });
    return;
  });
};

const isManager = (req, res, next) => {
  User_Role.getRoleByUsername(req.user.user_id).then(roles => {
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].role_name === ROLES.manager) {
        next();
        return;
      }
    }

    res.status(403).json({
      message: `Require ${ROLES.manager} Role!`
    });
    return;
  });
};
const isMonitor = (req, res, next) => {
  User_Role.getRoleByUsername(req.user.user_id).then(roles => {
    for (let i = 0; i < roles.length; i++) {
      if (roles[i].role_name === ROLES.monitor) {
        next();
        return;
      }
    }

    res.status(403).json({
      message: `Require ${ROLES.monitor} Role!`
    });
    return;
  });
};
module.exports = {
  authenticateToken,
  isAdmin,
  isManager,
  isMonitor,
  isVerify
}