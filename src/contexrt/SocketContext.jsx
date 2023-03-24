import { useContext, createContext, useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { getUser } from "../app/store";

const SocketContext = createContext()

export const SocketProvider = ({ children }) => {
    const [recieveMessage, setRecieveMessage] = useState({})
    const user = getUser()

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

    const sendMessage = (message) => {
        socket.emit("sendMessage", { from: user.email, message })
    }

    return <SocketContext.Provider value={{ socket, sendMessage }}>
        {children}
    </SocketContext.Provider>
}


export const useSocketContext = () => useContext(SocketContext)