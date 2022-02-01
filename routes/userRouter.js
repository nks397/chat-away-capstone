const express = require("express")
const User = require("../models/User")
const userRouter = express.Router()

// get request that get all users of the app

userRouter.get("/usersList", (req, res, next) => {
    // list all users
    User.find({}).then((users) => {
      res.send(users)
    })


    // find() returns all matching documents in an array, and sends that array to the client.
  })

module.exports = userRouter
