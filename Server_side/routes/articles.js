var express = require('express');
var { Article } = require('../models');

var router = express.Router();

router.get('/', function (req, res, next) {
    Article.findAll()
        .then((articles) => {
            res.json(articles);
        })
        .catch((err) => {
            console.error(err);
            next(err);
        });
});


module.exports = router;
