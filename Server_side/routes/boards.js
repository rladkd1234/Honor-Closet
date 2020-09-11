var express = require('express');
var { Board } = require('../models');

var router = express.Router();

router.get('/', function (req, res, next) {
    Board.findAll()
        .then((boards) => {
            res.json(boards);
        })
        .catch((err) => {
            console.error(err);
            next(err);
        });
});

router.post('/', function(req, res, next) {
  console.log(req.body);
  Board.create({
//    No : req.body.~~
        Specification : req.body.Specification,
        Title : req.body.Title,
        Contents : req.body.Contents,
        Writer: req.body.Writer,
        isHidden : req.body.isHidden,
  })
    .then(result => {
      console.log(result);
      res.status(201).json(result);
    })
    .catch(err => {
      console.error(err);
      next(err);
    });
});

router.patch("/:id", function(req, res, next) {

  console.log(req.params.id);
  
  Board.update(
    {
      Specification: req.body.Specification,
      Title: req.body.Title,
      Contents: req.body.Contents,
      Writer: req.body.Writer,
      isHidden: req.body.isHidden,
    },
    { where: { id: req.params.id } }
  )
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      console.error(err);
      next(err);
    });
});

router.delete("/:id", function(req, res, next) {
  // console.log(req);
    Board.destroy({ where: { id: req.params.id } })
      .then(result => {
        res.json(result);
      })
      .catch(err => {
        console.error(err);
        next(err);
      }); 
});
module.exports = router;
