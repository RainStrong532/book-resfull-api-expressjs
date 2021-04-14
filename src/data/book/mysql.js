'use strict';
const config = require('../../../config');
const sql = require('mysql');

//Mysql

const getListBook = function () {
    return new Promise(function(resolve, reject){
        try {
            let con = sql.createConnection(config.mysql);
            const query = "SELECT * FROM book_store.book;";
            con.beginTransaction(function (err) {
                if (err) { reject(err) }
                con.query(query, [], function (err, result) {
                    if (err) {
                        con.rollback(function (err) {
                            con.end();
                            reject(err)
                        });
                    }
                    con.commit(function (err) {
                        if (err) {
                            con.rollback(function (err) {
                                con.end();
                                reject(err)
                            });
                        }
                        con.end();
                        resolve(result);
                    });
                });
            });
        } catch (err) {
            reject(err)
        }
    })
}

const getBookById = function (id) {
    return new Promise(function(resolve, reject){
        try {
            let con = sql.createConnection(config.mysql);
            const query = "SELECT * FROM book_store.book WHERE book_id = ?;";
            con.beginTransaction(function (err) {
                if (err) { reject(err) }
                con.query(query, [id ],function (err, result) {
                    if (err) {
                        con.rollback(function (err) {
                            con.end();
                            reject(err)
                        });
                    }
                    con.commit(function (err) {
                        if (err) {
                            con.rollback(function (err) {
                                con.end();
                                reject(err)
                            });
                        }
                        con.end();
                        resolve(result);
                    });
                });
            });
        } catch (err) {
            reject(err)
        }
    })
}

// const getListBook = async () => {
//     try {
//         let con = sql.createConnection(config.mysql);
//         const query = "USE book_store;\nSELECT * FROM dbo.book;";
//         con.
//         con.connect(function (err) {
//             if (err) throw err;
//             con.query(query, function (err, results) {
//                 if (err) throw err;
//                 return results;
//             })
//         });
//     } catch (err) {
//         return err;
//     }
// }

module.exports = {
    getListBook,
    getBookById
}
