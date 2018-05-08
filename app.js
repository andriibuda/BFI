const express = require('express');
const app = express();

/**
 * Setting template engine
 */
app.set('view engine', 'pug');


/**
 * Controllers (route handlers)
 */
const indexController = require("./controllers/index");

/**
 * Index route
 */
app.get('/', indexController.getIndex);


/**
 * Running server on 3000 port
 */
app.listen(3000, () => console.log('Example app listening on port 3000!'));