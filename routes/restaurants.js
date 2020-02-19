'use strict';

const express = require('express');
const router = express.Router();
const models = require('../models');

router.get('/', function(req, res, next) {
    models.Restaurant.findAll().then(function(records){ 
    res.render('restaurants/index', {
            records: records
         });
      });
    });

    router.get('/restaurants', function(res,req,next){ 
        res.render('restaurants/new')
    })


    router.get('/new', function(req, res, next){
         res.render('restaurants/new');  

    });

    router.get('/:id', function(req, res, next){
        models.Restaurant.findByPk(req.params.id).then(function(record) {
          res.render('restaurants/edit_restaurants', {
            record: record
          });
        });
      });

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

    
    router.get('/:id', function(req, res, next){
       models.Restaurant.findByPk(req.params.id).then(function(record){
           res.render('restaurants/new',{

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

                 })
            })
        });

       
     
module.exports = router;