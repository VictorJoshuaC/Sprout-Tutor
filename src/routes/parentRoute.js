const express = require('express');
const router = express.Router();

const {
  viewChildProgress,
  communicateWithTeachers,
  accessCourseMaterials
} = require('../controllers/parentController');

// View the progress and performance of the child in each course
router.get('/children/:childId/progress', viewChildProgress);

// Communicate with the child's teachers
router.get('/children/:childId/teachers', communicateWithTeachers);

// Access course materials for the child's courses
router.get('/children/:childId/materials', accessCourseMaterials);

router.get('/parent', (req, res) => {
  res.send('parent Dashboard');
});

module.exports = router;
