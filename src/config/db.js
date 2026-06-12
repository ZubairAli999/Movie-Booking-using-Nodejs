const mongoose = require("mongoose");
const logger = require('./logger');

const connectDB = async () => {
  try {
    const DB_URL =
      process.env.NODE_ENV === "production"
        ? process.env.PROD_DB_URL
        : process.env.DB_URL;

    await mongoose.connect(DB_URL);

    logger.info("MongoDB Connected Successfully");
  } catch (error) {
    logger.error(`MongoDB Connection Failed: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;