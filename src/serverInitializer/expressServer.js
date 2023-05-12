const express = require('express')
const passport = require('passport')
const cors = require('cors')
const Router = require('../router')
const { errorHandler } = require('../middleware')
const { useJwtStrategy } = require('../utils')
const cloudinary = require('cloudinary');


module.exports = (server) => {
  server.use(
    cors({
      origin: [`${process.env.client}`],
      credentials: true,
      methods: ['GET', 'PUT', 'POST', 'OPTIONS'],
    })
  )



  cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret
  });

  server.use(express.json())
  server.use(passport.initialize())
  useJwtStrategy(passport)
  server.use(Router)
  server.use(errorHandler)
}

