import mongoose from "mongoose"
import { app } from "../src/app"

const run = async () => {

    if(!process.env.JWT_KEY) {
        throw new Error("JWT_KEY must be defined!")
    }
    
    try {
        await mongoose.connect("mongodb://cards-mongo-srv:27017/cards")
        console.log("connected to mongodb")
    } catch (err) {
        console.error(err)
    }
}

app.listen(3000, () => {
    console.log("listening on port 3K!!")
})

run()