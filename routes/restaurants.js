'use strict';

const express = require('express');
const router = express.Router();
const models = require('../models');

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
  models.Restaurant.create({
    name: req.body.name,
    address: req.body.address,
    latitude: req.body.latitude,
    longtitude: req.body.longtitude,
    logo: req.body.logo,
    rating: req.body.rating
  }).then(function(record){
    res.redirect(`/restaurants`);
  });
});

// Only for viewing a restaurant edit
router.get('/:id', function(req, res, next){
  models.Restaurant.findByPk(req.params.id).then(function(record){
    res.render('restaurants/edit',{
      record : record
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
    record.update({
      name: req.body.name,
      address: req.body.address,
      latitude: req.body.latitude,
      longtitude: req.body.longtitude,
      logo: req.body.logo,
      rating: req.body.rating
    }).then(function(record){
      res.redirect('/restaurants');
    });
  });
});

module.exports = router;
