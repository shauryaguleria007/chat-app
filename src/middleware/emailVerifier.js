const User = require("../modal/userModal")
const { verificatoinError } = require("../utils")

module.exports = (req, res, next) => {
    if (req.user.verified)
        return next()
    throw new verificatoinError("")
}