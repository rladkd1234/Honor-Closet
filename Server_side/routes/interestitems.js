var express = require('express');
var { Interestitem } = require('../models');

var router = express.Router();

router.get('/', function (req, res, next) {
    Interestitem.findAll()
        .then((interestitems) => {
            res.json(interestitems);
        })
        .catch((err) => {
            console.error(err);
            next(err);
        });
});


module.exports = router;
