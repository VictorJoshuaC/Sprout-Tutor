const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');
const { courseJoiSchema } = require('../models/Course');

const Course = require('../models/Course');
const { User } = require('../models/User');


const teacher = async (req, res) => {
  // if (!req.session.user || req.session.user.role !== 'teacher') {
  //   return res.redirect('/');
  // }
  res.send('teacherDashboard')
};

const createCourse = async (req, res) => {
  try {
    // Validate the request body using the Joi schema
    const { error } = courseJoiSchema.validate(req.body);
    if (error) {
      throw new BadRequestError(error.details[0].message);
    }

    // Create a new course
    const { title, description, instructor } = req.body;

    // Create a new course instance
    const course = new Course({
      title,
      description,
      instructor,
    });

    // Save the course to the database
    await course.save();

    res.status(StatusCodes.CREATED).json({ course });
  } catch (error) {
    // Handle errors
    console.error(error);
    if (error instanceof BadRequestError || error instanceof NotFoundError) {
      res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
  }
};

const updateCourse = async (req, res) => {
  try {
    // Validate the request body using the Joi schema
    const { error } = courseJoiSchema.validate(req.body);
    if (error) {
      throw new BadRequestError(error.details[0].message);
    }

    // Update an existing course
    const { courseId } = req.params;
    const { title, description } = req.body;

    // Find the course by ID
    const course = await Course.findById(courseId);

    if (!course) {
      throw new NotFoundError('Course not found');
    }

    // Update the course details
    course.title = title;
    course.description = description;

    // Save the updated course
    await course.save();

    res.status(StatusCodes.OK).json({ course });
  } catch (error) {
    // Handle errors
    console.error(error);
    if (error instanceof BadRequestError || error instanceof NotFoundError) {
      res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
  }
};



const deleteCourse = async (req, res) => {
  try {
    // Delete a course
    const { courseId } = req.params;

    // Find the course by ID
    const course = await Course.findById(courseId);

    if (!course) {
      throw new NotFoundError('Course not found');
    }

    // Delete the course
    await course.remove();

    res.status(StatusCodes.NO_CONTENT).send();
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

const uploadVideo = async (req, res) => {
  try {
    // Upload a video for a course
    const { courseId } = req.params;
    const { videoUrl } = req.body;

    // Find the course by ID
    const course = await Course.findById(courseId);

    if (!course) {
      throw new NotFoundError('Course not found');
    }

    // Add the video URL to the course's videos array
    course.videos.push(videoUrl);

    // Save the updated course
    await course.save();

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



const manageStudents = async (req, res) => {

  try {

    const { courseId, userId } = req.params;

    // Check if the course exists

    const course = await Course.findById(courseId);

    if (!course) {

      throw new NotFoundError('Course not found');

    }

    // Check if the user is a teacher of the course

    const teacher = await User.findById(userId);

    if (!teacher || !teacher.isTeacher) {

      throw new BadRequestError('User is not authorized to manage students');

    }

    // Get the list of enrolled students for the course

    const students = await User.find({ courses: courseId });

    res.status(StatusCodes.OK).json({ students });

  } catch (error) {

    // Handle errors

    console.error(error);

    if (error instanceof NotFoundError) {

      res.status(StatusCodes.NOT_FOUND).json({ error: error.message });

    } else if (error instanceof BadRequestError) {

      res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });

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

  teacher,

  createCourse,

  updateCourse,

  deleteCourse,

  uploadVideo,

  manageStudents,

  logout,

};

