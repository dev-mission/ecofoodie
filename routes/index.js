'use strict';

const express = require('express');
const router = express.Router();
const models = require('../models');


router.get('/', function(request, response, next) {
  response.render('index');
});

router.get('/logout', function(request,response,next){
  request.logout();
  request.flash('info', 'You have been logged out.');
  request.redirect('/');
});

router.get('/posts' , function(req, res, next){    
  models.Post.findByPk(req.query.id).then(function(record){
  res.render('post', {record:record})

      });
});


/////////////


//router.get('/list_restaurants', function(request, response, next ){


//}


module.exports = router;
