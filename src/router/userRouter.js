const express = require('express')
const { check } = require('express-validator')

const { createUser } = require('../controller')
const { routeValidator } = require('../middleware')

const Router = express.Router()

Router.route('/register').post(
  [
    check('email').exists().isEmail(),
    check('password').exists().isLength({ min: 5 }),
    check('name').exists().isLength({ min: 3 }), // update name checker
  ],
  routeValidator,
  createUser
)

module.exports = Router
