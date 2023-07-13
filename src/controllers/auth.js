const { User } = require('../models/User');  // Import the User model from '../models/User'
const { userJoiSchema } = require('../models/User');

const { StatusCodes } = require('http-status-codes');  // Import the StatusCodes object from 'http-status-codes' library
const { BadRequestError, UnauthenticatedError, NotFoundError } = require('../errors/index');  // Import custom error classes
const nodemailer = require('nodemailer');
const { json } = require('express');
const {teacher} = require('./teacherController');
const {student} = require('./studentController');



const register = async (req, res) => {
  // Registration endpoint
  const { name, email, password, role } = req.body; // Create a new user based on the request body

  const { error } = userJoiSchema.validate({ name, email, password, role}); // Generate a JSON Web Token (JWT) for the user

  if (error) {
    throw new BadRequestError(error.details[0].message);
  }

  // Assign the role based on the button clicked
  let assignedRole = 'student';
  if (role === 'teacher') {
    assignedRole = 'teacher';
  }

  // Check if the email already exists
  const emailExists = await User.findOne({ email });
  if (emailExists) {
    return res.status(400).json({ error: 'Email already exists' });
  }

  const user = await User.create({ name, email, password, role: assignedRole, });
  const token = user.createJWT();   
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });  // Respond with the created user's name and the generated token
};

// const login = async (req, res) => {
//   const { email, password } = req.body;  // Get the email and password from the request body
  
//   const { error } = userJoiSchema.validate({ email, password });
//     if (error) {
//       throw new BadRequestError(error.details[0].message);
//     }

//   if (!email || !password) {
//     throw new BadRequestError('Please input email and password');  // Throw an error if email or password is missing
//   }

//   const user = await User.findOne({ email });  // Find a user with the provided email in the database
//   if (!user) {
//     throw new UnauthenticatedError('Invalid Credentials');  // Throw an error if the user is not found
//   }

//   const isPasswordCorrect = await user.comparePassword(password);  // Compare the provided password with the user's hashed password
//   if (!isPasswordCorrect) {
//     throw new UnauthenticatedError('Invalid Credentials');  // Throw an error if the password is incorrect
//   }

//   const token = user.createJWT();  // Generate a JSON Web Token (JWT) for the user

//   // Redirect the user based on their role
//   res
//     .status(StatusCodes.OK)
//     .json({ user: { name: user.name }, userId: { _di: user._id }, token });  // Respond with the user's name, userId, and the generated token

//   if (user.role === 'teacher') {
//     return res.redirect('teacher/dashboard');
//   } else if (user.role === 'student') {
//     return res.redirect('student/dashboard');
//   } else if (user.role === 'parent') {
//     return res.redirect('/parent');
//   } else {
//     return res.send('role not found');
//   }

  

// };


const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate request body using userJoiSchema
    const { error } = userJoiSchema.validate({ email, password });
    if (error) {
      throw new BadRequestError(error.details[0].message);
    }

    if (!email || !password) {
      throw new BadRequestError('Please provide both email and password');
    }

    // Find the user in the database
    const user = await User.findOne({ email });
    if (!user) {
      throw new UnauthenticatedError('Invalid credentials');
    }

    // Compare the provided password with the user's hashed password
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      throw new UnauthenticatedError('Invalid credentials');
    }

    // Generate a JSON Web Token (JWT) for the user
    const token = user.createJWT();

    // Respond with the user's name, userId, and the generated token
    res.status(StatusCodes.OK).json({
      user: { name: user.name },
      userId: { _di: user._id },
      token
    });

    
    
    // // Redirect the user based on their role
    // if (user.role === 'teacher') {
    //   return teacher(req, res);
    // } else if (user.role === 'student') {
    //   return student(req, res);
    // } else if (user.role === 'parent') {
    //   return res.redirect('/parent');
    // } else {
    //   throw new NotFoundError('Role not found');
    // }
  } catch (error) {
    // Handle any thrown errors
    console.error(error);
    res.status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};








// const { randomInt } = require('crypto');
// const { check, validationResult } = require('express-validator');








const resetPassword = async (req, res) => {
  const { email, name} = req.body;

  // Check if the user exists
  const user = await User.findOne({ email });
  if (!user) {
    throw new NotFoundError('User not found');
  }

  // Generate random 6-digit number
  const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

  // Store the verification code and expiry time in the user document
  user.resetToken = verificationCode;
  user.resetTokenExpiry = Date.now() + 30 * 60 * 1000; // 30 minutes expiry
  await user.save();

  // Send the verification code to the user's email using Nodemailer
  const transporter = nodemailer.createTransport({
    // Configure your email provider's SMTP settings
    service: 'gmail',
    auth: {
      user: 'mefavour310@gmail.com',
      pass: process.env.NODEMAILER_PASS,
    },
  });

  // Extract the user name from the email address
  let emall = email;
  const userName = emall.split("@")[0];
  // Password reset code message
  const htmlMessage = `
    <h1>Password Reset Code</h1>
    <p>Dear ${userName}</p>
    <p>We have received a request to reset your password. Please use the following verification code to proceed:</p>
    <div style="background-color: #f5f5f5; border-radius: 4px; color: #333; font-size: 20px; font-weight: bold; margin: 0 auto; padding: 10px; text-align: center; width: 150px;">${verificationCode}</div>
    <p style="color: #777; font-size: 14px; text-align: center;">Note: This code is valid for 30 minutes only.</p>
    <a href="#" style="background-color: #4CAF50; border: none; border-radius: 4px; color: #fff; cursor: pointer; display: inline-block; font-size: 16px; margin-top: 20px; padding: 10px 20px; text-align: center; text-decoration: none; transition-duration: 0.4s;">Reset Password</a>
    <p>If you didn't request this password reset, please ignore this email.</p>
    <p>Best regards,<br>Sprout Tutor</p>
    `;

  const mailOptions = {
    from: 'mefavour310@gmail.com',
    to: email,
    subject: 'Reset Password Verification Code',
    html: htmlMessage
  };

  await transporter.sendMail(mailOptions);

  res.status(StatusCodes.OK).json({ message: 'Verification code sent to email' });
};



const changePassword = async (req, res) => {
  const { email, verificationCode, newPassword } = req.body;

  // Check if the user exists
  const user = await User.findOne({ email });
  if (!user) {
    throw new NotFoundError('User not found');
  }

  // Check if the verification code matches and is not expired
  if (user.resetToken !== verificationCode || user.resetTokenExpiry < Date.now()) {
    throw new BadRequestError('Invalid or expired verification code');
  }

  // Update the user's password and reset token
  await user.updatePassword(newPassword);

  res.status(StatusCodes.OK).json({ message: 'Password reset successful' });
};

// Assuming you have the necessary imports and dependencies already set up

// Create the first admin account
// const createFirstAdmin = async () => {
//   const adminData = {
//     name: 'jhn Name',
//     email: 'parent@example.com',
//     password: 'password1'
//   };

//   try {
//     // Check if the admin account already exists
//     const existingAdmin = await User.findOne({ role: 'parent' });

//     if (existingAdmin) {
//       console.log('Admin account already exists');
//       return;
//     }

//     // Create the admin account
//     const admin = await User.create({ ...adminData, role: 'parent' });
//     console.log('Admin account created successfully:', admin);
//   } catch (error) {
//     console.error('Error creating admin account:', error);
//   }
// };

// // Call the function to create the first admin account
// createFirstAdmin();


module.exports = {
  register,
  login,
  resetPassword,
  changePassword
};




