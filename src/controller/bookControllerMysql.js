'use strict';

const bookData = require('../data/mysql');

const getListBook = async function (req, res, next){
    try{
        const books = await bookData.getListBook();
        res.send(books);
    }catch(err){
        res.status(400).send(err.message);
    }
}

const getBookById = async (req, res, next) => {
    try{
        const id = req.params.id;
        if(id){
        const books  = await bookData.getBookById(id);
        res.send(books);
        }else{
            res.send({message: 'Id is not valid'});
        }
    }catch(err){
        res.status(400).send(err.message);
    }
}
module.exports = {
    getListBook,
    getBookById
}