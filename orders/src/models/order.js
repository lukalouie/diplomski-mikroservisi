const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const Schema = mongoose.Schema

const orderSchema = new Schema({
  cards: [{ type: String, required: true}],
  user: { type: String, required: true},
  total: { type: Number, required: true},
  address: { type: String, required: true},
  isDelivered: { type: Boolean, required: true},
  orderId: { type: Number, required: true}
})

orderSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Order', orderSchema)