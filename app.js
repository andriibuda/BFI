const express = require('express');
const app = express();

/**
 * Setting template engine
 */
app.set('view engine', 'pug');


/**
 * /GET
 * Index route
 */
app.get('/', function (req, res) {
    res.render('index', { title: 'Hey', message: 'Hello there!' })
});


/**
 * Running server on 3000 port
 */
app.listen(3000, () => console.log('Example app listening on port 3000!'));