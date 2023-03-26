import React from 'react'
import { Box } from '@mui/material'
import { useSocketContext } from '../../contexrt/SocketContext'
export const Contacts = () => {
  const { showContacts } = useSocketContext()
  return (
    <Box sx={{
      outline: "1px solid black",
      width: {
        xs: "100%",
        sm: "33.33%"
      },
      display: {
        xs: `${showContacts ? "flex" : "none"}`,
        sm: "flex"
      }
    }}>
      contacts
    </Box>
  )
}
