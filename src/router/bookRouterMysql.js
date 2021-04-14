'use strict';

const express = require('express');
const router = express.Router();

const bookController = require('../controller/bookControllerMysql');

router.get('/', bookController.getListBook);
router.get('/:id', bookController.getBookById);

module.exports = {
    routes: router //Xuất router
}