const mongoose = require('mongoose');  // Import the Mongoose library for working with MongoDB

// Connect to MongoDB database
const mongoDB = process.env.MongoDB_URI;
mongoose.set('strictQuery',true);
const connectDB = () => {
  // Function for connecting to the database
  return mongoose.connect(mongoDB, {
    useNewUrlParser: true,  // Use new URL parser
    useCreateIndex: true,  // Use index creation
    useFindAndModify: false,  // Disable find and modify operations (deprecated)
    useUnifiedTopology: true,  // Use new server discovery and monitoring engine
  }).then(() => console.log('database: connected!')).catch(err => console.log(err));
};




module.exports = connectDB;  // Export the connectDB function to be used in other files
