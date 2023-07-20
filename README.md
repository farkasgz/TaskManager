# Task Manager

## [See the App!](https://taskmanager.adaptable.app/)

## Description

A todo app that lets you organize your schedule.

## User Stories

- **signup** - A user can sign up to the webpage
- **login** - A user can login in to the webpage with the account created on the signup
- **homepage** - When a user logs in the homepage shows, from where he can do a few actions
- **logout** - A user can log out of his account
- **todo** - A user can go into the Todo page
- **schedule** - A user can go into the schedule page
- **create and read** - A user can create todos, add tasks to specific todos and set a deadline on them, and then see the created todos
- **update and delete** - A user can update the deadline and delete todos

## Backlog Functionalities

- Make a profile page with statistics of the user (completed tasks, tasks in progress etc)

## Technologies used

Technologies used:

- HTML
- CSS
- JavaScript
- EJS
- Node.js
- Express
- Sessions & Cookies
- MongoDB
- Mongoose

## (Optional) Routes

- GET /
  - renders the start page
- GET /signup
  - renders the signup form
- POST /signup
  - redirects to /login
- GET /login
  - renders the login form
- POST /login

  - redirects to /home if user is logged in
  - renders login form with error message if there is no user or inccorect password and username

- GET /home
  - renders the homepage
- GET /home/logout
  - logs the user out and redirects to /login
- GET /home/schedule
  - renders the schedule
- GET /home/schedule/:date
  - renders the day and the todos of the day clicked on the calendar
- GET /home/todo
  - renders the page to make new todos
- POST /home/todo
  - redirects to /home/todo
- GET /home/todo/:todoId
  - renders the form to make new task and update deadline
- POST /home/todo/:todoId/delete
  - deletes todo and redirects to /home/todo
- POST /home/todo/:todoId
  - updates deadline and redirects to /home/todo/:todoId
- POST /home/todo/:todoId/add
  - adds a task and redirects to /home/todo/:todoId
- POST /home/task/:taskId
  - updates a task

## Models

User model

```
    username: {
      type: String,
      trim: true,
      required: false,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    passwordHash: {
      type: String,
      required: true
    },
    tasks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Todo"
      }
    ]
```

Todo model

```
    title: {
        type: String,
        required: true
    },
    tasks: {
        type: [Schema.Types.ObjectId],
        ref: "Task"
    },
    deadline: {
        type: Date,
    }
```

Task model

```
 title: String,
        completed: {
            type: Boolean,
            default: false
        }

```

## Links

## Collaborators

[Andrej Delinac](https://github.com/Jerdnaa?tab=repositories)

[Gábor Farkas](https://github.com/farkasgz?tab=repositories)

### Project

[Repository Link](https://github.com/farkasgz/TaskManager)

[Deploy Link](https://taskmanager.adaptable.app/)

### Slides

[Slides Link](https://docs.google.com/presentation/d/1qGDmjmlD66cNXXYCciYIQ4qJWmMyp7CKwO6IWeqxYp4/edit?usp=sharing)
