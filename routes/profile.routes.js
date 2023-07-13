const express = require('express');
const User = require('../models/User.model');
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
router.get("/todo", (req, res) => {
    res.render("auths/todo")
})

module.exports = router;