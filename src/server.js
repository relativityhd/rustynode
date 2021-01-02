const path = require('path')
const express = require('express')
const { networkInterfaces } = require('os')
const { getBenchmark } = require('./bench/bench')
const { filter } = require('benchmark')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './views/main.html'))
})

app.get('/bench', (req, res) => {
  res.json(getBenchmark(req.query.benchid))
})

const address = networkInterfaces()["en0"].filter(en0 => en0.family === 'IPv4')[0].address
console.log('--DEBUG : networkInterfaces()', networkInterfaces())
console.log('--DEBUG : address', address)
app.listen(port, `${address}`, () => {
  console.log(`Example app listening at http://${address}:${port}`)
})
