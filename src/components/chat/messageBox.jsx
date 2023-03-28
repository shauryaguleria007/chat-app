import React, { useRef, useEffect } from 'react'
import { Box, Stack, TextField } from '@mui/material'
import { useSocketContext } from "../../contexrt/SocketContext"
import { useParams } from 'react-router-dom'
export const MessageBox = () => {
  const messsageDiv = useRef()
  const { userChat } = useParams()
  const { sendMessage } = useSocketContext()
  const formSubmit = (e) => {
    e.preventDefault()
    sendMessage({
      message: messsageDiv?.current?.value,
      to: userChat
    })
    messsageDiv.current.value = ""
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
        <TextField
          size="small"
          component="form"
          onSubmit={formSubmit}
          inputRef={messsageDiv} />
      </Stack>
    </Box>
  )
}
