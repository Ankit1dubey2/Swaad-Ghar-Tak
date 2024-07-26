const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const expressLayouts = require("express-ejs-layouts");
const cookieParser = require("cookie-parser");

require("dotenv").config();

const app = express();
app.use(cookieParser());
app.use(express.static("public"));
app.use("/css", express.static(__dirname + "/public/css/"));
app.use("/js", express.static(__dirname + "/public/js/"));
app.use("/img", express.static(__dirname + "/public/img/"));
app.use("/assets", express.static(__dirname + "/assets/"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressLayouts);
app.set("view engine", "ejs");
app.use("/", require("./routes/index"));
app.use("/user", require("./routes/users"));
app.use("/menu", require("./routes/menu"));
app.use("/cart", require("./routes/cart"));
app.use("/orders", require("./routes/orders"));

const database = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected");
  } catch (err) {
    console.log(err);
  }
};
database().then(() => {
  app.listen(
    process.env.PORT,
    console.log(`Server is running on http://localhost:${process.env.PORT}`)
  );
});
