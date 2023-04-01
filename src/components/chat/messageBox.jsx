import React, { useRef, useEffect } from 'react'
import { Box, Stack, TextField } from '@mui/material'
import { useSocketContext } from "../../contexrt/SocketContext"
import { useComponentContext } from '../../contexrt/ComponentContect'
import { Link } from "react-router-dom"
import { useParams } from 'react-router-dom'
export const MessageBox = () => {
  const messsageDiv = useRef()
  const { userChat } = useParams()
  const { sendMessage } = useSocketContext()
  const { setShowContacts } = useComponentContext()
  const formSubmit = (e) => {
    e.preventDefault()
    sendMessage({
      message: messsageDiv?.current?.value,
      to: userChat
    })
    messsageDiv.current.value = ""
  }

  const display = () => {
    setShowContacts(true)
  }

  return (
    <Box sx={{
      outline: "1px solid black",
      width: "100%",
      height: "15%"
    }}>
      <Stack sx={{
        height: 1,
        width: 1,
        alignItems: "center",
        justifyContent: "center"
      }}
        direction="row">
        <Box sx={{
          display: {
            xs: "flex",
            sm: "none"
          }
        }}>
          <Link to="/" onClick={display}>
            back</Link>
        </Box>
        <TextField
          size="small"
          component="form"
          onSubmit={formSubmit}
          inputRef={messsageDiv} />
      </Stack>
    </Box>
  )
}
