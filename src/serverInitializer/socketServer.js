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
        console.log(error);
    })

    await redisClient.connect()


    const wrapMiddlewareForSocketIo = middleware => (socket, next) => middleware(socket.request, {}, next);
    useCustomStrategy(passport)
    socketServer.use(wrapMiddlewareForSocketIo(passport.initialize()));
    socketServer.use(wrapMiddlewareForSocketIo(passport.authenticate(['socket'], { session: false })));

    socketServer.use((socket, next) => {
        if (socket.request.user === "unauthorized")
            next(new Error("fuk u bih"))
        next()
    })
    socketServer.on("connection", (socket) => {
        console.log(socket.request.user.email);

        socket.on("sendMessage", (message) => getClientMessage(message, socketServer,redisClient))


        socket.on("disconnect", () => {
            console.log("user disconnected");
        })
    })
}