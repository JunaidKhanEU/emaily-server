const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')

const keys = require('../config/keys')
const Users = mongoose.model('users') // import Users Model this way becuase of testing like mocha get issue with normal import from Models from mongoose

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: 'http://localhost:4000/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
      const newUser = await Users.create({
        googleId: profile.id
      })

      console.log(newUser)
    }
  )
)
