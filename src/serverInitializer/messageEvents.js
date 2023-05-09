const { SocketClosedUnexpectedlyError } = require("redis")
const socketServer = require("./socketServer")

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


exports.recieveFile = async (message, socket, socketServer, redisClient) => {

    await redisClient.zAdd(`${message.id}.${message?.to}`, {
        score: message.index,
        value: `${JSON.stringify({
            chunk: message.chunk,
            index: message.index,
            lastIndex: message.lastIndex,
            fileName: message.fileName,
            type: message.type
        })}`
    }, (error, reply) => {
    });
    if (message.index === message.lastIndex) {
        //send if online
        //if not send compleetly or  then cash it 
        await redisClient.sAdd(`media${message.to}`, `${message.id}.${message?.to}`, () => { })
    }


}


exports.sendFile = async (socket, socketServer, redisClient) => {
    const mediaData = await redisClient.sMembers(`media${socket.request.user.id}`)
    mediaData.map(async (res) => {
        const media = await redisClient.zRange(res, 0, -1)
        media.map(async (chunk) => {
            const data = JSON.parse(chunk)
            socketServer.to(socket.id).emit("recieveFile", data)
            if (data.index === data.lastIndex) {
                await redisClient.DEL(res, () => { })
                await redisClient.sRem(`media${socket.request.user.id}`, res)
            }
            //if sent success full delete data
        })
    })
    console.log(mediaData);

}