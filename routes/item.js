'use strict';

const express = require('express');
const router = express.Router();
const models = require('../models');
const helpers = require('./helpers');

router.get('/', function(req, res, next) {
  models.Item.findAll().then(function(records) {
    res.render('item/index', {
      records: records
    });
  });
});

router.get('/new', function(req, res, next) {
  models.Category.findAll().then(function(categories){
    res.render('item/new',{
      categories: categories
    });
  });
});



router.post('/', function(req, res, next) {
  models.Item.create({
    bin: req.body.bin,
    RestaurantId: req.body.restaurantId,
    CategoryId: req.body.categoryId,
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
    helpers.handleUpload(record, 'photo', req.body.photo, 'items/photo').then(function(record) {
      record.update({
        bin: req.body.bin,
        RestaurantId: req.body.restaurantId,
        CategoryId: req.body.categoryId,
        photo: record.photo,
      }).then(function(record) {
        res.redirect('/item');
      })
    });
  })
});

module.exports = router;
