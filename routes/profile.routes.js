const express = require('express');
const User = require('../models/User.model');
const Todo = require('../models/Todo.model');
const Task = require('../models/Task.model');
const router = express.Router();


/*GET home page*/
router.get("/", (req, res) => {
    res.render("auths/home", {user: req.session.user});
})

router.get("/logout", async (req, res) => {
    req.session.destroy()
    res.redirect("/login")
})

/* GET schedule page*/
router.get("/schedule", (req, res) => {
    res.render("auths/schedule", {user: req.session.user})
})

/* GET day page*/
router.get("/schedule/:date", async (req, res) => {
    const dateNumber = new Number(req.params.date);
    const day = new Date(Math.floor(dateNumber/10000), Math.floor(dateNumber/100)%100-1, dateNumber%100);
    const dayAfter = new Date(day);
    dayAfter.setDate(dayAfter.getDate()+1);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    try {
        const user = await User.findById(req.session.user._id).populate("tasks").select("tasks");
        const userTasks = [];
        user.tasks.forEach(task => {
            if(task.startDate < dayAfter && task.deadline > day){
                userTasks.push(task);
            }
        })
        res.render("auths/day", {day, options, userTasks});
    } catch (error) {
        console.log(error)
    }
})


/*GET todo page*/
router.get("/todo", async (req, res) => {
    try {
        const user = await User.findById(req.session.user._id).populate("tasks")
        const allTasks = user.tasks;
        res.render("auths/todo", {allTasks})
    } catch (error) {
        console.log(error)
    }
})

/*POST todo page*/
router.post("/todo", async (req, res) => {
    const data = req.body;
    try {
        const createdTodo = await Todo.create(data)
        const user = await User.findById(req.session.user._id);
        user.tasks.push(createdTodo._id);
        await user.save();
        res.redirect("/home/todo")
    } catch (error) {
        console.log(error)
    }
})

/*GET one todo page*/
router.get("/todo/:todoId", async (req, res) => {
    const {todoId} = req.params
    const oneTask = await Todo.findById(todoId).populate("tasks")
    console.log(oneTask.deadline)
    res.render("auths/task", {oneTask})
})

 /*POST one todo page */
router.post("/todo/:todoId/delete", async (req, res) => {
    try {
        const {tasks} = await Todo.findById(req.params.todoId);
        tasks.forEach(async (task) => {
            await Task.findByIdAndDelete(task)
        })
        await Todo.findByIdAndDelete(req.params.todoId)
        res.redirect("/home/todo")
    } catch (error) {
        console.log(error)
    }
})

router.post("/todo/:todoId", async (req, res) => {
    const { todoId } = req.params;
    const { deadline } = req.body;
  
    try {
      const todoTask = await Todo.findById(todoId);
      if (!todoTask) {
        return res.status(404).send("Todo task not found");
      }
      todoTask.deadline = deadline;
      await todoTask.save();
  
      res.redirect(`/home/todo/${todoId}`);
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred while updating the deadline");
    }
  });

/*POST add task*/

router.post("/todo/:todoId/add", async (req, res) => {
    const {task} = req.body;
    const {todoId} = req.params
    console.log(task, todoId)
    try {
        const createdTask = await Task.create({title: task});
        await Todo.findByIdAndUpdate({_id: todoId}, {$push: {tasks: createdTask._id}})
        res.redirect(`/home/todo/${todoId}`)
    } catch (error) {
        console.log(error)
    }
})

router.post("/task/:taskId", async (req, res) => {
    const {taskId} = req.params;
    try {
        const task = await Task.findById({_id: taskId});
        const updatedBoolean = !task.completed;
        await Task.findByIdAndUpdate({_id: taskId}, {completed: updatedBoolean})
    } catch (error) {
        console.log(error);
    }
})

module.exports = router;