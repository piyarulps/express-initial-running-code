const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env file

console.log('Log 31: Connecting to MongoDB...');

const connectDB = async () => {
  const url = process.env.MONGO_URI; // Get MONGO_URI from .env file
  try {
    await mongoose.connect(url);
    console.log('Log 32: MongoDB connected!');
  } catch (error) {
    console.error(`Log 33: MongoDB connection error: ${error.message}`);
    process.exit(1); // Exit with failure
  }
};

module.exports = connectDB;




// const mongodb =require('mongodb');
// const MongoClient = mongodb.MongoClient;
// const uri = "mongodb+srv://piyarulpsss:root@pro-ps.m89u6.mongodb.net/?retryWrites=true&w=majority&appName=PRO-ps";

// const mongoConnect = (callback) => {
//   MongoClient.connect(uri)
//     .then((client) => {
//       console.log('Connected to MongoDB');
//       callback(client);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

//  module.exports = mongoConnect;
  