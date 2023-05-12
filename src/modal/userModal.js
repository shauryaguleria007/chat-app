const mongoose = require('mongoose')
const crypto = require("crypto")

const userSchema = new mongoose.Schema({
  email: { unique: true, type: mongoose.Schema.Types.String, required: [true] },
  name: { type: String, required: true },
  password: { type: String, select: false },
  verified: { type: Boolean, default: false, select: false },
  mailToken: {
    token: {
      type: String
    },
    expiry: {
      type: Date
    },
    select: false
  },
  avatarUrl: {
    type: String,
    default: "https://wallpapers.com/images/high/cool-profile-picture-ld8f4n1qemczkrig.webp"
  },
  contacts: [{
  }]
})

userSchema.methods.addToken = async function () {
  const token = crypto.randomBytes(64).toString('hex')
  const date = new Date
  const expiry = new Date((new Date).getTime() + 10 * 6000)
  this.mailToken = {
    token,
    expiry
  }
  await this.save()
  return token
}
module.exports = mongoose.model('User', userSchema)
