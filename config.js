'use strict';
const config = require('./contants');

module.exports = {
    port: config.PORT,
    host: config.HOST,
    url: config.HOST_URL,
    sqlServer: {
        server: config.SQL_SERVER,
        database: config.SQL_DATABASE,
        user: config.SQL_USER,
        password: config.SQL_PASSWORD,
        requestTimeout: 15000,
        options: {
            keepAlive: true,
            encrypt: true,
            enableArithAbort: true,
            trustedConnection: true,
        }
    },
    mysql:{
        user: config.MYSQL_USER,
        password: config.MYSQL_PASSWORD,
        database: config.MYSQL_DATABASE,
        host: config.MYSQL_HOST
    },
    token_secret: config.TOKEN_SECRET
}