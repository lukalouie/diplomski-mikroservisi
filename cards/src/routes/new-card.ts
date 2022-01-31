import express, { Request, Response } from "express"
import { requireAuthHandler, requestHandler } from "@pokeballz-fer/shared-logic"
import { body } from "express-validator"
import { Card } from "../models/card"

const router = express.Router()

router.post("/api/cards", requireAuthHandler, [
    body("title").not().isEmpty().withMessage("Title of the card can't be empty!"),
    body("price").isFloat({ gt : 0 }).withMessage("Price of the card must be grater than zero!")
], requestHandler, async (req: Request, res: Response) => {
    const {title, price} = req.body

    const card = Card.createCard({ title, price, userId: req.currentUser!.id })
    await card.save()

    res.status(201).send(card)
})

export { router as createCardRouter }