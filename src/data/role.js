'use strict';
const config = require('../../config');
const sql = require('mssql');

const getByRoleName = (role_name)  => {
    let pool = new sql.ConnectionPool(config.sqlServer); // kết nối với csdl với các config đã làm ở file config
    return new Promise((resolve, reject) => {
        const query = "USE book_store;\
        SELECT TOP 1 * FROM dbo.role WHERE role_name = @role_name;"
        pool.connect().then(() => { // Tạo kết nối
            const request = new sql.Request(pool); // Tạo request
            request
            .input('role_name', sql.NVarChar(20), role_name)
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
    getByRoleName
}