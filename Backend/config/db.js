const mongoose = require('mongoose');
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/HEALTHYSUPP', {
    });
    console.log('MongoDB Connection Success.');
  }
  catch (error) {
    console.log(error);
    process.exit(1);
  }
};
module.exports = connectDB;
