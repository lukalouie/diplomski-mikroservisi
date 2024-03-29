const Order = require("../models/order")
const rabbit = require("../services/rabbitMQ");

const getOrders = async (req, res) => {
    let orders

    try {
        orders = await Order.find({})
    } catch (err) {
        return res.status(500).send("Could not fetch orders.")
    }

    res.json({ orders: orders.map(order => order.toObject({getters: true}))})
}

const getOrder = async (req, res) => {
    const order = await Order.findById(req.params.id)

    if (!order) {
     return res.status(500).send("Could not find order.")
    }

    res.send(order)
}

const createOrder = async (req, res) => {
    console.log("started")
    console.log(req.body)

    const {cards, user, total, address, isDelivered, orderId} = req.body

    const order = new Order({cards, user, total, address, isDelivered, orderId})

    try {
        await order.save()
    } catch (err) {
        return res.status(500).send("Could not create order.")
    }
    rabbit.sendCardOrder("card_order_queue", cards);
    console.log("sent card "+cards)
    res.status(201).json({order: order.toObject({getters: true})})
    
}

exports.getOrders = getOrders
exports.getOrder = getOrder
exports.createOrder = createOrder