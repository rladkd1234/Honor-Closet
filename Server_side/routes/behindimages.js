var express = require('express');
var { Behindimage } = require('../models');

var router = express.Router();

router.get('/', function (req, res, next) {
    Behindimage.findAll()
        .then((articles) => {
            res.json(articles);
        })
        .catch((err) => {
            console.error(err);
            next(err);
        });
});


module.exports = router;
