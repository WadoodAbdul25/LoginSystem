const express = require('express');
const Router = express.Router();
const path = require('path');
const {ensureAuthenticated} = require('../config/auth');
path.join(__dirname,'views');
Router.get('/',(req,res)=>{
    res.render('home')
})
Router.get('/dashboard',ensureAuthenticated,(req,res)=>{
    res.render('dashboard',{name:req.user.name});
})

module.exports = Router;
