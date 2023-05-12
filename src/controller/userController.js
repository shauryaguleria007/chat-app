const User = require('../modal/userModal')
const Message = require("../modal/messageModal")
const { AsyncErrorHandler, customError, verificatoinError, MessageError } = require('../utils')
const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")
exports.createUser = AsyncErrorHandler(async (req, res, next) => {
  const { email, password, name } = req.body

  const insertUser = await User.create({ email, password, name })
  if (!insertUser) throw new customError("email", "credential")
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


exports.addContact = AsyncErrorHandler(async (req, res, next) => {
  // console.log("here");
  // console.log(req.body.id);
  const user = await User.findById(new mongoose.Types.ObjectId(req.body.id)).select(["-contacts", "-mailToken"])
  // console.log(user);
  req.user.contacts.map((id) => {
    // console.log(user._id, id._id);
    if (user._id.toString() === id._id.toString()) throw new verificatoinError("")
  })
  req.user.contacts.push(user)
  await req.user.save()
  res.json({ user })
})


exports.addFile = AsyncErrorHandler(async (req, res, next) => { res.json({ success: true }) })
exports.getFile = AsyncErrorHandler(async (req, res, next) => { res.json({ success: true }) })



exports.addMessage = AsyncErrorHandler(async (req, res, next) => {

  res.json({ send: true })
})

exports.getMessages = AsyncErrorHandler(async (req, res, next) => {
  res.json({ send: true })

})