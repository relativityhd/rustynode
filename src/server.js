const path = require('path')
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './views/main.html'))
})

app.get('/data', (req, res) => {
  console.log('Transmit json...')
  res.json([0, 1, 2, 3, 4, 5])
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
