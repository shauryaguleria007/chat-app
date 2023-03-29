import { useContext, createContext, useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { getUser, getContacts } from "../app/store";
import { addRecievedMessage, addUserMessages } from "../features/userSlice";
import { useDispatch } from "react-redux";



const SocketContext = createContext()

export const SocketProvider = ({ children }) => {
    const dispatch = useDispatch()
    const user = getUser()
    const socket = useRef(io(`${import.meta.env.VITE_SERVER}`, {
        autoConnect: false,
        extraHeaders: {
            Authorization: localStorage.getItem("auth")
        }
    })
    )
    const recieveMessageFunction = (message) => {
        // console.log(message);
        // add to contact if not in contacts 
        dispatch(addRecievedMessage(message))
    }
    const sendMessage = (message) => {
        socket.current.emit("sendMessage", { from: user?.id, ...message })
        dispatch(addUserMessages(message))
    }
    useEffect(() => {
        socket.current.on("recieveMessage", recieveMessageFunction)
        socket.current.connect()


        return () => {
            socket.current.off("recieveMessage", recieveMessageFunction),
                socket.current.disconnect()
        }

    }, [])

    return <SocketContext.Provider value={{ socket: socket.current, sendMessage }}>
        {children}
    </SocketContext.Provider>
}


export const useSocketContext = () => useContext(SocketContext)