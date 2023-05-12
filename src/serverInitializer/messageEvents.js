const { SocketClosedUnexpectedlyError } = require("redis")
const fs = require("fs")
const path = require("path")

const fileLocation = "./src/files"

exports.getClientMessage = async (message, socket, redisClient) => {
    console.log(message.type);
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





exports.sendFile = async (socket, socketServer, redisClient) => {


}