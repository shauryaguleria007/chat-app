const { validationResult } = require('express-validator')
const { credentialError } = require('../utils')

module.exports = (req, res, next) => {
  if (!validationResult(req).isEmpty()) {
    const result = validationResult(req).errors[0]
    throw new credentialError(result.param)
  } else return next()
}
