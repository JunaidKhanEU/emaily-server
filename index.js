const express = require('express')
const app = express()
const mongoose = require('mongoose')

require('./services/passport') // just provide the passport config code before the program need it for google oAuth inside routes
const authRoutes = require('./routes/authRoutes')
const { mongoDB } = require('./config/keys.js')

// DB connection
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
  console.log('MongoDB connected')
})
// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// routes
app.use(authRoutes)

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
  console.log(`Server is running at port : ${PORT}`)
})
