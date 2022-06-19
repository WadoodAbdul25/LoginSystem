const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

//fe    thing database
const User = require('../models/database');

module.exports = function (passport) {
    passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
        User.findOne({ email: email })
            .then(user => {
                if (!user) {
                    return done(null, false, { message: 'Email is not registered' })
                }

                bcrypt.compare(password, user.password, (err, Ismatch) => {
                    if (err) throw err;
                    if (Ismatch) {
                        return done(null, user)
                    } else {
                        return done(null, false, { message: 'password incorrect' });
                    }
                })
            }).catch(err => console.error(err));
    }))

  passport.serializeUser((user,done)=>{
      done(null,user.id)
  });
  passport.deserializeUser((id,done)=>{
      User.findById(id, (err, user)=>{
          done(err, user);
      });
     });  
}   