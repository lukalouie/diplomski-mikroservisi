const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const Schema = mongoose.Schema

const orderSchema = new Schema({
  cards: [{ type: String, required: true}],
  user: { type: String, required: true}
})

orderSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Order', orderSchema)