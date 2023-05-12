const CustomStrategy = require("passport-custom").Strategy
const jwt = require("jsonwebtoken")
const { customError } = require('../customError')
const User = require('../../modal/userModal')
const mongoose = require("mongoose")
module.exports = (passport) => {
    passport.use("socket",
        new CustomStrategy(async (req, done) => {
            let token = ""
            if (req?.headers?.authorization?.startsWith("Bearer ")) {
                token = req.headers.authorization.substring(7, req.headers.authorization.length);
            }
            const user = jwt.verify(token, process.env.JWT, async (err, user) => {
                if (err) return done(null, "unauthorized")
                const data = await User.findById(new mongoose.Types.ObjectId(user.id))
                return done(null, data)
            })
        })
    )
}
