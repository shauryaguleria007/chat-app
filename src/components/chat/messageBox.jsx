import React, { useRef, useEffect } from 'react'
import { Box, Stack, TextField, Paper, IconButton } from '@mui/material'
import { useSocketContext } from "../../contexrt/SocketContext"
import { useComponentContext } from '../../contexrt/ComponentContect'
import { Link } from "react-router-dom"
import SendIcon from '@mui/icons-material/Send';


import { useParams } from 'react-router-dom'
export const MessageBox = () => {
  const messsageDiv = useRef()
  const { userChat } = useParams()
  const { sendMessage } = useSocketContext()
  const { setShowContacts } = useComponentContext()
  const formSubmit = (e) => {
    e.preventDefault()
    if (messsageDiv?.current?.value === "") return
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
    <Paper sx={{
      // outline: "1px solid black",
      width: "100%",
      height: "15%"
    }}
variant="outlined"
    >
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
        <Stack component="form"
          onSubmit={formSubmit}
          direction={"row"}
        >
          <TextField
            size="small"
            inputRef={messsageDiv}
            variant="standard"
            placeholder='message'
          />
          <Box>
            <IconButton vartiant="contained" type="submit">
              <SendIcon />
            </IconButton>
          </Box>
        </Stack>
        <Link to="/logout">logout</Link>

      </Stack>
    </Paper>
  )
}
