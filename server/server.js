const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(express.static(`${__dirname}/public`))

app.get('/ping', (req, res) => {
  res.send('pong')
})

const PORT = 3000
app.listen(PORT, () => {
  console.log(`app listening at http://localhost:${PORT}`)
})
