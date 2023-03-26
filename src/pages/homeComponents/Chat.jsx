import React from 'react'
import { Box, Stack } from '@mui/system'
import { ChatBox } from "../../components/chat/chatBox"
import { MessageBox } from "../../components/chat/messageBox"
import { useSocketContext } from '../../contexrt/SocketContext'
export const Chat = () => {
  const { showContacts } = useSocketContext()
  return (
    <Box sx={{
      outline: "1px solid black",
      width: {
        xs: "100%",
        sm: "66.66%"
      },
      display: {
        xs: `${showContacts ? "none" : "flex"}`,
        sm:"flex"
      }
    }}>
      <Stack rowGap={1} sx={{
        justifyContent: "space-between",
        height: "100%",
        width: "100%"
      }}>
        <ChatBox />
        <MessageBox />
      </Stack>
    </Box>
  )
}
