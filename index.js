'use strict';

var express = require('express');
const config = require('./config');
const cors = require('cors');

var app = express();

const bookRouter = require('./src/router/bookRouter')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:  true}));

app.use('/api/books', bookRouter.routes); // http://localhost:8031/api/books url để tạo request

app.listen(config.port, () => {
    console.log('Server is running on http://localhost:' + config.port);
});