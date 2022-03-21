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

// update profile picture
userRouter.put("/updateProfilePic/:id", upload.single("image"), async (req, res) => {
  console.log("this route was hit")
  try {
    let user = await User.findById(req.params.id);
    // Delete image from cloudinary
    console.log(user, "user")
    await cloudinary.uploader.destroy(user.cloudinaryId);
    // Upload new image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);
    console.log(result, "result")
    // update your sign up post request to upload the picture to cloudinary, which will give you back a public id for that specific picture, then you can save that id as the cloundinary_id

    const data = {
      // username: req.body.username,
      profilePic: result.secure_url || user.profilePic,
      cloudinaryId: result.public_id || user.cloudinaryId,
    };
    user = await User.findByIdAndUpdate(req.params.id, data, {
      new: true
    });
    res.json(user);
  } catch (err) {
    console.log(err);
  }
});

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