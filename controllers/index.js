/**
 * GET /
 * Index route
 */
exports.getIndex = function (req, res) {
    // console.log(req.headers);

    res.render('index', {
        title: 'Hey',
        message: 'Hello there! This is Browser Fingerprint Information service',
        httpHeaders: req.headers
    })
};
