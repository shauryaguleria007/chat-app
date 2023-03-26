const User = require('../modal/userModal')
const { AsyncErrorHandler, customError, verificatoinError } = require('../utils')
const jwt = require("jsonwebtoken")

exports.createUser = AsyncErrorHandler(async (req, res, next) => {
  const { email, password, name } = req.body

  const insertUser = await User.create({ email, password, name })
  if (!insertUser) return new customError("email", "credential")
  const token = jwt.sign(
    {
      id: insertUser._id,
      email: insertUser.email,
      name: insertUser.name,
    },
    process.env.JWT,
    { expiresIn: '1d' }
  )
  res.status(200).send({
    token: 'Bearer ' + token,
  })
})


exports.findUser = AsyncErrorHandler(async (req, res, next) => {
  const result = await User.find({ email: req.body.id }).select("-mailToken")
  if (result.length === 0) throw new verificatoinError("")
  const resu = [...result, ...result, ...result, ...result, ...result, ...result, ...result, ...result, ...result, ...result, ...result, ...result]

  res.json(resu)
})