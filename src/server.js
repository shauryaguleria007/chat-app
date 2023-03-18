require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')

const expressServer = require('./serverInitializer/expressServer')

const server = express()

const connnectDatabase = async () => {
  const database = await mongoose
    .set('strictQuery', false)
    .connect(process.env.mongoDB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .catch((error) => {
      console.log('database not connected \n', 'error :  ' + error.message) //delete
    })
}
connnectDatabase()

expressServer(server)

server.listen(process.env.PORT, () => {
  console.log('server listening at port 3000')
})
