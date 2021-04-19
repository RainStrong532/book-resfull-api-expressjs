'use strict';

const express = require('express');
const router = express.Router();
const auth = require('../middleware/authenticated');

const bookController = require('../controller/bookController'); // import controller

router.get('/', [auth.isMonitor, auth.isManager, auth.isAdmin] ,bookController.getListBook); // quyền truy cập admin && manager && monitor
router.get('/search', [auth.isMonitor, auth.isManager] ,bookController.searchBooks); // quyền truy cập manager && monitor
router.get('/:id', [auth.isMonitor], bookController.getBookById); // thêm param id
router.post('/', [auth.isMonitor, auth.isManager, auth.isAdmin], bookController.createBook);
router.put('/:id',[auth.isMonitor, auth.isManager, auth.isAdmin],  bookController.updateBook);
router.delete('/:id', [auth.isMonitor, auth.isManager, auth.isAdmin], bookController.deleteBook);

module.exports = {
    routes: router //Xuất router
}