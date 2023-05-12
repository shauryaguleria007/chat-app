const express = require('express')
const passport = require('passport')
const cors = require('cors')
const Router = require('../router')
const { errorHandler } = require('../middleware')
const { useJwtStrategy } = require('../utils')

module.exports = (server) => {
  server.use(
    cors({
      origin: [`${process.env.client}`],
      credentials: true,
      methods: ['GET', 'PUT', 'POST', 'OPTIONS'],
    })
  )
  server.use(express.json())
  server.use(passport.initialize())
  useJwtStrategy(passport)
  server.use(Router)
  server.use(errorHandler)
}
