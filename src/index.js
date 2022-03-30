const express = require('express')
const cors = require('cors')
const fs = require('fs')
const path = require('path')

const applyRoute = require('./routes/apply')

const app = express()
const port = process.env.PORT || 8080

app.use(express.json())
app.use(cors({ origin: true }))
app.get('/api/data', (req, res) => {
  const data = fs.readFileSync(path.join(__dirname, '/services/data/data.json'))
  res.status(200).json(JSON.parse(data))
})
app.use('/api', applyRoute)

app.listen(port)
