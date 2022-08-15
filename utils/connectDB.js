const mongoose = require("mongoose");
const config = require("./config");

function connectDB() {
  try {
    mongoose.connect(
      config.DB_URL,
      {
        useNewUrlParser: true,
      },
      () => console.log("Connected to MongoDB localhost")
    );
  } catch (error) {
    console.log(error);
  }
}

module.exports = connectDB;
