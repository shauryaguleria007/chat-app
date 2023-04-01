const mongoose = require("mongoose")


const messageSchema = new mongoose.Schema({
    message: {
        required: true,
        type: String
    },
    from: {
        type: mongoose.Types.ObjectId,
        requierd: true
    },
    to: {
        requierd: true,
        type: mongoose.Types.ObjectId
    },
    date: Date,
}, {
    timestamps: {
        createdAt: true
    }
})

module.exports = mongoose.model("Message", messageSchema)
