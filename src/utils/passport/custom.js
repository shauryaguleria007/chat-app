const CustomStrategy = require("passport-custom").Strategy
const jwt = require("jsonwebtoken")
const { customError } = require('../customError')
const User = require('../../modal/userModal')

module.exports = (passport) => {
    passport.use("socket",
        new CustomStrategy(async (req, done) => {
            let token = ""
            if (req?.headers?.authorization.startsWith("Bearer ")) {
                token = req.headers.authorization.substring(7, req.headers.authorization.length);
            }
            const user = jwt.verify(token, process.env.JWT, (err, user) => {
                if (err) return done(null, "unauthorized")
                return done(null, user)
            })
        })
    )
}
