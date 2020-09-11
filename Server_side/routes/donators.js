var express = require('express');
var { Donator } = require('../models');

var router = express.Router();

router.get('/', function (req, res, next) {
    Donator.findAll()
        .then((donators) => {
            res.json(donators);
        })
        .catch((err) => {
            console.error(err);
            next(err);
        });
});


module.exports = router;
