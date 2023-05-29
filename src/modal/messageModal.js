const { json } = require("express")
const mongoose = require("mongoose")


const messageSchema = new mongoose.Schema({
    message: {
        required: true,
        type:Object
    },
    from: {
        type: mongoose.Types.ObjectId,
        requierd: true
    },

    to: {
        requierd: true,
        type: mongoose.Types.ObjectId
    },
}, {
    timestamps: {
        createdAt: true
    }
})

module.exports = mongoose.model("Message", messageSchema)
