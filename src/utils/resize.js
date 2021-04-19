const sharp = require('sharp');
const { v4 } = require('uuid');
const path = require('path');

class Resize {
    constructor(folder) {
        this.folder = folder;
    }
    async save(buffer, originalname) {
        let extension  = originalname.split('.');
        extension = extension[extension.length - 1].toLowerCase();
        const filename = Resize.filename(extension);
        const filepath = this.filepath(filename);
        await sharp(buffer)
            //   .resize(300, 300, { // size image 300x300
            //     fit: sharp.fit.inside,
            //     withoutEnlargement: true
            //   })
            .toFile(filepath);

        return filename;
    }
    static filename(extendFile) {
        // random file name
        const name = v4();
        return `${name}.${extendFile}`;
    }
    filepath(filename) {
        return path.resolve(`${this.folder}/${filename}`)
    }
}
module.exports = Resize;