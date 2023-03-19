import { useNavigate, Link } from "react-router-dom"
import { useEffect } from "react"
import { useSocketContext } from "../contexrt/SocketContext"
export const Logout = () => {
    const navigate = useNavigate()
    useEffect(() => {
        localStorage.removeItem("auth")
        navigate("/login")
    }, [])

    return <h1>Logout</h1>
}