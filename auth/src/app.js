//jshint esversion:6
const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const userRoutes = require('./routes/userRoutes')
const cookieParser = require("cookie-parser")
const cors = require("cors")
const cookieSession = require("cookie-session") 

const app = express()

app.set("trust proxy", true)
app.use(express.static("public"))
app.use(bodyParser.json())
app.use(cookieParser())
//maybe koristit
app.use(
  cookieSession({
    signed: false,
    secure: true
  })
)

app.use(
  cors({
    // Sets Access-Control-Allow-Origin to the UI URI
    origin: "https://poke.dev",
    // Sets Access-Control-Allow-Credentials to true
    credentials: true,
  })
)


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
  next()
})

app.use('/api/users', userRoutes)

/* app.use((req, res) => {
  console.log("first");
  res.status(404)
  return
}) */

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error)
  }
  res.status(error.code || 500)
  res.json({ message: error.message || 'An unknown error occurred!' })
})

const start = async () => {

  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }

  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth")
    console.log("connected to DB")  
  } catch (err) {
    console.log(err)
  }
  app.listen(3000, function() {
    console.log("Server started on port 3000.")
  })
}
 
start()
