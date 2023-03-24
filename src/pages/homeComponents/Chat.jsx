import React from 'react'
import { Box, Stack } from '@mui/system'
import { ChatBox } from "../../components/chat/chatBox"
import { MessageBox } from "../../components/chat/messageBox"

export const Chat = () => {
  return (
    <Box sx={{
      outline: "1px solid black",
      width: "66.66%"
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
