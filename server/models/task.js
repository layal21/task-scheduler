const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    taskName: {
        type: String,
        required: true
    },
    taskDueDate: {
        type: Date,
        required: true
    },
    taskTimeLeft: String,
    taskDescription: String,
    taskPriorityLevel: String,
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    notification: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Notification'
        }
    ]
})
taskSchema.index({dueDate: 1})
const Task = mongoose.model('Task',taskSchema)

module.exports = Task
