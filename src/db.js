const mongoose = require("mongoose")
let gfs

const connnectDatabase = async () => {
    const database = await mongoose
        .set('strictQuery', false)
        .connect(process.env.mongoDB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then(() => {
            const connection = mongoose.connection
            connection.once("open", () => {
                gfs = mongoose.mongo.GridFSBucket(connection, {
                    bucketName: "uploads"
                })
            })
        })
        .catch((error) => {
            console.log('database not connected \n', 'error :  ' + error.message) //delete
        })
}

module.exports = {
    gfs,
    connnectDatabase
}