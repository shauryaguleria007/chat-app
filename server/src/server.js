const express = require('express')

const server = express()
server.listen(3000, () => {
  console.log('server listning at port 3000')
})
