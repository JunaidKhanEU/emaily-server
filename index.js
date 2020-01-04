// git for deply heroku --- https://git.heroku.com/emaily-mernapp.git
// url for server app https://emaily-mernapp.herokuapp.com/ 

const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Express Server'
  })
})

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
  console.log(`Server is running at port : ${PORT}`)
})
