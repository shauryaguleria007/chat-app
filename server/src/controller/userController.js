const User = require('../modal/userModal')
const { AsyncErrorHandler, customError } = require('../utils')

exports.createUser = AsyncErrorHandler(async (req, res, next) => {
  const { email, password, name } = req.body
  const insertUser = await User.create({ email, password, name })
  res.json({ success: true })
})
