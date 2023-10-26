const mongoose = require("mongoose");

//connnecting with database
async function dbConnect() {
  try {
    await mongoose.connect(process.env.Mongo_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Something wrong with DbConnection",error);
    process.exit(1);
  }
}

module.exports = dbConnect;
