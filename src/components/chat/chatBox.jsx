import React, { useState, useEffect, useRef } from 'react'
import { Box, Stack, Paper } from '@mui/material'
import { getContacts } from '../../app/store'
import { useParams } from 'react-router-dom'
import { resetNewMessages } from '../../features/userSlice'
import { useDispatch } from 'react-redux'
export const ChatBox = () => {
  const contacts = getContacts()
  const { userChat } = useParams()
  const [contact, setContactForMessageBox] = useState()
  const dispatch = useDispatch()
  const box = useRef()
  const scroll = useRef(null)

  useEffect(() => {
    dispatch(resetNewMessages(userChat))
  }, [userChat, contacts])


  useEffect(() => {
    contacts.map((res) => {
      if (res._id === userChat) {
        setContactForMessageBox(res)
      }
    })
  }, [contacts, userChat])

  useEffect(() => {
    scroll?.current?.scrollIntoView({ behaviour: "smooth" })
  }, [contact])


  return (
    <Box sx={{
      // outline: "1px solid black",
      width: "100%",
      height: "85%"
    }}
      ref={box}>

      <Stack sx={{
        overflowY: "scroll",
        width: 1,
        "::-webkit-scrollbar": {
          display: "none"
        },
        height: `${box?.current?.offsetHeight}px`,

      }}
        gap={1}>
        {contact?.messages?.map((res, index) => {
          if (res.from === userChat) return<Box key={index} ref={scroll} sx={{
            alignSelf: "flex-start",
            mx: "15%",
          }}>
            <Paper
              sx={{
                backgroundColor: "primary.dark",
                color: "white",
                borderRadius: 5,
                py: 1,
                px: 3,
              }}
            >
            {/* <CardHeader /> */}
            {res.message}

          </Paper>
          </Box>
          return <Box key={index} ref={scroll} sx={{
            alignSelf: "flex-end",
            mx: "15%",
          }}>
            <Paper
              sx={{
                backgroundColor: "success.light",
                color: "white",
                borderRadius: 5,
                py: 1,
                px: 3,
              }}
            >
            {/* <CardHeader /> */}
            {res.message}

          </Paper>
          </Box>
        })}
      </Stack >
    </Box >
  )
}
