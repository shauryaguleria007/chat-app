import React, { useEffect, useRef } from 'react'
import { Link, useParams } from "react-router-dom"
import { Navbar } from './homeComponents/Navbar'
import { Box, Stack } from '@mui/material'
import { Outlet } from "react-router-dom";
import { Contacts } from "./homeComponents/Contacts"
import { useDispatch } from 'react-redux'
import { getUser } from '../app/store'
import { addContact } from '../features/userSlice'
import { useComponentContext } from '../contexrt/ComponentContect'
export const Home = () => {
  const { userChat } = useParams()
  const user = getUser()
  const dispatch = useDispatch()
  const { setShowContacts, Warning } = useComponentContext()
 
  useEffect(() => {
    if (!userChat) setShowContacts(true)
    else setShowContacts(false)
  }, [userChat])
  useEffect(() => {
    user?.contacts.map((state) => {
      dispatch(addContact(state))
    })
  }, [user])

  return <>
    <Box sx={{
      height: "100vh",
      width: "100vw",

    }}>
      <Stack rowGap={1} sx={{
        height: 1,
        width: 1,

      }}>
        <Navbar />
        <Stack sx={{
          height: 1,
          pb: 1,
          px: 1
        }}
          direction="row"
          gap={1}
        >
          <Contacts />
          {userChat ? <Outlet /> : <DefaultView />}
        </Stack>
        <Link to="/logout">logout {user?.email}</Link>
      </Stack>
    </Box>
  </>

}

const DefaultView = () => {
  return <Box sx={{
    outline: "1px solid black",
    width: "66.66%",
    display: {
      xs: "none",
      sm: "flex"
    }
  }}>
    defaultView
  </Box>
}