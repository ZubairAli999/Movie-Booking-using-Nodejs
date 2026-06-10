const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const DB_URL =
      process.env.NODE_ENV === "production"
        ? process.env.PROD_DB_URL
        : process.env.DB_URL;

    await mongoose.connect(DB_URL);

    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.log("MongoDB Connection Failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;