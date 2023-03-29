import { useNavigate, Link } from "react-router-dom"
import { useEffect } from "react"
// import { socket } from "../contexrt/SocketContext"
export const Logout = () => {
    const navigate = useNavigate()
    useEffect(() => {
        localStorage.removeItem("auth")
        // socket.disconnect()
        //reset state in store
        navigate("/login")
        // window.location.href = 'http://localhost:5173/'
    }, [])

    return <h1>Logout</h1>
}