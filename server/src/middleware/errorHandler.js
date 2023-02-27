module.exports = (error, req, res, next) => {
  if (error.name === 'ValidationError') {
    return res.status(400).json({ type: 'validation' })
  }

  if (error.name === 'MongoServerError') {
    if (error.code === 11000) return res.status(400).json({ type: 'duplicate' })
  }
  return res.status(400).json({
    //internal server error

    type: error.name,
    error: error.message,
  })
}
