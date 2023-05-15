const { Timestamp } = require("bson")
const mongoose = require("mongoose")


const fileSchema = new mongoose.Schema({
    fileId: {
        require: true,
        type: mongoose.Types.ObjectId
    },
    from: {
        require: true,
        type: mongoose.Types.ObjectId
    },
    to: {
        require: true,
        type: mongoose.Types.ObjectId
    }
}, {
    timestamps: {
        createdAt: true
    }
})


module.exports = mongoose.model("File", fileSchema)