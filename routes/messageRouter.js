const express = require("express")
const messageRouter = express.Router()
const Message = require("../models/Message")

// get, post message of users
// get, post message of members

// messageRouter.get("/getMsg", (req, res, next) => {
//     Message.find({user: req.user._id}, (err, messages) => {
//         console.log(req.user, "req")
//         if(err) {
//             res.status(500)
//             return next(err)
//         }
//         return res.status(200).send(messages)
//     })
// })

messageRouter.get("/getMsg/:conversationId", (req, res, next) => {
    Message.find({conversationId: req.params.conversationId}, (err, messages) => {
        // console.log(req.user, "req")
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(messages)
    })
})

messageRouter.post("/addMsg", (req, res, next) => {
    // req.body.user = req.user._id
    // req.body.username = req.user.username
    // req.body.timestamps = req.user.timestamps
    // req.body.username = req.user.username
    
    const newMessage = new Message(req.body)
    newMessage.save((err, savedMessage) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedMessage)
    })
})

// deleteMessage
messageRouter.delete("/:messageId/deleteMsg", (req, res, next) => {
    Message.findByIdAndDelete({_id: req.params.messageId}, (err, deletedMessage) => {
        if(err) {
            res.status(500)
            return next
        }
        return res.status(200).send(`Successfully deleted '${deletedMessage.userMsg}' from the database`)
    })
})

module.exports = messageRouter

