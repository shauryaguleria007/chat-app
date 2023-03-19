import React, { useEffect, useRef } from 'react'
import { Link } from "react-router-dom"
import { useSocketContext } from "../contexrt/SocketContext"
export const Home = () => {
  useEffect(() => {
  }, [])
  return <Link to="/logout">logout </Link>

}
