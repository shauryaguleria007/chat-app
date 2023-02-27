const express = require('express')
const { check } = require('express-validator')

const { login, authenticate } = require('../controller')
const { routeValidator } = require('../middleware')

const passport = require('passport')
const Router = express.Router()

Router.route('/login').post(
  [
    check('email').exists().isEmail(),
    check('password').exists().isLength({ min: 5 }),
  ],
  routeValidator,
  login
)

Router.route('/authenticate').get(
  passport.authenticate('jwt', { session: false }),
  authenticate
)

module.exports = Router
