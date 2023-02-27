const express = require('express')

const userRouter = require('./userRouter')
const authRouter = require('./authRouter')
const Router = express.Router()

Router.use('/api/v1/user', userRouter)
Router.use('/api/v1/auth', authRouter)

module.exports = Router
