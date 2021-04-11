'use strict';

const express = require('express');
const router = express.Router();

const bookController = require('../controller/bookController'); // import controller

router.get('/', bookController.getListBook); // Định nghĩa phương thức get sẽ lấy dữ liệu sách ra tại "/"
router.get('/search', bookController.searchBooks);
router.get('/:id', bookController.getBookById); // thêm param id
router.post('/', bookController.createBook);
router.put('/:id', bookController.updateBook);
router.delete('/:id', bookController.deleteBook);

module.exports = {
    routes: router //Xuất router
}