import { useNavigate, Link } from "react-router-dom"
import { useEffect } from "react"
import { useSocketContext } from "../contexrt/SocketContext"
import { socket } from "../contexrt/SocketContext"
export const Logout = () => {
    const navigate = useNavigate()
    useEffect(() => {
        localStorage.removeItem("auth")
        socket.disconnect()
        //reset state in store
        navigate("/login")
    }, [])

    return <h1>Logout</h1>
}