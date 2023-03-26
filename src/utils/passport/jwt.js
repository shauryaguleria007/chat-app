const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const { customError } = require('../customError')
const User = require('../../modal/userModal')

module.exports = (passport) => {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT,
  }

  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      const user = await User.findById(jwt_payload.id).select(["+mailToken","+verified"]).catch((error) => {
        return done(null, false)
      })
      if (user) return done(null, user)
      return done(null, false)
    })
  )
}
