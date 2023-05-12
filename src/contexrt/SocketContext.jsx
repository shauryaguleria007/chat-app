import { useContext, createContext, useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { getUser, getContacts } from "../app/store";
import { addRecievedMessage, addUserMessages, addContact, updateOnlineStataus, addUserFile } from "../features/userSlice";
import { useDispatch } from "react-redux";
import { useAddContactMutation, useAddMessageMutation, useAddFileMutation } from "../services/userApi";
import { v4 as uuidv4 } from 'uuid';
import { Login } from "@mui/icons-material";



const SocketContext = createContext()



export const SocketProvider = ({ children }) => {
    const dispatch = useDispatch()
    const user = getUser()
    const [socketConnectionStatus, setSocketConnectionStatus] = useState(true)
    const contacts = getContacts()
    const [addNewContact, { data, isFerching, error }] = useAddContactMutation()
    const [callAddFile, { data: fileData, error: fileError }] = useAddFileMutation()
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


    const status = (message) => {
        dispatch(updateOnlineStataus(message))
    }

    const sendMessage = async (message) => {
        const data = { from: user?.id, ...message, date: Date.now() }
        socket.current.emit("sendMessage", data)
        dispatch(addUserMessages(data))
        // await addNewMessage(data)
    }

    const sendFile = async (file) => {
        file.file.map(async (res) => {
            const id = uuidv4()
            const data = { type: res.type, to: file.to, from: user?.id, date: Date.now() }
            dispatch(addUserFile({ ...data, file: res?.file }))
            const formData = new FormData()
            formData.append("file", res?.file)
            formData.append("json", JSON.stringify(data))
            await callAddFile(formData)
            //res.file
        })
    }



    useEffect(() => {
        if (fileData) console.log(fileData);
        if (fileError) console.log(fileError);
    }, [fileData, fileError])// delete

    useEffect(() => {
        const getStatus = () => {
            contacts.map((res) => {
                socket.current.emit("getUserStatus", res._id)
            })
        }
        getStatus()
        const interval = setInterval(getStatus, 5000)
        return () => clearInterval(interval)
    }, [contacts])

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
        socket.current.on("onlineStatusResult", status)
        socket.current.connect()

        return () => {
            socket.current.off("connect", connectFunction)
            socket.current.off("recieveMessage", recieveMessageFunction),
                socket.current.off("disconnect", disconnectFunction),
                socket.current.off("onlineStatusResult", status)
            socket.current.disconnect()
        }

    }, [])


    return <SocketContext.Provider value={{ socket: socket.current, socketConnectionStatus, sendMessage, sendFile }}>
        {children}
    </SocketContext.Provider >
}


export const useSocketContext = () => useContext(SocketContext)