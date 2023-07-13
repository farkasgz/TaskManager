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
    data.tasks = data.tasks.split(",")
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

router.post("/todo/:todoId/delete", async (req, res) => {
    console.log(req.params)
    try {
        await Todo.findByIdAndDelete(req.params.todoId)
        res.redirect("/home/todo")
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;