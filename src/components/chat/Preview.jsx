import React, { useRef, useState, useEffect } from 'react'
import { useFileUploadContext } from '../../contexrt/FileUplaodContext'
import { Box, Paper, Stack, Button, Grid, Card, CardMedia, CardHeader, IconButton } from "@mui/material"
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useSocketContext } from '../../contexrt/SocketContext';
useSocketContext
export const Preview = () => {
  const { file, setPreview } = useFileUploadContext()
  const { sendFile } = useSocketContext()
  const navigate = useNavigate()
  const { userChat } = useParams()
  const previewbox = useRef()
  const [send, setSend] = useState(false)
  useEffect(() => {
    if (!send) return
    sendFile({ file, to: userChat })
    navigate(`/${userChat}`)
  }, [send])
  return <>
    <Paper sx={{
      width: 1,
      height: 1,
      px: 3

    }}>
      <Stack
        alignItems={"center"}
        justifyContent={"space-around"}
        sx={{
          height: 1,
        }}
      >

        <Box sx={{
          width: 1,
          height: 2 / 3,
        }}
          ref={previewbox}
        >
          <Box sx={{
            width: 1,
            overflowY: "scroll",
            "::-webkit-scrollbar": {
              display: "none"
            },
            height: `${previewbox?.current?.offsetHeight}px`,
          }}>
            <Grid container sx={{
              justifyContent: "center",
              width: 1,
            }}
              columnSpacing={6}
              rowSpacing={3}
            >
              {file.map((res, index) => {
                if (res.type === "image")
                  return <PreviewImage res={res} key={index} id={index} />
                if (res.type === "video")
                  return <PreviewVideo res={res} key={index} id={index} />
              })}
            </Grid>
          </Box>

        </Box>
        <Stack direction='row' sx={{
          gap: 6,
          width: 1,
          justifyContent: "center"
        }}>
          <Button variant="contained" onClick={() => setSend(true)} > SEND</Button>
          <Button onClick={() => setPreview(false)}>Add More</Button>

        </Stack>
      </Stack>
    </Paper >
  </>
}


const PreviewImage = ({ res, id }) => {
  const { removeMedia } = useFileUploadContext()
  return <Grid item xs={4}>
    <Card sx={{
      width: 1,
      height: 1,
    }}>
      <CardHeader
        action={
          <IconButton onClick={() => removeMedia(id)}>
            <RemoveCircleOutlineIcon />
          </IconButton>

        }
      />
      <CardMedia
        component="img"
        image={res.url}
        alt="image"
        sx={{
          height: 180,
          width: 180,
          mx: "auto"
        }}
      />
    </Card>
  </Grid>
}


const PreviewVideo = ({ res, id }) => {
  const { removeMedia } = useFileUploadContext()
  return <Grid item xs={4}>
    <Card sx={{
      width: 1,
      height: 1,
    }}>
      <CardHeader
        action={
          <IconButton onClick={() => removeMedia(id)} >
            <RemoveCircleOutlineIcon />
          </IconButton>

        }
      />

      <CardMedia
        component="video"
        image={res.url}
        alt="image"
        sx={{
          height: 180,
          width: 1,
          mx: "auto"
        }}
        autoPlay
      />
    </Card>
  </Grid>
}