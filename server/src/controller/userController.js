const User = require('../modal/userModal')

exports.createUser = async (req, res, next) => {
  const { email, password, name } = req.body
  const insertUser = await User.create({ email, password, name })
  if (!insertUser) return res.json({ success: false })
  res.json({ success: true })
}
