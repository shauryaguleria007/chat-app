require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')

const { expressServer } = require('../src/utils')

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
  return database
}

const initiliazeServer = async () => {
  const database = await connnectDatabase()
  if (!database) {
    console.log('server not initialized ')
    return
  }
  expressServer(server)
}
initiliazeServer()
server.listen(process.env.PORT, () => {
  console.log('server listening at port 3000')
})
