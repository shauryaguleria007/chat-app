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
