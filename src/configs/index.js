const databaseURI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@staffrex-cluster-1.4arbs.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`

module.exports = {
  databaseURI,
}
