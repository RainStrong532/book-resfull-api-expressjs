'use strict';

var express = require('express');
const config = require('./config');
const cors = require('cors');

var app = express();

const bookRouter = require('./src/router/bookRouter')
const bookRouterMysql = require('./src/router/bookRouterMysql')
const authRouter = require('./src/router/authRouter')
const bookAuth = require('./src/router/book.auth.router')
const uploadRouter = require('./src/router/uploadRouter')

const auth = require('./src/middleware/authenticated');


app.use("/assets",express.static("assets")); // use static file
app.set('view engine', 'pug');
app.set('views', './src/view');

app.use(cors({origin: config.front_end_url}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/welcome', (req, res) => {
    res.render('index');
})

app.use('/upload', uploadRouter.routes);

app.use('/api/books' ,auth.authenticateToken, bookAuth.routes); // kiểm tra jsonwebtoken
app.use('/api/public/books', bookRouter.routes); // http://localhost:4000/api/books url để tạo request
app.use('/api/mysql/books', bookRouterMysql.routes);
app.use('/api/auth', authRouter.routes);

app.listen(config.port, () => {
    console.log('Server is running on http://localhost:' + config.port);
});