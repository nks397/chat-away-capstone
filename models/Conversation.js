const mongoose = require("mongoose")
const Schema = mongoose.Schema
// may only be the user and user's message and the contact and contact's message
const conversationSchema = new Schema({
    // userId: {
    //     type: Schema.Types.ObjectId,
    //     ref: "User",
    //     required: true
    // },
    // senderUsername: {
    //     type: String
    // },
    // recipientUsername: {
    //     type: String
    // },
    membersArr: {
        type: Array
    },
    
    timeStamps: {
        type: Date,
        default: Date.now()
    }

})

module.exports = mongoose.model("Conversation", conversationSchema)