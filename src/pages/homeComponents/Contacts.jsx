import React, { useEffect, useRef, useState } from 'react'
import { Box, Stack, Paper, Avatar, Badge, Card, CardHeader, IconButton } from '@mui/material'
import { useComponentContext } from '../../contexrt/ComponentContect'
import { getContacts } from '../../app/store'
import { Link, useParams } from 'react-router-dom'
import { Contrast, MoreVert } from '@mui/icons-material'

export const Contacts = () => {
  const { showContacts } = useComponentContext()

  const contacts = getContacts()
  const box = useRef()

  return (
    <Box sx={{
      width: {
        xs: "100%",
        sm: "33.33%",
      },
      display: {
        xs: `${showContacts ? "flex" : "none"}`,
        sm: "flex"
      },
      "& ::-webkit-scrollbar": {
        display: "none"
      },
    }}
      ref={box}
    >

      <Paper sx={{
        overflowY: "scroll",
        width: 1,
        height: `${box?.current?.offsetHeight}px`,
        px: 4,
      }}
        elevation={3}
      >


        <Stack width={"100%"} alignItems={"center"} gap={1} sx={{
          pt: 2,
        }}>
          {contacts?.map((res) => {
            return <Contact key={res._id} res={res} />
          })}
        </Stack>
      </Paper>
    </Box >
  )
}


const Contact = ({ res }) => {
  const { userChat } = useParams()
  const contacts = getContacts()
  const [newMessages, setNewMessages] = useState(0)
  const { displaySearch, setShowContacts } = useComponentContext()


  const display = () => {
    setShowContacts(false)
  }
  useEffect(() => {
    contacts.map((singleContact) => {
      if (singleContact._id === res._id) setNewMessages(singleContact.new)
    })
  }, [contacts])

  return <>
    <Stack sx={{
      width: 1,
      display: {
        xs: `${displaySearch.display ? "none" : "flex"}`,
        sm: "flex",
      }
    }}
      direction="row"
    >
      <Link to={`/${res._id}`} onClick={display} style={{
        textDecoration: "none",
        width: "100%"
      }}>

        <Card sx={{
          width: "100%",
          ":hover": {
            backgroundColor: `${userChat === res._id ? "none" : "rgba(255, 192, 203, 0.2)"}`
          }
          ,
          backgroundColor: `${userChat === res._id ? "rgba(128, 128, 128, 0.125)" : "none"}`
        }}
          variant={`${userChat === res._id ? "elevation" : "string"}`}
          elevation={1}
        >
          <CardHeader avatar={
            <Badge color="secondary"
              badgeContent={newMessages}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}>
              <Avatar src={res?.avatarUrl} sx={{
              }} />
            </Badge>
          }
            title={res?.name}
            subheader={"online "}
          />
        </Card></Link>
      <IconButton>
        <MoreVert />
      </IconButton>
    </Stack>
  </>
}