'use strict';

const express = require('express');
const router = express.Router();
const models = require('../models');


router.get('/new', function(req, res, next) { //SQL FIND ALL THE ROWS OF POST AND SEND THEM BACK TO ME
    res.render('category/new', {});
});

router.get('/', function(req, res, next) { //SQL FIND ALL THE ROWS OF POST AND SEND THEM BACK TO ME
  models.Category.findAll().then(function(records){
    res.render('category/index', {
      records: records
    });
  });
});

router.post('/', function(req, res, next) {
  models.Category.create({
    type: req.body.type,
  }).then(function(record) {
    res.redirect(`/categories`);
  });
});





router.get('/:id', function(req,res,next){
    models.Category.findByPk(req.params.id).then(function(record){
      res.render('category/edit',{
        record:record

      });
  });
});


router.post('/:id', function(req, res, next) {
    models.Category.findByPk(req.params.id).then(function(record) {
      record.update({
        type: req.body.type,
      }).then(function(record) {
        res.redirect(`/categories`)
      });
    });
  });









module.exports = router;
