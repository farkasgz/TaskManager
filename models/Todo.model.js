const { Schema, model } = require("mongoose");

const todoSchema = new Schema(
    {
        title: {
            type: String,
            required: true        
        },
        tasks: {
            type: [String],
            required: true
        },
        deadline: {
            type: Date,  
        }

    },
    {
      // this second object adds extra properties: `createdAt` and `updatedAt`    
      timestamps: true
    }
  );
  
  const Todo = model("Todo", todoSchema);
  
  module.exports = Todo;
  