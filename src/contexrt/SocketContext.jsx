import { useContext, createContext, useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { getUser, getContacts } from "../app/store";
import { addRecievedMessage, addUserMessages, addContact } from "../features/userSlice";
import { useDispatch } from "react-redux";
import { useAddContactMutation } from "../services/userApi";



const SocketContext = createContext()



export const SocketProvider = ({ children }) => {
    const dispatch = useDispatch()
    const user = getUser()
    const contacts = getContacts()
    const [addNewContact, { data, isFerching, error }] = useAddContactMutation()
    const socket = useRef(io(`${import.meta.env.VITE_SERVER}`, {
        autoConnect: false,
        extraHeaders: {
            Authorization: localStorage.getItem("auth")
        }
    })
    )
    const recieveMessageFunction = async (message) => {
        // console.log(message);
        let flag = true
        contacts?.map((res) => {
            if (res?._id === message.from) flag = false
        })
        // add to contact if not in contacts         
        //  ->>>>>>>>>>>>     do this 
        if (flag) {
            await addNewContact({ id: message.from })
        }
        dispatch(addRecievedMessage(message))
    }
    useEffect(() => {
        if (!data) return
        dispatch(addContact(data?.user))
    }, [data])
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