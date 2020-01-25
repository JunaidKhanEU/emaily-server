// git for deply heroku --- https://git.heroku.com/emaily-mernapp.git
// url for server app https://emaily-mernapp.herokuapp.com/

const express = require('express')
const app = express()

require('./services/passport') // just provide the passport config code before the program need it for google oAuth inside routes
const authRoutes = require('./routes/authRoutes')
// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// routes
app.use(authRoutes)

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
  console.log(`Server is running at port : ${PORT}`)
})
