var express = require('express');
var { Member } = require('../models');

var router = express.Router();

router.get('/', function (req, res, next) {
    Member.findAll()
        .then((members) => {
            res.json(members);
        })
        .catch((err) => {
            console.error(err);
            next(err);
        });
});


module.exports = router;
