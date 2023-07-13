const express = require('express');
const router = express.Router();
const { searchCourses } = require('../controllers/searchCourse');

// Search for courses by name
router.get('/courses/search', searchCourses);

module.exports = router;
