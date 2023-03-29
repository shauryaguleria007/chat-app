import { useContext, createContext, useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { getUser } from "../app/store";



const SocketContext = createContext()

export const SocketProvider = ({ children }) => {
    const user = getUser()
    const socket = useRef(io(`${import.meta.env.VITE_SERVER}`, {
        autoConnect: false,
        extraHeaders: {
            Authorization: localStorage.getItem("auth")
        }
    })
    )
    const recieveMessageFunction = (message) => {
        console.log(message);
    }
    const sendMessage = (message) => {
        socket.current.emit("sendMessage", { from: user?.id, ...message })
    }
    useEffect(() => {
        socket.current.on("recieveMessage", recieveMessageFunction)
        socket.current.connect()


        return () => {
            socket.current.off("recieveMessage", recieveMessageFunction),
            socket.current.disconnect()
        }

    }, [])

    return <SocketContext.Provider value={{ socket:socket.current, sendMessage }}>
        {children}
    </SocketContext.Provider>
}


export const useSocketContext = () => useContext(SocketContext)