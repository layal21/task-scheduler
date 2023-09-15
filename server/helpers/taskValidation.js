const Joi = require("joi");

const taskName = Joi.string().required();
const taskDueDate = Joi.date().required();
const taskDescription = Joi.string();
const taskPriorityLevel = Joi.string();
const userId = Joi.string().required();

module.exports = {
  taskName,
  taskDueDate,
  taskDescription,
  taskPriorityLevel,
  userId,
};
