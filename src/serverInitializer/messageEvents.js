const socketServer = require("./socketServer")

exports.getClientMessage = async (message, socket, redisClient) => {
    const socketId = await redisClient.get(`socket${message.to}`)

    if (socketId) {
        socket.to(socketId).emit("recieveMessage", message)
        return
    }
    await redisClient.sAdd(`${message.to}`, JSON.stringify(message), () => {
        console.log(message.to, " cashed");
    })
}

