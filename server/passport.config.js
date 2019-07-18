'use strict';

const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const users = require('./source/users');
const opts = {
  secretOrKey: 'secret',
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

passport.use(new JwtStrategy(opts, async (payload, done) => {
    try {
        const user = users.find(userFromDB => {
            if (userFromDB.email === payload.email) {
                return userFromDB;
            }            
        });
        return user ? done(null, user) : done({ status: 401, message: 'Token is invalid.' }, null);
    } catch (err) {
        return done(err);
    }
}));

