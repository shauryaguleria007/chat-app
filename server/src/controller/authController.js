const User = require('../modal/userModal')
const { AsyncErrorHandler, verificationMail, credentialError, customError, EmailerificatoinError } = require('../utils')


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
  res.json({
    email: req.user.email,
    name: req.user.name,
    id: req.user.id
  })
})

exports.sendMail = AsyncErrorHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.params.id })
  if (!user || req.user.email !== user.email) throw new credentialError('email')
  const token = await user.addToken()
  await verificationMail({
    email: user.email,
    client: process.env.client,
    token
  })
  res.json({ success: true })
})

exports.verify = AsyncErrorHandler(async (req, res, next) => {
  if (req.params.id === req.user.mailToken.token && (new Date) < req.user.mailToken.expiry) {
    req.user.verified = true
    await req.user.save()
  } else throw new EmailerificatoinError("")
  res.json({
    email: req.user.email,
    name: req.user.name,
    id: req.user.id
  })

})
// send jwt
