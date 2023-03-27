import React, { useEffect } from 'react'
import { Box, Stack } from '@mui/material'
import { useSocketContext } from '../../contexrt/SocketContext'
import { getContacts } from '../../app/store'
export const Contacts = () => {
  const { showContacts } = useSocketContext()
  const contacts = getContacts()

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
      <Stack>
        {contacts?.map((res) => {
          return <h1 key={res?._id}>{res.name}</h1>
        })}
      </Stack>
    </Box>
  )
}
