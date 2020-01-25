const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const keys = require('../config/keys')
const Users = mongoose.model('users') // import Users Model this way becuase of testing like mocha get issue with normal import from Models from mongoose

passport.serializeUser((user, done) => {
  done(null, user.id) // we select the unique identifier for cookie
})

// to check cookie unique identifier which we setup earlier, this function runs on all request after setting up the cookie-session
passport.deserializeUser(async (userId, done) => {
  const user = await Users.findById(userId)
  done(null, user)
})

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: 'http://localhost:4000/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
      const existUser = await Users.findOne({ googleId: profile.id })
      if (existUser) {
        console.log(existUser.id)
        done(null, existUser) // after the done call the passport send second argument(user) to the passport.serializeUser((user, done)=>) to set the cookie using some identifier on user data and later deserialized to check the cookie session.
      }

      const newUser = await Users.create({
        googleId: profile.id
      })

      done(null, newUser)
    }
  )
)
