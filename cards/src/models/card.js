const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const Schema = mongoose.Schema

const cardSchema = new Schema({
  title: { type: String, required: true },
  evolution: {type: Boolean, required: true, default: false},
  type: { type: String, required: true},
  condition: { type: String, required: true, enum: ["mint", "good", "bad"], default: "bad"},
  price: { type: Number, required: true},
  image: { type: String, required: true},
  description: { type: String, required: true},
  bought: {type: Boolean, required: true, default: false}
})

cardSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Card', cardSchema)