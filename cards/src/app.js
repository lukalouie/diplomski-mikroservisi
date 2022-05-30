const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const cardRoutes = require("./routes/cardRoutes")
const rabbit = require("./services/rabbitMQ");
const Card = require("./models/card")

const app = express()
app.set("trust proxy", true)
app.use(express.static("public"))
app.use(bodyParser.json())
app.use(cookieParser())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    )
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
    next()
  })

app.use("/api/cards", cardRoutes)

app.use((error, req, res, next) => {
    if (res.headerSent) {
      return next(error)
    }
    res.status(error.code || 500)
    res.json({ message: error.message || 'An unknown error occurred!' })
  })

async function markAsPurchased (msg) {
  var res = msg.content
    consle.log(res);    
}

async function updateToken (msg) {
  var res = msg.content
    consle.log(res);    
}

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
    try{
    rabbit.receiveMessage("card_order_queue", markAsPurchased)
    rabbit.receiveMessage("auth_queue", updateToken)
    console.log("listening for cards")
  }catch(err){
    console.log("error starting listener")
  }
}

app.listen(3000, () => {
    console.log("listening on port 3K!!")
})

run()