const { SocketClosedUnexpectedlyError } = require("redis")
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


exports.sendStatusFunction = async (message, socket, socketServer, redisClient) => {
    const socketId = await redisClient.get(`socket${message}`)
    if (socketId) socketServer.to(socket.id).emit("onlineStatusResult", { id: message, status: true })
    else socketServer.to(socket.id).emit("onlineStatusResult", { id: message, status: false })


}