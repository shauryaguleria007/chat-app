const socketServer = require("./socketServer")

exports.getClientMessage = (message, socket) => {
    socket.emit("recieveMessage",{...message,test:Math.random()})
}

