const express = require('express');
const router = express.Router();

const {
  teacher,
  createCourse,
  updateCourse,
  deleteCourse,
  uploadVideo,
  manageStudents,
  logout,
} = require('../controllers/teacherController');

router.get('/dashboard', teacher)

// Create a new course
router.post('/courses', createCourse);

// Update an existing course
router.put('/courses/:courseId', updateCourse);

// Delete a course
router.delete('/courses/:courseId', deleteCourse);

// Upload a video for a course
router.post('/courses/:courseId/videos', uploadVideo);

// Manage students for a course
router.get('/courses/:courseId/students/:userId', manageStudents);



// Logout route
router.get('/logout', logout)

module.exports = router;
