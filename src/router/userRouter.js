const express = require('express')
const { check } = require('express-validator')

const { createUser, findUser } = require('../controller')
const { routeValidator } = require('../middleware')
const passport = require("passport")

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

Router.route("/findUser").post(passport.authenticate("jwt", { session: false }), findUser)

module.exports = Router
