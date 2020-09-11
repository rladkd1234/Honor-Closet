var express = require('express');
var { Order } = require('../models');

var router = express.Router();

router.get('/', function (req, res, next) {
    Order.findAll()
        .then((orders) => {
            res.json(orders);
        })
        .catch((err) => {
            console.error(err);
            next(err);
        });
});


module.exports = router;
