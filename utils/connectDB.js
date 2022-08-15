const mongoose = require("mongoose");
const config = require("./config");

async function connectDB() {
  try {
    await mongoose.connect(config.DB_URL, {
      useNewUrlParser: true,
    });
    console.log("Connected to MongoDB localhost");
  } catch (error) {
    console.log(error);
  }
}

module.exports = connectDB;
