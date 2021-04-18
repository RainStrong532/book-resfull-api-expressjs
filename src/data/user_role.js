'use strict';
const config = require('../../config');
const sql = require('mssql');

const getRoleByUsername = (user_id)  => {
    let pool = new sql.ConnectionPool(config.sqlServer); // kết nối với csdl với các config đã làm ở file config
    return new Promise((resolve, reject) => {
        const query = "SELECT r.role_name, a.username\
        FROM account as a\nINNER JOIN user_role as ur\
        ON a.user_id = ur.user_id\
        INNER JOIN role as r\
        ON ur.role_id = r.role_id\
        WHERE a.user_id = @user_id;"
        pool.connect().then(() => { // Tạo kết nối
            const request = new sql.Request(pool); // Tạo request
            request
            .input('user_id', sql.Int, user_id)
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
const addRole = (role_id, user_id)  => {
    let pool = new sql.ConnectionPool(config.sqlServer); // kết nối với csdl với các config đã làm ở file config
    return new Promise((resolve, reject) => {
        const query = "INSERT INTO user_role(user_id, role_id) VALUES (@user_id, @role_id);\
        SELECT SCOPE_IDENTITY() AS user_role_id;"
        pool.connect().then(() => { // Tạo kết nối
            const request = new sql.Request(pool); // Tạo request
            request
            .input('user_id', sql.Int, user_id)
            .input('role_id', sql.Int, role_id)
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
module.exports = {
    getRoleByUsername,
    addRole
}