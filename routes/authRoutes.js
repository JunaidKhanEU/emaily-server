const express = require('express')
const passport = require('passport')

const router = express.Router()

router.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
)

router.get('/auth/google/callback', passport.authenticate('google'))

router.get('/api/logout', (req, res) => {
  req.logOut() // this method attached by passport to req object to remove cookie and its data including req.user
  res.send(req.user) // it is empty now
})
router.get('/api/current_user', (req, res) => {
  res.send(req.user)
})

module.exports = router
