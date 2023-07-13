require('dotenv').config();  // Load environment variables from .env file
require('express-async-errors');  // Handle asynchronous errors in Express
const express = require('express');
const cors = require('cors');
const app = express();
const connectDB = require('./db/connect');
const authenticateUser = require('./middleware/authentication');

// routers
const authRouter = require('./routes/auth');
const teacherRouter = require('./routes/teacherRoutes');
const studentRouter = require('./routes/studentRoutes');
// const parentRouter = require('./routes/parentRoute');
// const dashboard = require ('./routes/Dashboard');



// additional imports
const courseRouter = require('./routes/courseRoute');


// error handler
const sessionMiddleware = require('./middleware/session');
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');


app.use(cors()); // Enable CORS for all routes
app.use(express.json());  // Parse JSON request bodies

// extra packages

// routes
app.get("/", (req, res) => {
  res.send('Welcome to  Sprout Tutor - Learning Management System for Young Children!');
});

app.use('/api/v1/auth', authRouter);  // Mount the authRouter at the /api/v1/auth endpoint
app.use('/api/v1/course' ,courseRouter);

app.use(sessionMiddleware)
app.use('/api/v1/teacher',authenticateUser, teacherRouter);
app.use('/api/v1/student', authenticateUser, studentRouter);
// app.use('/api/v1/parent',authenticateUser, parentRouter);


// app.use('/api/v1/dashboard', authenticateUser, dashboard);


// Error handling middleware

// app.use((err, req, res, next) => {

 // console.error(err.stack);

 // res.status(500).json({ message: 'Internal Server Error' });

//}); 

app.use(notFoundMiddleware);  // Middleware to handle 404 Not Found errors
app.use(errorHandlerMiddleware);  // Middleware to handle other errors


const port = process.env.PORT || 3000;  // Use the PORT environment variable or default to 3000

const start = async () => {
  try {
    await connectDB();  // Connect to the MongoDB database using the MONGODB_URI environment variable
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();  // Start the server
