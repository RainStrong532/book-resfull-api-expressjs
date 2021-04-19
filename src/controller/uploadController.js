'use strict';

const Resize = require('../utils/resize');
const path = require('path');

const upload = async function (req, res) {
    // folder upload
    const imagePath = path.join(__dirname, '../../assets/images');
    // call class Resize
    const fileUpload = new Resize(imagePath);
    if (!req.file) {
        res.status(401).json({ message: 'Please provide an image' });
    }
    try {
        const isImageFile = (/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i).test(req.file.originalname)
        if(!isImageFile){
            return res.status(200).json({ message: "not an image file"});
        }
        const filename = await fileUpload.save(req.file.buffer, req.file.originalname);
        return res.status(200).json({ message: filename });
    }catch(err){
        return res.status(400).json(err);
    }
}

module.exports = {
    upload
}