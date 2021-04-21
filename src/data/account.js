'use strict';
const config = require('../../config');
const sql = require('mssql');

//ms sql server

const getListAccount = () => {
    let pool = new sql.ConnectionPool(config.sqlServer); // kết nối với csdl với các config đã làm ở file config
    return new Promise((resolve, reject) => {
        const query = "USE book_store;\
        SELECT * FROM dbo.account;"
        pool.connect().then(() => { // Tạo kết nối
            const request = new sql.Request(pool); // Tạo request
            request.query(query).then(res => { //Tiến hành query
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
const createAccount = (data) => {
    let pool = new sql.ConnectionPool(config.sqlServer);
    return new Promise((resolve, reject) => {
        const query = "USE book_store;\
        INSERT INTO dbo.account(username, password, email, first_name, last_name) VALUES (@username, @password, @email, @first_name, @last_name)\
        SELECT SCOPE_IDENTITY() AS user_id;";
        pool.connect().then(() => {
            const request = new sql.Request(pool);
            request
                .input('username', sql.NVarChar(255), data.username)
                .input('password', sql.NVarChar(255), data.password)
                .input('email', sql.NVarChar(255), data.email)
                .input('first_name', sql.NVarChar(255), data.first_name)
                .input('last_name', sql.NVarChar(255), data.last_name)
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
        const query = "USE book_store;\
        UPDATE dbo.account SET username = @username, password = @password WHERE user_id = @user_id\
        SELECT * FROM dbo.account WHERE user_id = @user_id";
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
        const query = "USE book_store;\
        SELECT * FROM dbo.account WHERE username = @text_search;"
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
const getByUsername = (username)  => {
    let pool = new sql.ConnectionPool(config.sqlServer); // kết nối với csdl với các config đã làm ở file config
    return new Promise((resolve, reject) => {
        const query = "USE book_store;\
        SELECT TOP 1 * FROM dbo.account WHERE username = @username;"
        pool.connect().then(() => { // Tạo kết nối
            const request = new sql.Request(pool); // Tạo request
            request
            .input('username', sql.NVarChar(255), username)
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
        const query = "USE book_store;\
        SELECT TOP 1 user_id FROM dbo.account WHERE username = @username;"
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

const existedEmail = (email)  => {
    let pool = new sql.ConnectionPool(config.sqlServer); // kết nối với csdl với các config đã làm ở file config
    return new Promise((resolve, reject) => {
        const query = "USE book_store;\
        SELECT TOP 1 user_id FROM dbo.account WHERE email = @email;"
        pool.connect().then(() => { // Tạo kết nối
            const request = new sql.Request(pool); // Tạo request
            request
            .input('email', sql.NVarChar(255), email)
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

const verifyAccount = (user_id) => {
    let pool = new sql.ConnectionPool(config.sqlServer);
    return new Promise((resolve, reject) => {
        const query = "USE book_store;\
        UPDATE dbo.account SET status = 1 WHERE user_id = @user_id\
        SELECT * FROM dbo.account WHERE user_id = @user_id";
        pool.connect().then(() => {
            const request = new sql.Request(pool);
            request
                .input('user_id', sql.Int, user_id)
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

module.exports = {
    getListAccount,
    updateAccount,
    searchAccount,
    createAccount,
    existedUser,
    getByUsername,
    existedEmail,
    verifyAccount
}