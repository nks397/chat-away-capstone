const express = require("express")
const conversationRouter = express.Router()
const Conversation = require("../models/Conversation")

// get all conv of a user
conversationRouter.get("/:userId", (req, res, next) => {
    Conversation.find({membersArr: {$in: [req.params.userId]}}, (err, convo)=> {
        if(err) {
            res.status(500)
            return next
        }
        return res.status(200).send(convo)
    })
})

// get conv includes two userId
conversationRouter.get("/:firstUserId/:secondUserId", (req, res, next) => {
    Conversation.find({membersArr: {$all: [req.params.firstUserId, req.params.secondUserId]}}, (err, convo) =>  {
        if(err) {
            res.status(500)
            return next
        }
        return res.status(200).send(convo)
    })
})

// new conversation
// conversationRouter.post("/:senderId/:recipientId", (req, res, next) => {
// // save conversation

//     const newConversation = new Conversation({
//         membersArr: [req.params.senderId, req.params.recipientId]
//     })
//     newConversation.save((err, savedConversation) => {
//         if(err) {
//             res.status(500)
//             return next
//         }
//         return res.status(201).send(savedConversation)
//     })
// })
conversationRouter.post("/postConvo", (req, res, next) => {
    // save conversation
    
        const newConversation = new Conversation(req.body)
        
        newConversation.save((err, savedConversation) => {
            if(err) {
                res.status(500)
                return next
            }
            return res.status(201).send(savedConversation)
        })
    })

module.exports = conversationRouter