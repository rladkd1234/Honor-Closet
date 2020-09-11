var express = require('express');
var { Orderedproduct } = require('../models');

var router = express.Router();

router.get('/', function (req, res, next) {
    Orderedproduct.findAll()
        .then((orderedproducts) => {
            res.json(orderedproducts);
        })
        .catch((err) => {
            console.error(err);
            next(err);
        });
});


module.exports = router;
