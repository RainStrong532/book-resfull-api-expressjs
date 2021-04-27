'use strict';

const express = require('express');
const router = express.Router();

const path = require('path');
const option = {
    root: path.join(__dirname)
}

router.get("/", (req, res) => {
    const fileName = "/public/page/index.html";
    res.sendFile(fileName, option, (err) => {
        if(err) res.send(err);
    })
})

router.get("/books/update/:id", (req, res) => {
    const fileName = "/public/page/formBook.html";
    res.sendFile(fileName, option, (err) => {
        if(err) res.send(err);
    })
})

router.get("/books/add", (req, res) => {
    const fileName = "/public/page/formBook.html";
    res.sendFile(fileName, option, (err) => {
        if(err) res.send(err);
    })
})

module.exports = {
    routes: router //Xuất router
}