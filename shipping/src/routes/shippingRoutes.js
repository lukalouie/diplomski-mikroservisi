const express = require('express')
const shippingController = require('../controllers/shippingController')

const router = express.Router()

router.get("/", shippingController.getShippings)

router.get("/:id", shippingController.getShipping)

router.post("/create", shippingController.createShipping)

router.put("/update/:id", shippingController.updateShipping)

module.exports = router