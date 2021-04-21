const express = require('express');

const secretCodeController = require('../controller/secretCodeController');

const router = express.Router();

router.post('/send', secretCodeController.sendMail);

router.get('/verify', secretCodeController.verify);
router.get('/:user_id', secretCodeController.getSecretCodeByUserId);

module.exports = {
    routes: router
};