const express = require('express')

const Router = require('../../router')

module.exports = (server) => {
  server.use(express.json())
  server.use(Router)
}
