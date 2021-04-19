const express = require('express');

const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const uploadController = require('../controller/uploadController');


router.get('/', async function (req, res) {
    await res.render('form/index');
});

router.post('/post', upload, uploadController.upload);

module.exports = {
    routes: router
};