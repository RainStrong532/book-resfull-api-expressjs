'use strict';
const config = require('../../config');
const sql = require('mssql');

//ms sql server

const getListBook = () => {
    let pool = new sql.ConnectionPool(config.sqlServer); // kết nối với csdl với các config đã làm ở file config
    return new Promise((resolve, reject) => {
        const query = "USE book_store;\nSELECT * FROM dbo.book;" // Lệnh query lấy danh sách book trong csdl
        pool.connect().then(() => { // Tạo kết nối
            const request = new sql.Request(pool); // Tạo request
            request.query(query).then(recordset => { //Tiến hành query
                pool.close(); //Đóng kết nối
                resolve(recordset.recordset) // trả về dữ liệu lấy được
            }).catch(err => {
                pool.close(); //Đóng kết nối
                reject(err); //Trả về lỗi khi query thất bại
            })
        }).catch(err => {
            reject(err); //Trả về lỗi khi kết nối với cơ sở dữ liệu thất bại
        })
    })
}

const getBookById = (id) => {
    let pool = new sql.ConnectionPool(config.sqlServer);
    return new Promise((resolve, reject) => {
        const query = "USE book_store;\nSELECT * FROM dbo.book WHERE book_id = @book_id;";
        pool.connect().then(() => {
            const request = new sql.Request(pool);
            request
            .input('book_id', sql.Int, id) // Truyền tham số vào query: tham số nhất là @book_id, thứ 2 là kiểu, thứ 3 là biến truyền vào
            .query(query).then(recordset => {
                pool.close();
                resolve(recordset.recordset) // Trả về một mảng các book
            }).catch(err => {
                pool.close();
                reject(err);
            })
        }).catch(err => {
            reject(err);
        })
    })
}

const createBook = (data) => {
    let pool = new sql.ConnectionPool(config.sqlServer);
    return new Promise((resolve, reject) => {
        const query = "USE book_store;\nINSERT INTO dbo.book(name, author, price, description) VALUES (@name, @author, @price, @description);\nSELECT * FROM dbo.book WHERE book_id = SCOPE_IDENTITY()";
        pool.connect().then(() => {
            const request = new sql.Request(pool);
            request
            .input('name', sql.NVarChar(255), data.name)
            .input('author', sql.NVarChar(255), data.author)
            .input('price', sql.Int, data.price)
            .input('description', sql.NVarChar(1000), data.description)
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


const updateBook = (data) => {
    let pool = new sql.ConnectionPool(config.sqlServer);
    return new Promise((resolve, reject) => {
        const query = "USE book_store;\nUPDATE dbo.book SET name = @name, author = @author, price = @price, description = @description WHERE book_id = @book_id\nSELECT * FROM dbo.book WHERE book_id = @book_id";
        pool.connect().then(() => {
            const request = new sql.Request(pool);
            request
            .input('name', sql.NVarChar(255), data.name)
            .input('author', sql.NVarChar(255), data.author)
            .input('price', sql.Int, data.price)
            .input('description', sql.NVarChar(1000), data.description)
            .input('book_id', sql.Int, data.book_id)
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

const deleteBook = (id) => {
    let pool = new sql.ConnectionPool(config.sqlServer);
    return new Promise((resolve, reject) => {
        const query = "USE book_store;\nDELETE dbo.book WHERE book_id = @book_id;";
        pool.connect().then(() => {
            const request = new sql.Request(pool);
            request
            .input('book_id', sql.Int, id)
            .query(query).then(() => {
                pool.close();
                resolve({message: 'Delete successfully'})
            }).catch(err => {
                pool.close();
                reject(err);
            })
        }).catch(err => {
            reject(err);
        })
    })
}

const searchBooks = (textSearch) => {
    const pattern = "%"+textSearch+"%";
    let pool = new sql.ConnectionPool(config.sqlServer);
    return new Promise((resolve, reject) => {
        const query = "USE book_store;\nSELECT * FROM dbo.book WHERE name LIKE @pattern OR author LIKE @pattern OR price LIKE @pattern OR description LIKE @pattern;";
        pool.connect().then(() => {
            const request = new sql.Request(pool);
            request
            .input('pattern', sql.NVarChar, pattern)
            .query(query).then((recordset) => {
                pool.close();
                resolve(recordset.recordset)
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
    getListBook,
    getBookById,
    updateBook,
    createBook,
    deleteBook,
    searchBooks
}