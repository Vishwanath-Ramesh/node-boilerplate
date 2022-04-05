const { MongoClient } = require('mongodb')

const { databaseURI } = require('../configs')

const mongoClient = new MongoClient(databaseURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

module.exports = mongoClient
