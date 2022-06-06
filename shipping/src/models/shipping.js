const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const shippingSchema = new Schema({
  orderId: { type: String, required: true },
  address: { type: String, required: true },
  isDelivered: { type: Boolean, required: true },
});

shippingSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Shippping", shippingSchema);
