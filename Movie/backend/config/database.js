/**
 * Database Configuration
 * 
 * This file handles the MongoDB connection using Mongoose.
 * Mongoose is an ODM (Object Data Modeling) library for MongoDB.
 */

const mongoose = require('mongoose');

/**
 * Connect to MongoDB database
 * Uses the MONGODB_URI from environment variables
 */
const connectDB = async () => {
  try {
    // mongoose.connect() returns a promise, so we use await
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      // These options prevent deprecation warnings
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Error connecting to MongoDB: ${error.message}`);
    // Exit process if database connection fails
    process.exit(1);
  }
};

module.exports = connectDB;
