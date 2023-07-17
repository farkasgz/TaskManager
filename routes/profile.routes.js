const express = require('express');
const User = require('../models/User.model');
const Todo = require('../models/Todo.model');
const router = express.Router();

/*GET home page*/
router.get("/", (req, res) => {
    res.render("auths/home", {user: req.session.user});
})

router.post("/logout", (req, res) => {
    delete req.session
    res.redirect("/login")
})

/* GET profile page*/
router.get("/profile", (req, res) => {
    res.render("auths/profile", {user: req.session.user});
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
        const user = await User.findById(req.session.user._id).populate("tasks")
        const allTasks = user.tasks
        console.log(user.tasks)
        const relevantTasks = await Todo.find({ $and: [{createdAt: {$lte: dayAfter}}, {deadline: {$gte: day}}] })
        res.render("auths/day", {day, options, relevantTasks, allTasks});
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
    const oneTask = await Todo.findById(todoId)
    // console.log(oneTask)
    res.render("auths/task", {oneTask})
})
 /*POST one todo page */
router.post("/todo/:todoId/delete", async (req, res) => {
    console.log(req.params)
    try {
        await Todo.findByIdAndDelete(req.params.todoId)
        res.redirect("/home/todo")
    } catch (error) {
        console.log(error)
    }
})

/*POST add task*/

router.post("/todo/:todoId/add", async (req, res) => {
    const {task} = req.body;
    const {todoId} = req.params
    console.log(task, todoId)
    try {
        await Todo.findByIdAndUpdate({_id: todoId}, {$push: {tasks: task}})
        res.redirect(`/home/todo/${todoId}`)
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;