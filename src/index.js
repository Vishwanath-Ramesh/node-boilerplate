const express = require('express')
const cors = require('cors')

const app = express()
const port = process.env.PORT || 8080

app.use(express.json())
app.use(cors({ origin: true }))

app.get('/api', (req, res) => {
  res.status(200).send({ result: 'SUCCESS' })
})

app.listen(port)
