

const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');
const Course = require('../models/Course');
const {User} = require('../models/User');

const viewChildProgress = async (req, res) => {
  try {
    // View the progress and performance of the child in each course
    // Fetch the child's courses and progress from the database
    const childId = req.params.childId;
    const courses = await Course.find({ child: childId });
    const progress = await User.findById(childId, 'progress');

    res.status(StatusCodes.OK).json({ courses, progress });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
  }
};

const communicateWithTeachers = async (req, res) => {
  try {
    // Communicate with the child's teachers
    // Fetch the child's teachers and communication channels from the database
    const childId = req.params.childId;
    const teachers = await User.find({ role: 'teacher', children: childId });

    res.status(StatusCodes.OK).json({ teachers });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
  }
};

const accessCourseMaterials = async (req, res) => {
  try {
    // Access course materials for the child's courses
    // Fetch the child's courses and their materials from the database
    const childId = req.params.childId;
    const courses = await Course.find({ child: childId }).populate('materials');

    res.status(StatusCodes.OK).json({ courses });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
  }
};



module.exports = {

  viewChildProgress,

  communicateWithTeachers,

  accessCourseMaterials,

};

