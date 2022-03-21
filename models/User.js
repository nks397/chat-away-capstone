const mongoose = require("mongoose")
const Schema = mongoose.Schema
const bcrypt = require("bcrypt")

const userSchema = new Schema({
    username: {
        type: String,
        require: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    profilePic: {
        type: String,
        // default: "https://t4.ftcdn.net/jpg/03/32/59/65/240_F_332596535_lAdLhf6KzbW6PWXBWeIFTovTii1drkbT.jpg"
    },
    cloudinaryId: {
      type: String,
      default: "kf8bqmekdx441ziszgbr",
    },
    theme: {
      type: String,
      default: "light"
      // description: {type: String, possibleValues: ['light','dim','dark']}
    },
    memberSince: {
        type: Date,
        default: Date.now
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
  
})

// signup error handling for existing user
// pre-save hook to encrypt user passwords on signup

userSchema.pre('save', function(next) {
    const user = this
    if(!user.isModified('password')) return next()
    bcrypt.hash(user.password, 10, (err, hash)=> {
      if(err) return next(err)
      user.password = hash
      next()
    })
  })
  
  userSchema.methods.checkPassword = function(passwordAttempt, callback) {
    bcrypt.compare(passwordAttempt, this.password, (err, isMatch) => {
      if(err) return callback(err)
      return callback(null, isMatch)
    })
  }
  
  userSchema.methods.withoutPassword = function() {
    const user = this.toObject()
    delete user.password
    return user
  }


module.exports = mongoose.model("User", userSchema)