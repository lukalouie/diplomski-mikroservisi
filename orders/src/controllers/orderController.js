const Order = require("../models/order")

const getOrders = async (req, res) => {
    let orders

    try {
        orders = await Order.find({})
    } catch (err) {
        res.status(500).send("Could not fetch orders.")
        return
    }


    res.json({ orders: orders.map(order => order.toObject({getters: true}))})
}

const getOrder = async (req, res) => {
    const order = await Order.findById(req.params.id)

    if (!order) {
        res.status(500).send("Could not find order.")
    }

    res.send(order)
}

const createOrder = async (req, res) => {
    console.log("started")

    const {cards, user} = req.body

    const order = new Order(cards, user)


    try {
        await order.save()
    } catch (err) {
        res.status(500).send("Could not create order.")
    }

    res.status(201).json({order: order.toObject({getters: true})})
}

exports.getOrders = getOrders
exports.getOrder = getOrder
exports.createOrder = createOrder