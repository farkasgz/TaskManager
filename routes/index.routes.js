const express = require('express');
const User = require('../models/User.model')
const router = express.Router();
const bcrypt = require('bcryptjs')

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

/*GET signup page */
router.get("/signup", (req, res) => {
  res.render("signup")
})

/*POST signup page*/
router.post("/signup", async (req, res) => {
  const data = { ...req.body }
  delete data.password
  const salt = bcrypt.genSaltSync(13)
  data.passwordHash = bcrypt.hashSync(req.body.password, salt)

  try {
    await User.create(data)
    res.redirect("/login");
  } catch (error) {
    console.log("This is the key", error.keyPattern)
    const key = Object.keys(error.keyPattern)
    if (key[0] === "username") {
      res.render("signup", {errorMessage: "Username already in use"})
    } else if (key[0] === "email") {
      res.render("signup", {errorMessage: "Email already in use"})
    }
  }
})

/*GET login page*/
router.get("/login", (req, res) => {
  res.render("login");
})

/*POST login page*/
router.post("/login", async (req, res) => {
  try {
    const currUser = req.body
    const checkedUser = await User.findOne({username: currUser.username})
    if (checkedUser) {
      if(bcrypt.compareSync(currUser.password, checkedUser.passwordHash)) {
        const loggedUser = { ...checkedUser._doc }
        delete loggedUser.passwordHash
        req.session.user = loggedUser;
        res.redirect("/home")
      } else {
        console.log("Incorrect password or username")
        res.render("login", {errorMessage:"Incorrect password or username"})
      }
    } else {
      console.log("No user with that username")
      res.render("login", {errorMessage: "No user found"})
    }
  } catch (error) {
    console.log(error)
  }
})

module.exports = router;