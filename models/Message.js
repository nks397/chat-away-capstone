const mongoose = require("mongoose")
const Schema = mongoose.Schema
// may only be the user and the message
const messageSchema = new Schema({
    // conversationId: {
    //     type: String
    // },
    recipient: {
        type: String
    },
    sender: {
        type: String
    },
    text: {
        type: String
    },
    // userMsg: {
    //     type: String
    // },
    // username: {
    //     type: String
    // },
    // recipientMsg: {
    //     type: String
    // },
    timestamps: {
        type: Date,
        default: Date.now()
    },
    // user: {
    //     type: Schema.Types.ObjectId,
    //     ref: "User",
    //     // required: true
    // }
})

module.exports = mongoose.model("Message", messageSchema)