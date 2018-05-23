const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.get('/ping', (req, res) => {
  res.send('pong')
})

const PORT = 3000
app.listen(PORT, () => {
  console.log(`app listening at http://localhost:${PORT}`)
})
