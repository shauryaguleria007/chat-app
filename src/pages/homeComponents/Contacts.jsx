import React, { useEffect, useRef, useState } from 'react'
import { Box, Stack, Paper, Avatar, Badge, Card, CardHeader, Typography, Button,IconButton, Popover } from '@mui/material'
import { useComponentContext } from '../../contexrt/ComponentContect'
import { getContacts } from '../../app/store'
import { Link, useParams } from 'react-router-dom'
import { MoreVert, Delete } from '@mui/icons-material'
import { useDeleteContactMutation } from '../../services/userApi'

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
      height: 1
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
  const [openPopOver, SetOpenPopOver] = useState(false)
  const [id, setId] = useState(undefined)
  const Anchor = useRef()

  const { displaySearch, setShowContacts } = useComponentContext()


  const display = (e) => {
    if (e.target.closest("#options")) e.preventDefault()
    setShowContacts(false)
  }

  const togglePopover = () => {
    SetOpenPopOver(!openPopOver)
  }


  useEffect(() => {
    contacts.map((singleContact) => {
      if (singleContact._id === res._id) setNewMessages(singleContact.new)
    })
  }, [contacts])
  useEffect(() => {
    setId(() => {
      return open ? 'simple-popover' : undefined
    })
  }, [open])

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
          width: "85%",
          ":hover": {
            backgroundColor: `${userChat === res._id ? "none" : "rgba(255, 192, 203, 0.2)"}`
          }
          ,
          backgroundColor: `${userChat === res._id ? "rgba(128, 128, 128, 0.125)" : "none"}`,
          mx: "auto"
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
            subheader={res.online ? "online" : "offline"}
            action={
              <IconButton id='options' aria-describedby={id} ref={Anchor} onClick={togglePopover} >
                <MoreVert />
                <Popover
                  id={id}
                  open={openPopOver}
                  anchorEl={Anchor.current}
                  // onClose={handleClose}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                >
                  <Options />
                </Popover>
              </IconButton>}
          />
        </Card></Link>
    </Stack>
  </>
}

const Options = () => {
  const [deleteContact, { data, isFetching, error }] = useDeleteContactMutation()
  const { userChat } = useParams()
  const runDelete = async () => {
    await deleteContact({ contact: userChat })
  }

  useEffect(() => {
    if (data) console.log(data);
  }, [data])
  return <Stack direction={"column"} gap={2} sx={{
    my: 2,
    mx: 5
  }}>
    <Stack direction="row" sx={{
      alignItems: "center",
      justifyContent: "center"
    }}>
      <Button startIcon={<Delete />} variant='text' color='secondary' onClick={runDelete}> 
        <Typography variant="body1">Delete</Typography>
      </Button>

    </Stack>
  </Stack>
}