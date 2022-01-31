import request from "supertest"
import { app } from "../../app"
import mongooose from "mongoose"

it("returns 404 if card not found", async () => {
    const id = new mongooose.Types.ObjectId().toHexString()
    await request(app).get(`/api/cards/${id}`).send().expect(404)
})

it("return card if it is found", async () => {
    
    const title = "Pikachu"
    const price = 200
    
    const response = await request(app).post("/api/cards").set("Cookie", global.signup()).send({
        title, price
    }).expect(201)

    const card = await request(app).get(`/api/cards/${response.body.id}`).send().expect(200)

    expect(card.body.title).toEqual(title)
    expect(card.body.price).toEqual(price)
})