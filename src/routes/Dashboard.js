
// am having issues and errors with de normal structure thats why i chain de Routes 


const express = require('express');

const router = express.Router();



const {

  viewCourses,

  enrollCourse,

  accessCourseMaterials,

  submitAssignment,

  trackProgress,

} = require('../controllers/studentController');

const {

  viewChildProgress,

  communicateWithTeachers,

  accessCourseMaterials: accessParentCourseMaterials,

} = require('../controllers/parentController');

const {

  viewCourses: viewTeacherCourses,

  createCourse,

  updateCourse,

  deleteCourse,

  uploadVideo,

  manageStudents,

} = require('../controllers/teacherController');



// Student routes

router.route('/courses').get(viewCourses);

router.route('/courses/:id/enroll').post(enrollCourse);

router.route('/courses/:id/materials').get(accessCourseMaterials);

router.route('/courses/:id/assignments').post(submitAssignment);

router.route('/progress').get(trackProgress);

// Parent routes

router.route('/child/progress').get(viewChildProgress);

router.route('/teachers').post(communicateWithTeachers);

router.route('/child/courses/:id/materials').get(accessParentCourseMaterials);

// Teacher routes

router.route('/teacher/courses').get(viewTeacherCourses).post(createCourse);

router.route('/teacher/courses/:id/materials').post(uploadCourseMaterial);

router.route('/teacher/courses/:id').put(editCourse).delete(deleteCourse);

router.route('/teacher/courses/:id/students').get(manageStudents);

module.exports = router;


