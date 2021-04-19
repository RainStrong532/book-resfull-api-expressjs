const multer = require('multer');

const upload = multer({
    limits: {
        fileSize: 4 * 1024 * 1024,
    }
}).single("image");

const uploadImage = (req, res, next) => {
    upload(req, res, (err) => {
        if (err) {
            res.status(400).json(err);
            return
        }

        next();
    })
}

module.exports = uploadImage;