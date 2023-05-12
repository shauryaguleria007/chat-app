const express = require('express')
const { check } = require('express-validator')

const { login, authenticate, sendMail, verify } = require('../controller')
const { routeValidator, emailVerifier } = require('../middleware')

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
  emailVerifier,
  authenticate
)

Router.route("/verify/:id").get(passport.authenticate("jwt", { session: false }), sendMail)
Router.route("/verified/:id").get(passport.authenticate("jwt", { session: false }), verify)

module.exports = Router
