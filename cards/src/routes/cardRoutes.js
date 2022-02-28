const express = require('express')
const cardController = require('../controllers/cardController')
const { body } = require('express-validator')

const router = express.Router()

router.get("/", cardController.getCards)

router.get("/:id", cardController.getCard)

router.post("/create", [
    body("title").not().isEmpty().withMessage("Title of the card can't be empty!"),
    body("price").isFloat({ gt : 0 }).withMessage("Price of the card must be grater than zero!"),
    body("type").not().isEmpty().withMessage("Card needs to have a type!"),
    body("image").not().isEmpty().withMessage("Add image of the card!")
], cardController.createCard)

router.put("/:id/update", [
    body("title").not().isEmpty().withMessage("Title of the card can't be empty!"),
    body("price").isFloat({ gt : 0 }).withMessage("Price of the card must be grater than zero!"),
    body("type").not().isEmpty().withMessage("Card needs to have a type!"),
    body("image").not().isEmpty().withMessage("Add image of the card!")
] ,cardController.updateCard)

module.exports = router