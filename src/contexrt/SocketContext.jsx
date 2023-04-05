import { useContext, createContext, useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { getUser, getContacts } from "../app/store";
import { addRecievedMessage, addUserMessages, addContact } from "../features/userSlice";
import { useDispatch } from "react-redux";
import { useAddContactMutation, useAddMessageMutation } from "../services/userApi";



const SocketContext = createContext()



export const SocketProvider = ({ children }) => {
    const dispatch = useDispatch()
    const user = getUser()
    const [socketConnectionStatus, setSocketConnectionStatus] = useState(true)
    const contacts = getContacts()
    const [addNewContact, { data, isFerching, error }] = useAddContactMutation()
    const [addNewMessage] = useAddMessageMutation()

    const socket = useRef(io(`${import.meta.env.VITE_SERVER}`, {
        autoConnect: false,
        extraHeaders: {
            Authorization: localStorage.getItem("auth")
        }
    })
    )
    const recieveMessageFunction = async (message) => {
        let flag = true
        contacts?.map((res) => {
            if (res?._id === message.from) { flag = false }
        })
        if (flag) {
            await addNewContact({ id: message.from })
        }
        dispatch(addRecievedMessage(message))
    }

    const sendMessage = async (message) => {
        const data = { from: user?.id, ...message, date: Date.now() }
        socket.current.emit("sendMessage", data)
        dispatch(addUserMessages(data))
        // await addNewMessage(data)
    }

    useEffect(() => {
        if (!data) return
        dispatch(addContact(data?.user))
    }, [data])
    useEffect(() => {
        const connectFunction = () => {
            setSocketConnectionStatus(false)
        }
        const disconnectFunction = () => {
            setSocketConnectionStatus(true)
        }

        socket.current.on("connect", connectFunction)
        socket.current.on("disconnect", disconnectFunction)

        socket.current.on("recieveMessage", recieveMessageFunction)
        socket.current.connect()

        return () => {
            socket.current.off("connect", connectFunction)
            socket.current.off("recieveMessage", recieveMessageFunction),
                socket.current.off("disconnect", disconnectFunction),
                socket.current.disconnect()
        }

    }, [])


    return <SocketContext.Provider value={{ socket: socket.current, socketConnectionStatus, sendMessage }}>
        {children}
    </SocketContext.Provider >
}


export const useSocketContext = () => useContext(SocketContext)