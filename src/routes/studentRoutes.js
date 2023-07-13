const express = require('express');
const router = express.Router();

const {
  student,
  viewCourses,
  enrollCourse,
  accessCourseMaterials,
  submitAssignment,
  trackProgress,
  logout
} = require('../controllers/studentController');

// View available courses
router.get('/courses', viewCourses);

// Enroll in a course
router.post('/courses/:courseId/enroll', enrollCourse);

// Access course materials for a specific course
router.get('/courses/:courseId/materials', accessCourseMaterials);

// Submit an assignment for a specific course
router.post('/courses/:courseId/assignments', submitAssignment);

// Track progress and view achievements for a student
router.get('/progress', trackProgress);

router.get('/dashboard', student);

// Logout route
router.get('/logout', logout)


module.exports = router;
