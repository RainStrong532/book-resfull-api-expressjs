'use strict';
const config = require('../../config');
const sql = require('mysql');

//Mysql

const getListBook = async () => {
    return new Promise((resolve, reject)=> {
        try {
            let con = sql.createConnection(config.mysql);// tạo kết nối tới mysql với config của mysql đã tạo trước đó
            const query = "SELECT * FROM book;";
            con.connect(function (err) {
                if (err) reject(err) ;
                con.query(query,[], function (err, results) {// [] dùng để truyền biến vào query VD query = “... WHERE id = ?” thì dùng biến id truyền vào như sau [id]. Có code mẫu trong source code ở dưới cùng
                    if (err) reject(err) ;
                    resolve(results);
                })
            });
        } catch (err) {
            reject(err) ;
        }
    })
}

const getBookById = async (id) => {
    return new Promise((resolve, reject)=> {
        try {
            let con = sql.createConnection(config.mysql);
            const query = "SELECT * FROM book WHERE book_id = ?;";
            con.connect(function (err) {
                if (err) reject(err) ;
                con.query(query,[id], function (err, results) {
                    if (err) reject(err) ;
                    resolve(results);
                })
            });
        } catch (err) {
            reject(err) ;
        }
    })
}


module.exports = {
    getListBook,
    getBookById
}
