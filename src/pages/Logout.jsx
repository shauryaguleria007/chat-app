import { useNavigate, Link } from "react-router-dom"
import { useEffect } from "react"
import { resetUser } from "../features/userSlice"
import { useDispatch } from "react-redux"
// import { socket } from "../contexrt/SocketContext"
export const Logout = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        localStorage.removeItem("auth")
        dispatch(resetUser())
        navigate("/login")
    }, [])

    return <h1>Logout</h1>
}