const express = require("express")
const User = require("../models/User")
const userRouter = express.Router()
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");

// get request that get all users of the app

userRouter.get("/usersList", (req, res, next) => {
    // list all users
    User.find({}).then((users) => {
      res.send(users)
    })


    // find() returns all matching documents in an array, and sends that array to the client.
  })

// get user image
// userRouter.get("/getUserImage/:id", async (req, res) => {
//   try {
//     let user = await User.findbyId(req.param.id);
//     if (!user)
//       res.status(404)
//       .send({
//         message: "User not found!"
//       });
//     res.status(200)
//       .send(JSON(user));
//   } catch (err) {
//     console.log(err);
//   }
// })

// userRouter.delete("/:id", async (req, res) => {
//   try {
//     // Find user by id
//     let user = await User.findById(req.params.id);
//     // Delete image from cloudinary
//     await cloudinary.uploader.destroy(user.cloudinary_id);
//     // Delete user from db
//     await user.remove();
//     res.json(user);
//   } catch (err) {
//     console.log(err);
//   }
// })

// An update option is not provided by Cloudinary under cloudinary.uploader so updating is done by first deleting and then uploading a new image and modifying the user profile in the database accordingly within the same route. Code for PUT route is as follows,

// get user
// userRouter.get("/getUser/:_id", (req, res, next) => {
//     User.find({_id: req.params._id}, (err, user) => {
//       console.log(user, "user")
//       if(err) {
//       res.status(500)
//       return next(err)
//       }
//     return res.status(200).send(user)
//   })
// })
// userRouter.get("/getProfilePic", (req, res) => {
//  User.find({profilePic: req.body.profilePic}, (err, user) => {
//   if(err){
//     res.status(500)
//     return next
//   }
//   console.log(user, "user")
//   return res.status(200).send(user)
//  })
// })
// messageRouter.get("/getMsg/:conversationId", (req, res, next) => {
//   Message.find({conversationId: req.params.conversationId}, (err, messages) => {
//       // console.log(req.user, "req")
//       if(err) {
//           res.status(500)
//           return next(err)
//       }
//       return res.status(200).send(messages)
//   })
// })

// get user profilePic value
userRouter.get("/getUserPic/:id", (req, res, next) => {
  User.findById({_id: req.params.id}, (err, user) => {
    if(err) {
      res.status(500)
      return next
    }
    console.log(user.profilePic, "get pic")
    return res.status(200).send(user.profilePic)
  })
})


// update profile picture
userRouter.put("/updateProfilePic/:id", async (req, res) => {
  console.log("this route was hit")
  console.log(req.body, "req body")
  User.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new: true},
    (err, updatedProfilePic) => {
      console.log(updatedProfilePic, "hitting updateThme")
      // console.log(err, "hitting error")
      if(err) {
        res.status(500)
        console.log("hitting error")
        return next
      }
      if(!req.body) {
        res.status(500)
        throw Error("Req.body is missing!")
      }
      // console.log(req.params.id, "id")
      // console.log(req.body.theme, "theme")
      // console.log(updatedTheme, "updated theme")
      // console.log("hitting successful request")
        return res.status(201).send(updatedProfilePic)
    }
  )
  // try {
    // if(!req.body){
    //   throw Error("Body is missing")
    // }
    // let user = await User.findById(req.params.id);
    // Delete image from cloudinary
    // console.log(user, "user")
    // await cloudinary.uploader.destroy(user.cloudinaryId);
    // Upload new image to cloudinary
    console.log(req, "req")
    // const result = await cloudinary.uploader.upload(req.file.path);

    // console.log(result, "result")
    // update your sign up post request to upload the picture to cloudinary, which will give you back a public id for that specific picture, then you can save that id as the cloundinary_id
    // const data = {
      // username: req.body.username,
      // profilePic: result.secure_url || user.profilePic,
      // cloudinaryId: result.public_id || user.cloudinaryId,
    // };
  //   user = await User.findByIdAndUpdate(req.params.id, req.body, {
  //     new: true
  //   });
  //   res.json(user);
  // } catch (err) {
  //   console.log(err);
  // }
});

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
    console.log(userSettings, "userSettings")
    console.log(user.theme, "get theme")
    return res.status(200).send(userSettings)
  })
})

// get user theme value
userRouter.get("/getUserTheme/:id", (req, res, next) => {
  User.findById({_id: req.params.id}, (err, user) => {
    if(err) {
      res.status(500)
      return next
    }
    console.log(user.theme, "get theme")
    return res.status(200).send(user.theme)
  })
})

// update user's theme
userRouter.put("/updateUserTheme/:id", (req, res, next) => {
  console.log("my update")
  
  User.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new: true},
    (err, updatedTheme) => {
      console.log(updatedTheme, "hitting updateThme")
      // console.log(err, "hitting error")
      if(err) {
        res.status(500)
        console.log("hitting error")
        return next
      }
      // console.log(req.params.id, "id")
      // console.log(req.body.theme, "theme")
      // console.log(updatedTheme, "updated theme")
      console.log("hitting successful request")
        return res.status(201).send(updatedTheme)
    }
  )
})


module.exports = userRouter