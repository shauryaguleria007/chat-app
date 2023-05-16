const mongoose = require("mongoose")
let gfs
const connnectDatabase = async () => {
    const connection = mongoose.connection
    connection.once('open', () => {
        gfs = new mongoose.mongo.GridFSBucket(connection.db, {
            bucketName: "uploads"
        })
    })
    await mongoose
        .set('strictQuery', false)
        .connect(process.env.mongoDB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then(() => {
            console.log("database connected");
        })
        .catch((error) => {
            console.log('database not connected \n', 'error :  ' + error.message) //delete
        })
}

const getGfs = () => {
    return gfs
}

module.exports = {
    connnectDatabase,
    getGfs
}
