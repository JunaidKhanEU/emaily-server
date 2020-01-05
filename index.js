// git for deply heroku --- https://git.heroku.com/emaily-mernapp.git
// url for server app https://emaily-mernapp.herokuapp.com/

const express = require('express')
const app = express()
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const keys = require('./config/keys')
// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

passport.use(new GoogleStrategy(
  { clientID: keys.googleClientID, clientSecret: keys.googleClientSecret, callbackURL: 'http://localhost:4000/auth/google/callback' }, (accessToken, refreshToken, profile, done) => {
    console.log('accessToken', accessToken)
    console.log('refreshToken', refreshToken)
    console.log('profile', profile)
  }
))

app.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}))

app.get('/auth/google/callback', passport.authenticate('google'))
const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
  console.log(`Server is running at port : ${PORT}`)
})
