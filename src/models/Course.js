const mongoose = require('mongoose');
const Joi = require('joi');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  courseMaterials: {
    type: [String],
    default: []
  },
  videos: {
    type: [String],
    default: []
  },
  assignments: {
    type: [String],
    default: []
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
}, { timestamps: true });

const Course = mongoose.model('Course', courseSchema);

// Joi schema for course validation
const courseJoiSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  courseMaterials: Joi.array().items(Joi.string()),
  videos: Joi.array().items(Joi.string()),
  assignments: Joi.array().items(Joi.string()),
  instructor: Joi.string().required(),
  duration: Joi.number().required(),
  price: Joi.number().required(),
});

module.exports = {
  Course,
  courseJoiSchema,
};
