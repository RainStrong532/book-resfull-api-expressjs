const jwt = require('jsonwebtoken');
const config = require('../../config')

const authenticateToken = function (req, res, next) {
    const authHeader = req.headers['authorization']
    
    const token = authHeader && authHeader.split(' ')[1];

    console.log('====================================');
    console.log(authHeader, "authHeader", token);
    console.log('====================================');

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, config.token_secret, (err, user) => {
        console.log(err)

        if (err) return res.sendStatus(403)

        req.user = user

        next()
    })
}

module.exports = {
    authenticateToken
}