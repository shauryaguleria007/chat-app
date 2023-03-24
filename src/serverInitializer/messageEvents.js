const socketServer = require("./socketServer")

exports.getClientMessage = async (message, socket, redisClient) => {
    await redisClient.sAdd(`${message.from}`, JSON.stringify(message), () => {
        console.log("message cashed");
    })
    socket.emit("recieveMessage", { ...message })
}

