const express = require("express")
const User = require("../models/User")
const userRouter = express.Router()

// get request that get all users of the app
userRouter.get("/usersList", (req, res, next) => {
    User.find({}).then((users) => {
      res.send(users)
    })
    // find() returns all matching documents in an array, and sends that array to the client.
  })

// update profile picture
userRouter.put("/updateProfilePic/:id", (req, res) => {
  User.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new: true},
    (err, updatedProfilePic) => {

      if(err) {
        res.status(500)
        return next
      }
      if(!req.body) {
        res.status(500)
        throw Error("Req.body is missing!")
      }
        return res.status(201).send(updatedProfilePic)
    }
  )
})

userRouter.get("/getUserSettings/:id", (req, res, next) => {
  User.findById({_id: req.params.id}, (err, user) => {
    if(err) {
      res.status(500)
      return next
    }
    const userSettings = {
      theme: user.theme,
      profilePic: user.profilePic
    }
    
    return res.status(200).send(userSettings)
  })
})

// update user's theme
userRouter.put("/updateUserTheme/:id", (req, res, next) => {
  
  User.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new: true},
    (err, updatedTheme) => {
      
      if(err) {
        res.status(500)
        console.log("hitting error")
        return next
      }

      return res.status(201).send(updatedTheme)
    }
  )
})


module.exports = userRouter