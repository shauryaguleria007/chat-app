exports.customError = class extends Error {
  constructor(message, name) {
    super(message)
    this.name = name
  }
}

exports.credentialError = class extends Error {
  constructor(message) {
    super(`${message} is invalid`)
    this.name = 'credential'
  }
}


exports.verificatoinError = class extends Error {
  constructor(message) {
    super(`${message}`)

    this.name = 'verification'
  }
}


exports.EmailerificatoinError = class extends Error {
  constructor(message) {
    super(`${message}`)

    this.name = 'emailVerification'
  }
}