'use strict';

const express = require('express');
const router = express.Router();
const models = require('../models');
const helpers = require('./helpers');

router.get('/', function(req, res, next) {
  const options = {};
  if (req.query.search) {
    options.where = {
      name: {
        [models.Sequelize.Op.iLike]: `%${req.query.search}%`
      }
    };
  }
  models.Restaurant.findAll(options).then(function(records){
    res.render('restaurants/index', {
      records: records
    });
  });
});

router.get('/new', function(req, res, next){
   res.render('restaurants/new');
});

// Submitting for new restaurant
router.post('/', function(req, res, next){
  const record = models.Restaurant.build({
    name: req.body.name,
    address: req.body.address,
    latitude: req.body.latitude,
    longtitude: req.body.longtitude,
    rating: req.body.rating
  });
  helpers.handleUpload(record, 'logo', req.body.logo, 'restaurant/logo').then(function(record) {
    record.save().then(function(record) {
      res.redirect(`/restaurants/${record.id}`);
    });
  });
});

// Only for viewing a restaurant edit
router.get('/:id/edit', function(req, res, next){
  models.Restaurant.findByPk(req.params.id).then(function(record) {
    res.render('restaurants/edit',{
      record
    });
  });
});

router.get('/:id/categories/:categoryId/items', function(req, res, next) {
  models.Restaurant.findByPk(req.params.id).then(function(restaurant) {
    models.Category.findByPk(req.params.categoryId).then(function(category) {
      models.Item.findAll({where: {RestaurantId: restaurant.id, CategoryId: category.id}}).then(function(items) {
        res.render('restaurants/items/index',{
          restaurant,
          category,
          items
        });
      });
    });
  });
});

router.get('/:id/items/new', function(req, res, next) {
  models.Restaurant.findByPk(req.params.id).then(function(restaurant) {
    models.Category.findAll().then(function(categories) {
      res.render('restaurants/items/new',{
        restaurant,
        categories,
        categoryId: req.query.categoryId
      });
    });
  });
});

router.post('/:id/items', function(req, res, next) {
  const record = models.Item.build({
    bin: req.body.bin,
    RestaurantId: req.params.id,
    CategoryId: req.body.CategoryId
  });
  helpers.handleUpload(record, 'photo', req.body.photo, 'items/photo').then(function(record) {
    record.save().then(function(record) {
      res.redirect(`/restaurants/${req.params.id}/categories/${record.CategoryId}/items`);
    })
  });
});

// Only for viewing a restaurant edit
router.get('/:id', function(req, res, next){
  models.Restaurant.findByPk(req.params.id).then(function(record){
    models.sequelize.query(`
      SELECT *
      FROM "Categories"
      WHERE id IN
      (SELECT DISTINCT("CategoryId")
       FROM "Items"
       WHERE "RestaurantId"=${req.params.id})
    `, {model: models.Category}).then(function(categories) {
      res.render('restaurants/show',{
        record: record,
        categories: categories
      });
    });
  });
});

// Only for viewing a restaurant and delete
router.delete('/:id', function(req, res, next){
  Post.findByIdAndRemove(req.params.id, req.body).then(function(record){
    res.render('restaurants/',{
      record : record
    });
  });
});

router.post('/:id', function(req, res, next){
  models.Restaurant.findByPk(req.params.id).then(function(record){
    helpers.handleUpload(record, 'logo', req.body.logo, 'restaurant/logo').then(function(record) {
      record.update({
        name: req.body.name,
        address: req.body.address,
        latitude: req.body.latitude,
        longtitude: req.body.longtitude,
        logo: record.logo,
        rating: req.body.rating
      }).then(function(record){
        res.redirect('/restaurants');
      });
    });
  });
});

module.exports = router;
