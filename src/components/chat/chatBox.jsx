import React, { useState, useEffect, useRef } from 'react'
import { Box, Stack, Paper } from '@mui/material'
import { useGetMessagesMutation } from '../../services/userApi'
import { getContacts } from '../../app/store'
import { useParams } from 'react-router-dom'
import { resetNewMessages, addMessagesFromDataBase } from '../../features/userSlice'
import { useDispatch } from 'react-redux'
import { Message } from "./Message"
import { getUser } from '../../app/store'
export const ChatBox = () => {
  const contacts = getContacts()
  const user = getUser()
  const { userChat } = useParams()
  const [contact, setContactForMessageBox] = useState()
  const dispatch = useDispatch()
  const box = useRef()
  const [getMessages, { data, isFetching, error }] = useGetMessagesMutation()

  const getData = async () => {
    await getMessages({ id: user?.id, contact: userChat })
  }

  // useEffect(() => {
  //   getData()
  // }, [])           //related to backup 


  useEffect(() => {
    if (!data) return
    dispatch(addMessagesFromDataBase(data))
  }, [data])

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



  return (
    <Box sx={{
      // outline: "1px solid black",
      width: "100%",
      height: "85%"
    }}>
      <Paper
        sx={{
          height: 1,
          width: 1
        }}
        ref={box}
        variant="outlined">
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
            return <Message key={index} res={res} />
          })}
        </Stack >
      </Paper >
    </Box>
  )
}
