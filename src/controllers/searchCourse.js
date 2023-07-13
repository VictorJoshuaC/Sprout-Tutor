

const { StatusCodes } = require('http-status-codes');
const {Course} = require('../models/Course');

const searchCourses = async (req, res) => {
  try {
    const { searchQuery } = req.query;

    // Using a regular expression to perform a case-insensitive search
    const regex = new RegExp(searchQuery, 'i');

    // Search for courses by title
    const courses = await Course.find({ title: regex }).exec();

    if (courses.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({ error: 'No courses found' });
    }

    res.status(StatusCodes.OK).json({ courses });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  searchCourses,
};
