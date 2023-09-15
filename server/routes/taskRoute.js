const express = require("express");
const router = express.Router();
const Task = require("../models/task");
const isUserAuthorized = require("../middleware/autherizeUser");
const { calculatePriorityAndTimeLeft } = require("../utils/taskUtils");
//const { taskTitle, taskDueDate, userId } = require("../helpers/taskValidation");
const sendResponse = require("../helpers/sendResponse");
const Joi = require("joi");

router.post("/task", isUserAuthorized, async (req, res) => {
  //User should be logged in in order to be able to add tasks
  //logic of creating a new task
  const {
    taskName,
    taskDueDate,
    taskTimeLeft,
    taskDescription,
    taskPriorityLevel,
  } = req.body;
  try {
    const { priority, timeLeft } = calculatePriorityAndTimeLeft(taskDueDate);
    const schema = Joi.object({
      taskName: taskName,
      taskDueDate: taskDueDate,
      taskTimeLeft: taskTimeLeft,
      taskDescription: taskDescription,
      taskPriorityLevel: taskPriorityLevel,
    });

    const validation = schema.validate(req.body);
    if (validation.error) {
      return sendResponse(res, 403, {
        message: validation.error.details[0].message,
      });
    }

    const userId = req.user.userId;

    const newTask = new Task({
      taskName,
      taskDueDate,
      taskDescription,
      taskPriorityLevel: priority,
      taskTimeLeft: timeLeft,
      userId,
    });
    //save the task to database
    await newTask.save();
    console.log(newTask);
    return sendResponse(res, 201, {
      message: `${taskName} created successfully`,
    });
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
