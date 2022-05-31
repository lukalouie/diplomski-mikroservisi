const express = require('express')
const orderController = require('../controllers/orderController')

const router = express.Router()

router.get("/", orderController.getOrder)

router.get("/:id", orderController.getOrder)

router.post("/create", orderController.createOrder)

module.exports = router