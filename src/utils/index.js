const AsyncErrorHandler = require('./asyncErrorHandler')
const customError = require('./customError')
const useJwtStrategy = require('./passport/jwt')
const useCustomStrategy = require('./passport/custom')

const verificationMail = require("./nodeMailer/verificationMail")
module.exports = { AsyncErrorHandler, ...customError, useJwtStrategy, verificationMail, useCustomStrategy}
