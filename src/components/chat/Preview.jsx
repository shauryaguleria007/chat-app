import React, { useRef } from 'react'
import { useFileUploadContext } from '../../contexrt/FileUplaodContext'
import { Box, Paper, Stack, Button, Grid, Card, CardMedia, CardHeader, IconButton } from "@mui/material"
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

import { Link, useParams } from 'react-router-dom'
export const Preview = () => {
  const { file, setPreview } = useFileUploadContext()
  const { userChat } = useParams()
  const previewbox = useRef()
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
                  return <PreviewImage res={res} key={index} />
                if (res.type === "video")
                  return <PreviewVideo res={res} key={index} />
              })}
            </Grid>
          </Box>

        </Box>
        <Stack direction='row' sx={{
          gap: 6,
          width: 1,
          justifyContent: "center"
        }}>
          <Button variant="contained">SEND</Button>
          <Button onClick={() => setPreview(false)}>Add More</Button>

        </Stack>
      </Stack>
    </Paper>
  </>
}


const PreviewImage = ({ res }) => {
  return <Grid item xs={4}>
    <Card sx={{
      width: 1,
      height: 1,
    }}>
      <CardHeader
        action={
          <IconButton>
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


const PreviewVideo = ({ res }) => {
  return <Grid item xs={4}>
    <Card sx={{
      width: 1,
      height: 1,
    }}>
      <CardHeader
        action={
          <IconButton>
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