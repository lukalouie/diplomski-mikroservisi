import {MongoMemoryServer} from "mongodb-memory-server"
import mongoose from "mongoose"
import { app } from "../app"
import request from "supertest"
import jwt from "jsonwebtoken"

declare global {
    var signup: () => string[] 
}

//stvorimo instancu mongodb mem servera prije svakog testa tako da se vise testova moze
//vrtit odjednom da ne moraju svi zavirati u istu kolekciju
let mongo: any

//hook funkcija
beforeAll(async () => {

    process.env.JWT_KEY = "louie"
    mongo = await MongoMemoryServer.create()
    const mongoUri = mongo.getUri()

    await mongoose.connect(mongoUri, {
    })
})

//reset date prije svakog testa
beforeEach(async () => {
    const collections = await mongoose.connection.db.collections()

    for (let collection of collections) {
        await collection.deleteMany({})
    } //brise sve prije testa


})

//zaustavi mongo nakon testa
afterAll(async () =>{
    await mongo.stop()
    await mongoose.connection.close()
})

global.signup = () => {
    //build JWT payload {id, email}
    const payload = {
        id: "asjnfdgjao",
        email: "test@cardscont.com"
    }
    //create JWT
    const token = jwt.sign(payload, process.env.JWT_KEY!)

    //build session object {jwt: MY_JWT}
    const session = { jwt: token }

    //turn into json
    const sessionJSON = JSON.stringify(session)

    //encode json as base64
    const base64 = Buffer.from(sessionJSON).toString("base64")

    //return string odnosno cookie sa encoded datom
    return [`express:sess=${base64}`]
}