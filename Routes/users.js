const express = require('express');
const Router = express.Router();
// const mongoose = require('mongoose');
const User = require('../models/database');
const bcrypt = require('bcrypt');
const passport = require('passport');
// const { Route } = require('express');
//Routes
Router.get('/login',(req,res)=>{
    res.render('login')
});
Router.get('/register',(req,res)=>{
    res.render('register')
});
Router.post('/register',async (req,res)=>{
 const {Lastname, email, password, password2} = req.body;
 const errors = [];
 if(!Lastname|| !email|| !password|| !password2){
     errors.push({message:'Please fill out all the fields'});
 }
 if(password!==password2){
     errors.push({message:'Passwords do not match'});
 }
 if(password.length<6){
     errors.push({message:'Password should be atleast 6 characters long'});
 }
 if(errors.length>0){
   res.render('register',{errors,Lastname,email,password,password2});
 }else{
   const exist= await User.findOne({email:email, password:password});
   if(exist){
       errors.push({message:'User already exists'});
    res.render('register',{errors,Lastname,email,password,password2});   
   }else{
     let hashedPassword = await bcrypt.hash(req.body.password,10);
     const newuser = new User();
     newuser.name = req.body.Lastname;
     newuser.email = req.body.email;
     newuser.password = hashedPassword;
     newuser.save().then(()=>{
         req.flash('success_msg','You Have Been Registered and can Login')
         res.redirect('/users/login');
     })
     .catch(err=>console.error(err));   
   }
 }
});
Router.post('/login',(req,res,next)=>{
 passport.authenticate('local',{
     successRedirect:'/dashboard',
     failureRedirect:'/users/login',
     failureFlash:true
 })(req,res,next);
})

Router.get('/logout',(req,res)=>{
    req.logOut();
    req.flash('success_msg','you have been logged out successfully');
    res.redirect('/users/login')
})
module.exports = Router;
