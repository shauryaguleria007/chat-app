require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const http = require("http")

const expressServer = require('./serverInitializer/expressServer')
const socketServer = require("./serverInitializer/socketServer")

const server = express()
const httpServer = http.createServer(server)

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
socketServer(httpServer)

httpServer.listen(process.env.PORT, () => {
  console.log('server listening at port 3000')
})
