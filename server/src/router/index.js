const express = require('express')

const userRouter = require('./userRouter')

const Router = express.Router()

Router.use('/api/v1/user', userRouter)

module.exports = Router
