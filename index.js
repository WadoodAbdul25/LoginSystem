//Module Imports
require('dotenv').config();
const express = require('express');
const app = express();
const Outer_Routes = require('./Routes/app');
const Inner_Routes = require('./Routes/users');
const expresslayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
// const User = require('./models/database');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
require('./config/passport')(passport);
//Database
mongoose.connect(process.env.DataBase_URI,{useNewUrlParser:true})
.then(()=>{console.log('connected to the database')})
.catch(err=>console.error(err));;


//MIDDLE WARES
//--EJS--
app.use(expresslayouts);
app.set('view engine','ejs')
app.use(express.urlencoded({extended:false}))
//Flash and session
//session
app.use(session({
    secret:process.env.secret,
    resave:true,
    saveUninitialized:true
}));
//passport middleware
app.use(passport.initialize());
app.use(passport.session());
//flash
app.use(flash());

//Global variables
app.use((req,res,next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.errors_msg = req.flash('errors_msg');
    res.locals.error = req.flash('error');
    next();
})


app.use('/',Outer_Routes);
app.use('/users',Inner_Routes);

app.listen(process.env.PORT,()=>{
    console.log(`the server is running at port ${process.env.PORT}`)
})