import React, { useRef, useEffect, useState } from 'react'
import { Box, Paper, Card, CardMedia } from '@mui/material'
import { useParams } from 'react-router-dom'
export const Message = ({ res }) => {
    const { userChat } = useParams()
    const [url, setUrl] = useState("")
    useEffect(() => {
        if (res?.formServer) return
        scroll?.current?.scrollIntoView({ behaviour: "smooth" })
    }, [])
    useEffect(() => {
        if (res.type === "text") return
        if (res.from === userChat) {
            setUrl(res.url)
            return
        }
        if (res.to === userChat) {
            const reader = new FileReader()
            reader.onload = (event) => {
                setUrl(`${event.target.result}`)

            }
            reader.readAsDataURL(res.file)
        }
    }, [])
    const scroll = useRef()

    if (res.from === userChat && res.type === "text") {
        return <Box ref={scroll} sx={{
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

    }

    if (res.type === "text") return <Box ref={scroll} sx={{
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
            {res.message}

        </Paper>
    </Box>


    if (res.from === userChat && res.type === "image") {
        return <Box ref={scroll} sx={{
            alignSelf: "flex-start",
            mx: "15%",
        }}>
            <Paper
                sx={{
                    backgroundColor: "primary.dark",
                    color: "white",
                    // borderRadius: 5,
                    py: 0.2,
                    px: 0.4,

                }}
            >
                <Paper
                    sx={{
                        backgroundImage: `url(${url})`,
                        backgroundSize: '100% 100%',
                        backgroundRepeat: 'no-repeat',
                        height: 200,
                        width: 200,
                    }}
                >
                </Paper>
            </Paper>
        </Box>
    }

    if (res.type === "image") {
        return <Box ref={scroll} sx={{
            alignSelf: "flex-end",
            mx: "15%",
        }}>
            <Paper sx={{
                backgroundColor: "success.light",
                color: "white",
                // borderRadius: 5,
                py: 0.2,
                px: 0.4

            }}>
                <Paper
                    sx={{
                        backgroundImage: `url(${url})`,
                        backgroundSize: '100% 100%',
                        backgroundRepeat: 'no-repeat',
                        height: 200,
                        width: 200,
                    }}
                >
                </Paper>
            </Paper>
        </Box>
    }



    if (res.from === userChat && res.type === "video") {
        return <Box ref={scroll} sx={{
            alignSelf: "flex-start",
            mx: "15%",
        }}>
            <Paper
                sx={{
                    backgroundColor: "primary.dark",
                    color: "white",
                    // borderRadius: 5,
                    py: 0.2,
                    px: 0.4,

                }}
            >
                <Card sx={{
                    width: 1,
                    height: 1,
                }}>
                    <CardMedia
                        component="video"
                        image={url}
                        alt="image"
                        sx={{
                            height: 180,
                            width: 1,
                            mx: "auto"
                        }}
                        autoPlay
                    />
                </Card>
            </Paper>
        </Box>
    }

    if (res.type === "video") {
        return <Box ref={scroll} sx={{
            alignSelf: "flex-end",
            mx: "15%",
        }}>
            <Paper sx={{
                backgroundColor: "success.light",
                color: "white",
                // borderRadius: 5,
                py: 0.2,
                px: 0.4

            }}>
                <Card sx={{
                    width: 1,
                    height: 1,
                }}>
                    <CardMedia
                        component="video"
                        image={url}
                        alt="image"
                        sx={{
                            height: 180,
                            width: 1,
                            mx: "auto"
                        }}
                        autoPlay
                    />
                </Card>
            </Paper>
        </Box>
    }
}
