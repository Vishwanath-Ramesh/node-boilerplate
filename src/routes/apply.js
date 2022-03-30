const { Router } = require('express')

const ApplyController = require('../controller/ApplyController')

const router = new Router()

router.route('/apply').post(ApplyController.postApply)

module.exports = router
