var express = require('express');
var { Mainpagevideo } = require('../models');

var router = express.Router();

router.get('/', function (req, res, next) {
    Mainpagevideo.findAll()
        .then((articles) => {
            res.json(articles);
        })
        .catch((err) => {
            console.error(err);
            next(err);
        });
});


module.exports = router;
