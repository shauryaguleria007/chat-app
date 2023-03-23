import React, { useEffect, useRef } from 'react'
import { Link } from "react-router-dom"
import { useSocketContext } from "../contexrt/SocketContext"
export const Home = () => {
  const { socket ,sendMessage} = useSocketContext()
  useEffect(() => {
  }, [])
  const message = () => {
   sendMessage()
  }
  return <>
    <Link to="/logout">logout </Link>
    <button onClick={message}>send message</button>
  </>

}
