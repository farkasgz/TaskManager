const { Schema, model } = require("mongoose");

const taskSchema = new Schema(
    {
        title: String,
        completed: {
            type: Boolean,
            default: false
        }
    }
)

const Task = model("Task", taskSchema);
  
module.exports = Task;