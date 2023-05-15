require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const http = require("http")
const methodOverride = require('method-override');
const { connnectDatabase } = require("./db")
const expressServer = require('./serverInitializer/expressServer')
const socketServer = require("./serverInitializer/socketServer")

const server = express()
server.use(methodOverride('_method'));


const httpServer = http.createServer(server)


connnectDatabase()

expressServer(server)
socketServer(httpServer)

httpServer.listen(process.env.PORT, () => {
  console.log('server listening at port 3000')
})
