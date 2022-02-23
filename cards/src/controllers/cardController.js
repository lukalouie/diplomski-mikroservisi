const { validationResult } = require("express-validator")
const Card = require("../models/card")

const getCards = async (req, res) => {
    let cards

    try {
        cards = await Card.find({})
    } catch (err) {
        res.status(500).send("Could not fetch cards.")
        return
    }

    if (cards.length === 0) {
        return "No cards found."
    }

    res.json({ cards: cards.map(card => card.toObject({getters: true}))})
}

const getCard = async (req, res) => {
    const card = await Card.findById(req.params.id)

    if (!card) {
        res.status(500).send("Could not find card.")
    }

    res.send(card)
}

const createCard = async (req, res) => {

    const errors = validationResult(req)

    if(!errors.isEmpty()) {
        res.status(422).send({error: "Invalid inputs passed!"})
        return
    }

    const {title, evolution, type, condition, price, image, description} = req.body

    const card = new Card({title, evolution, type, condition, price, image, description})


    try {
        await card.save()
    } catch (err) {
        res.status(500).send("Could not create card.")
    }

    res.status(201).json({card: card.toObject({getters: true})})
}

/* const deleteCard = async (req, res) => {
    const card = await Card.findById

} */

exports.getCards = getCards
exports.getCard = getCard
exports.createCard = createCard