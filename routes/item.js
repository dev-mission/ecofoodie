'use strict';

const express = require('express');
const router = express.Router();
const models = require('../models');

router.get('/', function(req, res, next) {
    // models.Item.findAll().then(function(records) {
      res.render('item/item', {
        // records: records
      // });
    });
  });

  router.get('/new', function(req, res, next) {
    res.render('item/new');
});

router.post('/item', function(req, res, next) { 
  models.Items.create({
    bin: req.body.title,
    restaurantId: req.body.body
  }).then(function(record) {
    res.redirect(`/item`);
  });

});

router.get('/:id', function(req, res, next) {
    models.Todo.findByPk(req.params.id).then(function(record) {
      res.render('todo/edit', {
        record: record
      });
  });
});

  

  module.exports = router;