import request from "supertest"
import { app } from "../../app"
import { Card } from "../../models/card"

it("route handler listening to /api/cards for post req", async () => {
    const response = await request(app).post("/api/cards").send({})

    expect(response.status).not.toEqual(404)
})

it("checks if user is signed in", async () => {
   await request(app).post("/api/cards").send({}).expect(401)
})

it("returns !401 if user is signed in", async () => {
    const response = await request(app).post("/api/cards").set("Cookie", global.signup()).send({})

    expect(response.status).not.toEqual(401)
 })

it("throws error for invalid title", async () => {
    await request(app).post("/api/cards").set("Cookie", global.signup()).send({
        title: "",
        price: 10
    }).expect(400)

    await request(app).post("/api/cards").set("Cookie", global.signup()).send({
        price: 10
    }).expect(400)
    
})

it("throws error for invalid price", async () => {
    await request(app).post("/api/cards").set("Cookie", global.signup()).send({
        title: "Charizard",
        price: -10
    }).expect(400)

    await request(app).post("/api/cards").set("Cookie", global.signup()).send({
        title: "Charizard"
    }).expect(400)
})

it("creates valid card", async () => {
    let cards = await Card.find({})
    expect(cards.length).toEqual(0)


    await request(app).post("/api/cards").set("Cookie", global.signup()).send({
        title: "Pikachu",
        price: 200
    }).expect(201)

    cards = await Card.find({})
    expect(cards.length).toEqual(1)
    expect(cards[0].title).toEqual("Pikachu")
    
})