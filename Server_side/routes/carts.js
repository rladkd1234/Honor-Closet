var express = require('express');
var { Cart } = require('../models');

var router = express.Router();

router.get('/', function (req, res, next) {
    Cart.findAll()
        .then((carts) => {
            res.json(carts);
        })
        .catch((err) => {
            console.error(err);
            next(err);
        });
});


module.exports = router;
