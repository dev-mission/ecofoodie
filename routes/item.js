'use strict';

const express = require('express');
const router = express.Router();
const models = require('../models');

router.get('/', function(req, res, next) {
    models.Item.findAll().then(function(records) {
    res.render('item/item', {
        records: records
      });
  });
});

  router.get('/new', function(req, res, next) {
    res.render('item/new');
});

router.post('/', function(req, res, next) { 
  models.Item.create({
    bin: req.body.bin,
    restaurantId: req.body.restaurantId,
    categoryId: req.body.categoryId,
    photo: req.body.photo,
  }).then(function(record) {
    res.redirect(`/item`);
  });

});

router.get('/:id', function(req, res, next) {
    models.Item.findByPk(req.params.id).then(function(record) {
      res.render('item/edit', {
        record: record
      });
  });
});

  router.post('/:id', function(req, res, next) {
  models.Item.findByPk(req.params.id).then(function(record) {
    record.update({
      bin: req.body.bin,
      restaurantId: req.body.restaurantId,
      categoryId: req.body.categoryId,
      photo: req.body.photo,
    }).then(function(record) {
      res.redirect('/item');
    })
  })
});


  module.exports = router;