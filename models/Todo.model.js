const { Schema, model } = require("mongoose");

const todoSchema = new Schema(
    {
        title: {
            type: String,
            required: true        
        },
        tasks: {
            type: [Schema.Types.ObjectId],
            ref: "Task"
        },

        startDate: {
            type: Date,
            required: true
        },

        deadline: {
            type: Date,
            required: true
        }

    },
    {
      // this second object adds extra properties: `createdAt` and `updatedAt`    
      timestamps: true
    }
);
  
const Todo = model("Todo", todoSchema);
  
module.exports = Todo;
  