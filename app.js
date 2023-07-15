// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require('dotenv').config()

// ℹ️ Connects to the database
require('./db')

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require('express')

const app = express()

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require('./config')(app)
require("./config/session")(app)

// default value for title local
const capitalize = require('./utils/capitalize')
const projectName = 'taskManager'

app.locals.appTitle = `${capitalize(projectName)} created with IronLauncher`

//To handle navbar conditional
app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});

// 👇 Start handling routes here
const indexRoutes = require('./routes/index.routes')
app.use('/', indexRoutes)

const profileRouts = require("./routes/profile.routes")
const {isLoggedIn} = require("./middlewares/guard.middleware")
app.use("/home", profileRouts);


// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require('./error-handling')(app)

module.exports = app
