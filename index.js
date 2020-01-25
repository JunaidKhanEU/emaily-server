const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const passport = require('passport')

require('./models/User/User') // provide user schema to create collection in DB for user collection, first it load the schema then use it inside passport config and callback function order of import matters here!!!
require('./services/passport') // just provide the passport config code before the program need it for google oAuth inside routes
const authRoutes = require('./routes/authRoutes')
const { mongoDB, cookieKey } = require('./config/keys.js')

// DB connection
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
  console.log('MongoDB connected')
})

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieSession({
  maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in millisecond 30 days, each day 24 h, each hours 60 min , each min 60 seconds, each second has 1000 millisecond
  keys: [cookieKey]
})) // tells express to use cookie-session
app.use(passport.initialize())
app.use(passport.session()) // connect passport with express and cookie-session

// routes
app.use(authRoutes)

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
  console.log(`Server is running at port : ${PORT}`)
})
