const express = require('express')

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Welcome')
})

app.listen('5000', () => console.log(`Server running at port 5000`))