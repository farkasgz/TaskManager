const express = require('express');
const User = require('../models/User.model');
const Todo = require('../models/Todo.model');
const router = express.Router();

/*GET home page*/
router.get("/", (req, res) => {
    res.render("auths/home", {user: req.session.user});
})

/* GET profile page*/
router.get("/profile", (req, res) => {
    res.render("auths/profile", {user: req.session.user});
})

/* GET schedule page*/
router.get("/schedule", (req, res) => {
    res.render("auths/schedule")
})

/* GET day page*/
router.get("/schedule/:date", async (req, res) => {
    const dateNumber = new Number(req.params.date);
    const day = new Date(Math.floor(dateNumber/10000), Math.floor(dateNumber/100)%100-1, dateNumber%100);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    try {
        const relevantTasks = await Todo.find({ $and: [{createdAt: {$lte: day}}, {deadline: {$gte: day}}] })
        res.render("auths/day", {day, options, relevantTasks});
    } catch (error) {
        console.log(error)
    }
})


/*GET todo page*/
router.get("/todo", async (req, res) => {
    try {
        const allTasks = await Todo.find()
        res.render("auths/todo", {allTasks})
    } catch (error) {
        console.log(error)
    }
    
})

/*POST todo page*/
router.post("/todo", async (req, res) => {
    const data = req.body;
    try {
        Todo.create(data)
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

/*WORK IN PROGRESS HUUUGE ERROR*/

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