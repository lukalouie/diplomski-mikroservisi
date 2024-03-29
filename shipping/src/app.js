const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const shippingRoutes = require("./routes/shippingRoutes");

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


app.use("/api/shipping", shippingRoutes);

console.log();

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

const run = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined!");
  }

  try {
    await mongoose.connect("mongodb://shipping-mongo-srv:27017/shipping");
    console.log("connected to mongodb - shipping");
  } catch (err) {
    console.error(err);
  }
};

app.listen(3000, () => {
  console.log("listening on port 3K - shipping");
});

run();
