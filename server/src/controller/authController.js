const User = require('../modal/userModal')
const { AsyncErrorHandler, credentialError, customError } = require('../utils')

const jwt = require('jsonwebtoken')

exports.login = AsyncErrorHandler(async (req, res, next) => {
  const { email, password } = req.body
  const user = await User.findOne({ email }).select('+password')
  if (!user) throw new credentialError('email')
  if (user.password !== password)
    throw new customError('incorrect password', 'password')
  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
      name: user.name,
    },
    process.env.JWT,
    { expiresIn: '1d' }
  )
  res.status(200).send({
    token: 'Bearer ' + token,
  })
})

exports.authenticate = AsyncErrorHandler(async (req, res, next) => {
  res.json({ success: true })
})
// send jwt
