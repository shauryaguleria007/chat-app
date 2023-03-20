import { useContext, createContext, useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
const SocketContext = createContext()

export const SocketProvider = ({ children }) => {
    console.log(children)
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

    return <SocketContext.Provider value={{socket}}>
        {children}
    </SocketContext.Provider>
}


export const useSocketContext = () => useContext(SocketContext)