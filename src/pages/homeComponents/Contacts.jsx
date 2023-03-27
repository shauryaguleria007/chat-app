import React, { useEffect, useRef } from 'react'
import { Box, Stack, Paper, Avatar, Typography, Card, CardHeader, CardContent, Button } from '@mui/material'
import { useSocketContext } from '../../contexrt/SocketContext'
import { getContacts } from '../../app/store'
import { Link, useParams } from 'react-router-dom'

export const Contacts = () => {
  const { showContacts } = useSocketContext()
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
          {contacts?.map((res) => {
            return <Contact key={res._id} res={res} />
          })}
          {contacts?.map((res) => {
            return <Contact key={res._id} res={res} />
          })}{contacts?.map((res) => {
            return <Contact key={res._id} res={res} />
          })}{contacts?.map((res) => {
            return <Contact key={res._id} res={res} />
          })}{contacts?.map((res) => {
            return <Contact key={res._id} res={res} />
          })}{contacts?.map((res) => {
            return <Contact key={res._id} res={res} />
          })}{contacts?.map((res) => {
            return <Contact key={res._id} res={res} />
          })}{contacts?.map((res) => {
            return <Contact key={res._id} res={res} />
          })}{contacts?.map((res) => {
            return <Contact key={res._id} res={res} />
          })}{contacts?.map((res) => {
            return <Contact key={res._id} res={res} />
          })}{contacts?.map((res) => {
            return <Contact key={res._id} res={res} />
          })}{contacts?.map((res) => {
            return <Contact key={res._id} res={res} />
          })}{contacts?.map((res) => {
            return <Contact key={res._id} res={res} />
          })}{contacts?.map((res) => {
            return <Contact key={res._id} res={res} />
          })}{contacts?.map((res) => {
            return <Contact key={res._id} res={res} />
          })}{contacts?.map((res) => {
            return <Contact key={res._id} res={res} />
          })}{contacts?.map((res) => {
            return <Contact key={res._id} res={res} />
          })}{contacts?.map((res) => {
            return <Contact key={res._id} res={res} />
          })}{contacts?.map((res) => {
            return <Contact key={res._id} res={res} />
          })}{contacts?.map((res) => {
            return <Contact key={res._id} res={res} />
          })}{contacts?.map((res) => {
            return <Contact key={res._id} res={res} />
          })}{contacts?.map((res) => {
            return <Contact key={res._id} res={res} />
          })}{contacts?.map((res) => {
            return <Contact key={res._id} res={res} />
          })}{contacts?.map((res) => {
            return <Contact key={res._id} res={res} />
          })}{contacts?.map((res) => {
            return <Contact key={res._id} res={res} />
          })}

        </Stack>
      </Paper>
    </Box >
  )
}


const Contact = ({ res }) => {
  const { userChat } = useParams()

  return <>

    <Link to={`/${res._id}`} style={{
      textDecoration: "none",
      width: "100%"
    }}>
      <Card sx={{
        width: "100%",
        "& :hover": {
          backgroundColor: "pink"
        }
        , zIndex: "tooltmodalip"
        ,
        backgroundColor: `${userChat === res._id ? "grey" : "none"}`,
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

  </>
}