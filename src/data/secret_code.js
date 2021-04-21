'use strict';
const config = require('../../config');
const sql = require('mssql');

const createSecretCode = (data, timeExpried) => {
    let pool = new sql.ConnectionPool(config.sqlServer); // kết nối với csdl với các config đã làm ở file config
    return new Promise((resolve, reject) => {
        const query = "USE book_store;\
        INSERT INTO dbo.secret_code(code, user_id, expried_time) VALUES (@code, @user_id, dateadd(MINUTE, @time, GETDATE()));"
        pool.connect().then(() => { // Tạo kết nối
            const request = new sql.Request(pool); // Tạo request
            request
                .input('user_id', sql.Int, data.user_id)
                .input('code', sql.VarChar(10), data.code)
                .input('time', sql.Int, timeExpried)
                .query(query).then(res => { //Tiến hành query
                    pool.close(); //Đóng kết nối
                    resolve(recordset.recordset)
                }).catch(err => {
                    pool.close(); //Đóng kết nối
                    reject(err); //Trả về lỗi khi query thất bại
                })
        }).catch(err => {
            reject(err); //Trả về lỗi khi kết nối với cơ sở dữ liệu thất bại
        })
    })
}

const updateSecretCode = (data, timeExpried) => {
    let pool = new sql.ConnectionPool(config.sqlServer);
    return new Promise((resolve, reject) => {
        const query = "USE book_store;\
        UPDATE dbo.secret_code SET code = @code, update_date = GETDATE(), expried_time= dateadd(MINUTE, @time, GETDATE())\
        WHERE user_id = @user_id;\
        SELECT TOP 1 * FROM dbo.secret_code WHERE user_id = @user_id";
        pool.connect().then(() => {
            const request = new sql.Request(pool);
            request
                .input('code', sql.VarChar(10), data.code)
                .input('user_id', sql.Int, data.user_id)
                .input('time', sql.Int, timeExpried)
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

const verifySecretCode = (user_id) => {
    let pool = new sql.ConnectionPool(config.sqlServer);
    return new Promise((resolve, reject) => {
        const query = "USE book_store;\
        UPDATE dbo.secret_code SET verify_date = GETDATE()\
        WHERE user_id = @user_id AND expried_time >= GETDATE()\
        SELECT TOP 1 * FROM dbo.secret_code WHERE user_id = @user_id AND expried_time >= GETDATE()";
        pool.connect().then(() => {
            const request = new sql.Request(pool);
            request
                .input('user_id', sql.Int, user_id)
                .query(query).then(recordset => {
                    pool.close();
                    resolve(recordset.recordset.length == 1)
                }).catch(err => {
                    pool.close();
                    reject(err);
                })
        }).catch(err => {
            reject(err);
        })
    })
}
const getByUserId = (user_id) => {
    let pool = new sql.ConnectionPool(config.sqlServer); // kết nối với csdl với các config đã làm ở file config
    return new Promise((resolve, reject) => {
        const query = "USE book_store;\
        SELECT TOP 1 * FROM dbo.secret_code WHERE user_id = @user_id;"
        pool.connect().then(() => { // Tạo kết nối
            const request = new sql.Request(pool); // Tạo request
            request
                .input('user_id', sql.Int, user_id)
                .query(query).then(res => { //Tiến hành query
                    pool.close(); //Đóng kết nối
                    resolve(res.recordset[0])
                }).catch(err => {
                    pool.close(); //Đóng kết nối
                    reject(err); //Trả về lỗi khi query thất bại
                })
        }).catch(err => {
            reject(err); //Trả về lỗi khi kết nối với cơ sở dữ liệu thất bại
        })
    })
}

const existedSecretCode = (user_id) => {
    let pool = new sql.ConnectionPool(config.sqlServer); // kết nối với csdl với các config đã làm ở file config
    return new Promise((resolve, reject) => {
        const query = "USE book_store;\
        SELECT TOP 1 * FROM dbo.secret_code WHERE user_id = @user_id;"
        pool.connect().then(() => { // Tạo kết nối
            const request = new sql.Request(pool); // Tạo request
            request
                .input('user_id', sql.Int, user_id)
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
    createSecretCode,
    updateSecretCode,
    verifySecretCode,
    getByUserId,
    existedSecretCode
}