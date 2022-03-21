const express = require("express")
const authRouter = express.Router()
const User = require("../models/User")
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
const jwt = require("jsonwebtoken")


authRouter.post("/signup", upload.single("image"), async (req, res, next) => {
  const result = await cloudinary.uploader.upload(req.file.path);
    User.findOne({username: req.body.username.toLowerCase()}, (err, user) => {
        if(err){
            res.status(500) 
            return next(err)
        }
        // if user exists
        if(user){
            res.status(403)
            return next(new Error("That username is already taken."))
        }

        console.log(result.secure_url, "url result")
        console.log(result, "result")
        // if user doesn't exist, then save user
        const newUser = new User({
          username: req.body.username,
          password: req.body.password,
          profilePic: result.secure_url,
          // theme: req.body.theme
          // cloudinaryId: result.public_id
        })
        newUser.save((err, savedUser) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            // payload, secret
            // savedUser.toObject is in the form of an object.
        
            // const token = jwt.sign(savedUser.withoutPassword(), process.env.SECRET)
            // return res.status(201).send({token, user: savedUser.withoutPassword(), membersInArr})
            const token = jwt.sign(savedUser.withoutPassword(), process.env.SECRET)
            return res.status(201).send({token, user: savedUser.withoutPassword()})
            // const token = jwt.sign(savedUser.toObject(), process.env.SECRET)
            // return res.status(201).send({token, user: savedUser})
        })
    })
})

// login

authRouter.post("/login", (req, res, next) => {
    // first argument is what we are trying to find and the second is a call back function
  
    User.findOne({ username: req.body.username.toLowerCase()}, (err, user) => {
        if(err){
          res.status(500)
          return next(err)
        }
        if(!user){
          res.status(403)
          return next(new Error("Username or Password are incorrect"))
        }
    
        user.checkPassword(req.body.password, (err, isMatch) => {
          if(err) {
            res.status(403)
            return next(new Error("Username or Password are incorrect"))
          }
          if(!isMatch){
            res.status(403)
            return next(new Error(`Username or Password are incorrect`))
          }
          const token = jwt.sign(user.withoutPassword(), process.env.SECRET)
          return res.status(200).send({ token, user: user.withoutPassword() })
        })
      })
})

module.exports = authRouter