const Shipping = require("../models/shipping")
const rabbit = require("../services/rabbitMQ");

const getShippings = async (req, res) => {
    let shippings

    try {
        shippings = await Shipping.find({})
    } catch (err) {
        return res.status(500).send("Could not fetch shipments.")
    }

    res.json({ shippings: shippings.map(shipping => shipping.toObject({getters: true}))})
}

const getShipping = async (req, res) => {
    const shipping = await Shipping.findById(req.params.id)

    if (!shipping) {
     return res.status(500).send("Could not find shipment.")
    }

    res.send(shipping)
}

const createShipping = async (req, res) => {

    const {orderId, address} = req.body

    console.log(orderId)

    const shipping = new Shipping({orderId, address, isDelivered: false})

    try {
        await shipping.save()
        console.log(shipping)
    } catch (err) {
        return res.status(500).send("Could not create shipment.")
    }
    res.status(201).json({shipping: shipping.toObject({getters: true})})
    
}

const updateShipping = async (req, res) => {

    const {orderId, isDelivered} = req.body
    
    const shipping = await Shipping.findOneAndUpdate({orderId: orderId}, {isDelivered: isDelivered})

    if (!shipping) {
        res.status(500).send("Could not find shipment.")
    }
    rabbit.sendMessage("orders_shipping_queue", orderId);
    res.status(201).json({shipping: shipping.toObject({getters: true})})
}

exports.getShipping = getShipping
exports.getShippings = getShippings
exports.createShipping = createShipping
exports.updateShipping = updateShipping