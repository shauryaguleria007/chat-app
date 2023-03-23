import { useContext, createContext, useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
const SocketContext = createContext()

export const SocketProvider = ({ children }) => {
    const [recieveMessage, setRecieveMessage] = useState({})


    const recieveMessageFunction = (message) => {
        console.log(message);
    }

    const socket = io(`${import.meta.env.VITE_SERVER}`, {
        autoConnect: false,
        extraHeaders: {
            Authorization: localStorage.getItem("auth")
        }
    })

    useEffect(() => {
        socket.connect()
        return () => socket.disconnect()
    }, [])

    useEffect(() => {
        socket.on("recieveMessage", recieveMessageFunction)
        return () => { socket.off("recieveMessage", recieveMessageFunction) }
    }, [])

    const sendMessage = () => {
        socket.emit("sendMessage", { user: "shaurya" })
    }

    return <SocketContext.Provider value={{ socket, sendMessage }}>
        {children}
    </SocketContext.Provider>
}


export const useSocketContext = () => useContext(SocketContext)