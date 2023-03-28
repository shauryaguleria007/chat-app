const { Server } = require("socket.io")
const passport = require("passport")
const redis = require("redis")

const { useCustomStrategy } = require("../utils")
const { getClientMessage } = require("./messageEvents")
module.exports = async (httpServer) => {
    const socketServer = new Server(httpServer, {
        cors: `${process.env.client}`
    })

    const redisClient = redis.createClient()
    redisClient.on("connect", () => {
        console.log("redis client connected");
    })
    redisClient.on("error", (error) => {
        console.log("error");
    })

    await redisClient.connect()


    const wrapMiddlewareForSocketIo = middleware => (socket, next) => middleware(socket.request, {}, next);
    useCustomStrategy(passport)
    socketServer.use(wrapMiddlewareForSocketIo(passport.initialize()));
    socketServer.use(wrapMiddlewareForSocketIo(passport.authenticate(['socket'], { session: false })));

    socketServer.use((socket, next) => {
        if (socket.request.user === "unauthorized")
            next(new Error("unauthorized"))
        next()
    })
    socketServer.on("connection", async (socket) => {
        console.log(socket.request.user.email);
        await redisClient.set(`socket${socket.request.user.id}`, socket.id)
        // const offlineDadta = await redisClient.sMembers(socket.request.user.id, (data) => {
        //     console.log(data);
        // })
        // await redisClient.DEL(socket.request.user.id)
        
        socket.on("sendMessage", (message) => getClientMessage(message, socket, redisClient))


        socket.on("disconnect", async () => {
            await redisClient.del(`socket${socket.request.user.id}`)
            console.log("user disconnected");
        })
    })
}