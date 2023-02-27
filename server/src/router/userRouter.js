const express = require('express')

const { createUser } = require('../controller')

const Router = express.Router()

Router.route('/register').post(createUser)

module.exports = Router
