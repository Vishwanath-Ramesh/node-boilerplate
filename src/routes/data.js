const { Router } = require('express')

const DataController = require('../controller/DataController')

const router = new Router()

router
  .route('/data/:id?')
  .post(DataController.insertData)
  .get(DataController.getData)
  .put(DataController.updateData)
  .delete(DataController.deleteData)

module.exports = router
