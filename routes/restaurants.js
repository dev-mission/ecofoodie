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

    router.get('/new', function(req, res, next){
         res.render('restaurants/new');  

    });
 
    router.get('/restaurant', function(res,req,next){ 
        res.render('restaurants/new')
    })

    router.post('/restaurant' , function(req, res, next){
        //Creating a table to store all of the data
        models.Restaurant.create({  
        // Gather the information from html
        name: req.body.name,
        address: req.body.address,
        latitude: req.body.latitude,
        longtitude: req.body.longtitude,
        logo: req.body.logo,
        rating: req.body.rating
        //Gather all the data 
        }).then(function(record){
        //Post the informations
            console.log('it works')
            res.redirect(`/restaurants`);
        
        });
    });


    
    router.get('/:id', function(req, res, next){
       models.Todo.findByPk(req.params.id).then(function(record){
           res.render('todo/edit',{

              record : record
           });
           
       });
    });

    router.post('/:id', function(req, res, next){
        models.Todo.findByPk(req.params.id).then(function(record){
            record.update({
                title: req.body.title,
                body: req.body.body
            }).then(function(record){
                 res.redirect('/todo');

                 })
            })
        });
 
     
module.exports = router;