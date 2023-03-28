import React, { useEffect, useRef } from 'react'
import { Box, Stack, Paper, Avatar, Card, CardHeader, IconButton } from '@mui/material'
import { useComponentContext } from '../../contexrt/ComponentContect'
import { getContacts } from '../../app/store'
import { Link, useParams } from 'react-router-dom'
import { MoreVert } from '@mui/icons-material'


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
      }
    }}
      ref={box}
    >

      <Paper sx={{
        overflowY: "scroll",
        width: 1,
        height: `${box?.current?.offsetHeight}px`,
        px: 4,
      }}>


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
  const { displaySearch } = useComponentContext()
  return <>
    <Stack sx={{
      width: 1,
      display: {
        xs: `${displaySearch.display ? "none" : "felx"}`,
        md: "flex",
      }
    }}
      direction="row"
    >
      <Link to={`/${res._id}`} style={{
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
          variant="string"
        >
          <CardHeader avatar={
            <Avatar src={res?.avatarUrl} sx={{
            }} />
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