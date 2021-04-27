const config =  require('../../config');
let host = config.host //http://localhost:8031
host = host+"/api"; //http://localhost:8031/api

const BOOK_URL = host+"/books"; //http://localhost:8031/api/books

module.exports = {
    BOOK_URL
}