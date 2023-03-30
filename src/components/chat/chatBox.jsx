import React, { useState, useEffect } from 'react'
import { Box, Stack } from '@mui/material'
import { getContacts } from '../../app/store'
import { useParams } from 'react-router-dom'
import { resetNewMessages } from '../../features/userSlice'
import { useDispatch } from 'react-redux'
export const ChatBox = () => {
  const contacts = getContacts()
  const { userChat } = useParams()
  const [contact, setContactForMessageBox] = useState()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(resetNewMessages(userChat))
  }, [userChat,contacts])


  useEffect(() => {
    contacts.map((res) => {
      if (res._id === userChat) {
        setContactForMessageBox(res)
      }
    })
  }, [contacts])
  return (
    <Box sx={{
      outline: "1px solid black",
      width: "100%",
      height: "85%"

    }}>
      <Stack sx={{
        width: 1
        , height: 1,

      }}
        gap={1}>
        {contact?.messages?.map((res, index) => {
          return <Box key={index} sx={{
            alignSelf: `${res.from === userChat ? "flex-start" : "flex-end"}`,
            mx: "15%"
          }}>
            {res.message}
          </Box>
        })}
      </Stack>
    </Box>
  )
}
