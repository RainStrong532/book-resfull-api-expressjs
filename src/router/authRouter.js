'use strict';

const express = require('express');
const router = express.Router();
// import controller

const authController = require('../controller/authController')
const { checkDuplicateUsername, checkRolesExisted } = require('../middleware/verifySignup');

router.get('', authController.searchAccount);
router.get('', authController.getListAccount); // Định nghĩa phương thức get sẽ lấy dữ liệu sách ra tại "/"
router.put('/:user_id', authController.updateAccount);
router.post('/signup', checkDuplicateUsername, checkRolesExisted ,authController.sigup);
router.post('/signin', authController.signin);
module.exports = {
    routes: router //Xuất router
}