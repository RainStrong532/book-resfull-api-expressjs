'use strict';
const config = require('../../config');
const sql = require('mssql');

//ms sql server

const getListAccount = () => {
    let pool = new sql.ConnectionPool(config.sqlServer); // kết nối với csdl với các config đã làm ở file config
    return new Promise((resolve, reject) => {
        const query = "USE book_store;\nSELECT * FROM dbo.account;"
        pool.connect().then(() => { // Tạo kết nối
            const request = new sql.Request(pool); // Tạo request
            request.query(query).then(res => { //Tiến hành query
                pool.close(); //Đóng kết nối
                console.log('====================================');
                console.log(res);
                console.log('====================================');
                resolve(res.recordset) // trả về dữ liệu lấy được
            }).catch(err => {
                pool.close(); //Đóng kết nối
                reject(err); //Trả về lỗi khi query thất bại
            })
        }).catch(err => {
            reject(err); //Trả về lỗi khi kết nối với cơ sở dữ liệu thất bại
        })
    })
}
const signup = (data) => {
    let pool = new sql.ConnectionPool(config.sqlServer);
    return new Promise((resolve, reject) => {
        const query = "USE book_store;\INSERT INTO dbo.account(username, password) VALUES (@username, @password)\nSELECT SCOPE_IDENTITY() AS user_id;";
        pool.connect().then(() => {
            const request = new sql.Request(pool);
            request
                .input('username', sql.NVarChar(255), data.username)
                .input('password', sql.NVarChar(255), data.password)
                .query(query).then(recordset => {
                    pool.close();
                    resolve(recordset.recordset[0])
                }).catch(err => {
                    pool.close();
                    reject(err);
                })
        }).catch(err => {
            reject(err);
        })
    })
}
const updateAccount = (data) => {
    let pool = new sql.ConnectionPool(config.sqlServer);
    return new Promise((resolve, reject) => {
        const query = "USE book_store;\nUPDATE dbo.account SET username = @username, password = @password WHERE user_id = @user_id\nSELECT * FROM dbo.account WHERE user_id = @user_id";
        pool.connect().then(() => {
            const request = new sql.Request(pool);
            request
                .input('username', sql.NVarChar(255), data.username)
                .input('password', sql.NVarChar(255), data.password)
                .input('user_id', sql.Int, data.user_id)
                .query(query).then(recordset => {
                    pool.close();
                    resolve(recordset.recordset[0])
                }).catch(err => {
                    pool.close();
                    reject(err);
                })
        }).catch(err => {
            reject(err);
        })
    })
}

const searchAccount = (text_search) => {
    let pool = new sql.ConnectionPool(config.sqlServer); // kết nối với csdl với các config đã làm ở file config
    return new Promise((resolve, reject) => {
        const query = "USE book_store;\nSELECT * FROM dbo.account WHERE username = @text_search;"
        pool.connect().then(() => { // Tạo kết nối
            const request = new sql.Request(pool); // Tạo request
            request
                .input('text_search', sql.NVarChar(255), text_search)
                .query(query)
                .then(res => { //Tiến hành query
                    pool.close(); //Đóng kết nối
                    resolve(res.recordset) // trả về dữ liệu lấy được
                }).catch(err => {
                    pool.close(); //Đóng kết nối
                    reject(err); //Trả về lỗi khi query thất bại
                })
        }).catch(err => {
            reject(err); //Trả về lỗi khi kết nối với cơ sở dữ liệu thất bại
        })
    })
}
const signin = (data)  => {
    let pool = new sql.ConnectionPool(config.sqlServer); // kết nối với csdl với các config đã làm ở file config
    return new Promise((resolve, reject) => {
        const query = "USE book_store;\nSELECT TOP 1 * FROM dbo.account WHERE username = @username;"
        pool.connect().then(() => { // Tạo kết nối
            const request = new sql.Request(pool); // Tạo request
            request
            .input('username', sql.NVarChar(255), data.username)
            .query(query).then(res => { //Tiến hành query
                pool.close(); //Đóng kết nối
                resolve(res.recordset)
            }).catch(err => {
                pool.close(); //Đóng kết nối
                reject(err); //Trả về lỗi khi query thất bại
            })
        }).catch(err => {
            reject(err); //Trả về lỗi khi kết nối với cơ sở dữ liệu thất bại
        })
    })
}
const existedUser = (username)  => {
    let pool = new sql.ConnectionPool(config.sqlServer); // kết nối với csdl với các config đã làm ở file config
    return new Promise((resolve, reject) => {
        const query = "USE book_store;\nSELECT TOP 1 user_id FROM dbo.account WHERE username = @username;"
        pool.connect().then(() => { // Tạo kết nối
            const request = new sql.Request(pool); // Tạo request
            request
            .input('username', sql.NVarChar(255), username)
            .query(query).then(res => { //Tiến hành query
                pool.close(); //Đóng kết nối
                resolve(res.recordset.length == 1)
            }).catch(err => {
                pool.close(); //Đóng kết nối
                reject(err); //Trả về lỗi khi query thất bại
            })
        }).catch(err => {
            reject(err); //Trả về lỗi khi kết nối với cơ sở dữ liệu thất bại
        })
    })
}
module.exports = {
    getListAccount,
    updateAccount,
    searchAccount,
    signup,
    existedUser,
    signin
}