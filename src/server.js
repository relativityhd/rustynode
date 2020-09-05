const path = require('path')
const express = require('express')
const { getBenchmark } = require('./bench/bench')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './views/main.html'))
})

app.get('/bench', (req, res) => {
  console.log('Transmit json...')
  res.json(getBenchmark(req.query.benchid))
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
