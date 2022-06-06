const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const orderRoutes = require("./routes/orderRoutes");
const rabbit = require("./services/rabbitMQ");
const Order = require("./models/order");

const app = express();
app.set("trust proxy", true);
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(cookieParser());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

app.use("/api/orders", orderRoutes);

console.log();

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

async function markAsDelivered(msg) {
  var order = msg.content;
  console.log("order " + order);
  const saved = await Order.updateMany(
    { orderId: order },
    { $set: { isDelivered: true } }
  );

  if (!saved) {
    console.log("Could not find order.");
  }
  console.log("delivered " + saved.modifiedCount);
}

const run = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined!");
  }

  try {
    await mongoose.connect("mongodb://orders-mongo-srv:27017/orders");
    console.log("connected to mongodb - orders");
  } catch (err) {
    console.error(err);
  }
  try {
    rabbit.receiveMessage("orders_shipping_queue", markAsDelivered);
    console.log("listening for orders");
  } catch (err) {
    console.log("error starting listener");
  }
};

app.listen(3000, () => {
  console.log("listening on port 3K - orders");
});

run();
