const express = require('express')
const cors = require('cors')

const applyRoute = require('./routes/apply')
const dataRoute = require('./routes/data')

const app = express()
const port = process.env.PORT || 8080

app.use(express.json())

app.use(cors({ origin: true }))

app.use('/api/', dataRoute)
app.use('/api', applyRoute)

app.listen(port)
