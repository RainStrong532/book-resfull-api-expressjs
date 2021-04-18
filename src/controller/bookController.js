'use strict';

const bookData = require('../data/book'); // import module kết nối với cơ sở dữ liệu

const getListBook = async (req, res, next) => {
    console.log('====================================');
    console.log(req.user);
    console.log('====================================');
    try {
        const books = await bookData.getListBook();
        res.send(books); //Thành công trả về list book
    } catch (err) {
        res.status(400).send(err.message); // trả về lỗi thì lấy dữ liệu thất bại
    }
}

const getBookById = async (req, res, next) => {
    try {
        const id = req.params.id;
        if (id) { //Kiểm trả id
            const books = await bookData.getBookById(id);
            res.send(books[0]); // trả về một phần tử vì id là duy nhất
        } else {
            res.send({ message: 'Id is not valid' });
        }
    } catch (err) {
        res.status(400).send(err.message);
    }
}

const createBook = async (req, res, next) => {
    try {
        let data = req.body;
        const books = await bookData.createBook(data);
        res.send(books);
    } catch (err) {
        res.status(400).send(err.message);
    }
}

const updateBook = async (req, res, next) => {
    try {
        const id = req.params.id;
        let data = req.body;
        data.book_id = id;
        const books = await bookData.updateBook(data);
        res.send(books);
    } catch (err) {
        res.status(400).send(err.message);
    }
}

const deleteBook = async (req, res, next) => {
    try {
        const id = req.params.id;
        if (id) {
            const message = await bookData.deleteBook(id);
            res.send(message);
        } else {
            res.send({ message: 'Id is not valid' });
        }
    } catch (err) {
        res.status(400).send(err.message);
    }
}

const searchBooks = async (req, res, next) => {
    try {
        const text_search = req.query.text_search; // get text search by query
        if (text_search.length > 0) {
            const books = await bookData.searchBooks(text_search);
            res.send(books);
        } else {
            res.send({ message: 'There is no text search to searching' });
        }
    } catch (err) {
        res.status(400).send(err.message);
    }
}


module.exports = {
    getListBook,
    getBookById,
    updateBook,
    createBook,
    deleteBook,
    searchBooks
}