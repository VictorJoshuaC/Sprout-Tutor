
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');
const Course = require('../models/Course');
const {User} = require('../models/User');
const { json } = require('express');

const student = async (req, res) => {
  // if (!req.session.user || req.session.user.role !== 'student') {
  //   return res.json({ error: 'Internal Server Error' });
  // }

  res.json(req.user);
  // res.send('rar')
  // { user: req.session.user }
  // res.status(StatusCodes.OK).json({ user: req.session.user });

};

const viewCourses = async (req, res) => {
  try {
    // View available courses
    const courses = await Course.find();
    res.status(StatusCodes.OK).json({ courses });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
  }
};

const enrollCourse = async (req, res) => {
  try {
    // Enroll in a course
    const { courseId } = req.params;
    const userId = req.user.id;

    // Check if the course exists
    const course = await Course.findById(courseId);
    if (!course) {
      throw new NotFoundError('Course not found');
    }

    // Add the user to the course's students
    course.students.push(userId);
    await course.save();

    res.status(StatusCodes.OK).json({ message: 'Successsfully enrolled in the course' });
  } catch (error) {
    // Handle errors
    console.error(error);
    if (error instanceof NotFoundError) {
      res.status(StatusCodes.NOT_FOUND).json({ error: error.message });
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
  }
};

const accessCourseMaterials = async (req, res) => {
  try {
    // Access course materials for a specific course
    const { courseId } = req.params;

    // Fetch the course and its materials from the database
    const course = await Course.findById(courseId).populate('materials');

    if (!course) {
      throw new NotFoundError('Course not found');
    }

    res.status(StatusCodes.OK).json({ course });
  } catch (error) {
    // Handle errors
    console.error(error);
    if (error instanceof NotFoundError) {
      res.status(StatusCodes.NOT_FOUND).json({ error: error.message });
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
  }
};

const submitAssignment = async (req, res) => {
  try {
    // Submit an assignment for a specific course
    const { courseId } = req.params;
    const { assignmentId, submission } = req.body;
    const userId = req.user.id;

    // Find the course and check if the assignment exists
    const course = await Course.findById(courseId);
    if (!course) {
      throw new NotFoundError('Course not found');
    }

    const assignment = course.assignments.id(assignmentId);
    if (!assignment) {
      throw new NotFoundError('Assignment not found');
    }

    // Submit the assignment for the user
    assignment.submissions.push({ student: userId, submission });
    await course.save();

    res.status(StatusCodes.OK).json({ message: 'Assignment submitted successfully' });
  } catch (error) {
    // Handle errors
    console.error(error);
    if (error instanceof NotFoundError) {
      res.status(StatusCodes.NOT_FOUND).json({ error: error.message });
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
  }
};

const trackProgress = async (req, res) => {

  try {

    // Track progress and view achievements for a student

    const userId = req.user.id;

    // Fetch the user's progress and achievements from the database

    const user = await User.findById(userId).populate('courses');

    if (!user) {

      throw new NotFoundError('User not found');

    }

    res.status(StatusCodes.OK).json({ user });

  } catch (error) {

    // Handle errors

    console.error(error);

    if (error instanceof NotFoundError) {

      res.status(StatusCodes.NOT_FOUND).json({ error: error.message });

    } else {

      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });

    }

  }

};

const logout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
    }
    res.redirect('/');
  });
};




module.exports = {
  student,

  viewCourses,

  enrollCourse,

  accessCourseMaterials,

  submitAssignment,

  trackProgress,

  logout

};

