const { Server } = require("socket.io")
const passport = require("passport")
const { useCustomStrategy } = require("../utils")

module.exports = (httpServer) => {
    const socketServer = new Server(httpServer, {
        cors: `${process.env.client}`
    })

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
        console.log(socket.request.user);
        console.log("a user connected ")
        socket.on("disconnect", () => {
            console.log("user disconnected");
        })
    })
}