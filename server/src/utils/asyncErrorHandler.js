module.exports = (middleware) => async (req, res, next) => {
  Promise.resolve(middleware(req, res, next)).catch(next)
}
