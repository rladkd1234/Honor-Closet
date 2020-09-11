var express = require('express');
var { Behindvideo } = require('../models');

var router = express.Router();

router.get('/', function (req, res, next) {
    Behindvideo.findAll()
        .then((articles) => {
            res.json(articles);
        })
        .catch((err) => {
            console.error(err);
            next(err);
        });
});


module.exports = router;
