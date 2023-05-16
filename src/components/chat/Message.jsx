import React, { useRef, useEffect, useState } from 'react'
import { Box, Paper, Card, CardMedia } from '@mui/material'
import { useParams } from 'react-router-dom'
import { useGetFileMutation } from '../../services/userApi'
export const Message = ({ res }) => {
    const { userChat } = useParams()
    const [url, setUrl] = useState("")
    const [getFile, { data, error, isFetching }] = useGetFileMutation()


    const addUrl = async (res) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.addEventListener("load", () => {
                resolve(reader.result)
            })
            if (res) reader.readAsDataURL(res);
        })
    }


    useEffect(() => {
        if (res?.formServer) return
        scroll?.current?.scrollIntoView({ behaviour: "smooth" })
    }, [])
    useEffect(() => {
        console.log(res);

        const callGetFile = async () => {
            await getFile({ id: res.file })
        }
        if (res.type === "text") return
        if ((res.type === "image/png" || res.type === "video/mp4") && res.fromServer === true)
            callGetFile()
        if ((res.type === "image/png" || res.type === "video/mp4") && res.fromServer === false) {
            const getUrl = async () => {
                const urlData = await addUrl(res.file)
                setUrl(urlData)
            }
            getUrl()
        }


    }, [])

    useEffect(() => {
        if (data) {
            const getUrl = async () => {
                const urlData = await addUrl(data.blob)
                setUrl(urlData)
            }
            getUrl()
        }
        if (error) console.log(error);
    }, [data, error])


    useEffect(() => { console.log(url); }, [url])

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

    if (res.from === userChat && res.type === "image/png") {
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

    if (res.type === "image/png") {
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



    if (res.from === userChat && res.type === "video/mp4") {
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

    if (res.type === "video/mp4") {
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
