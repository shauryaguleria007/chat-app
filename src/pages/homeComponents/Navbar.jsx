import React, { useEffect, useRef, useState } from 'react'
import { Box, Avatar, TextField, Typography, Toolbar, Button, Stack, AppBar, Card, CardContent, Paper } from "@mui/material"
import { getUser } from '../../app/store'
import { useFindUserMutation } from "../../services/userApi"

export const Navbar = () => {
    const user = getUser()
    const chatUser = useRef()
    const offset = useRef()

    const [displaySearch, setDisplaySearch] = useState({
        display: false,
        x: 0,
        y: 0,
        z: 0
    })
    const [searchUser, { error, isFetching, data }] = useFindUserMutation()

    useEffect(() => {
        if (!data && !error) return
        setDisplaySearch((state) => {
            return {
                display: true,
                x: (offset?.current?.offsetLeft + offset?.current?.offsetWidth / 2),
                y: offset?.current?.offsetTop,
                z: offset?.current?.offsetHeight
            }
        })
    }, [data, error])


    useEffect(() => {
        const click = () => {
            setDisplaySearch({
                display: false,
                x: 0,
                y: 0,
                z: 0
            })
        }

        document.body.addEventListener("click", click)
        return () => {
            document.body.removeEventListener("click", click)
        }
    }, [])


    const findUser = async (e) => {

        // check here if user  already exists 
        e.preventDefault()
        await searchUser({ id: chatUser.current.value })
        chatUser.current.value = ""

    }
    return <><AppBar sx={{
        // height: "10%",
    }}
        position="static">
        <Toolbar sx={{
            justifyContent: "space-between",
            mx: {
                xs: 1,
                sm: 5
            }
        }}>
            <Typography variant="h5" sx={{
                display: {
                    xs: "none",
                    sm: "flex"
                }
            }}>
                ChatApp
            </Typography>
            <TextField
                component="form"
                sx={{
                    background: "white"
                }}
                size="small"
                placeholder='search ...'
                variant='outlined'
                inputRef={chatUser
                }
                ref={offset}
                onSubmit={findUser}
            />

            <Avatar sx={{
            }} />
        </Toolbar>
    </AppBar>
        <Box alignItems={"center"}
            justifyContent={"center"}
            position={"absolute"}
            sx={{
                display: `${displaySearch.display ? "flex" : "none"}`,
                top: (displaySearch.y + displaySearch.z + 30),
                left: (displaySearch.x),
                transform: "translateX(-50%)",
                bgcolor: "white",
                outline: "1 px solid black"
                , height: "50%",
                overflowY: "scroll",
                scrollbarWidth: "none",
                width: "100%"
            }}
            id="search"
        >

            {(data) ? <Stack gap={1}>
                {data.map((res, index) => {
                    return <Paper key={index} sx={{
                        px: 3,
                        py: 1,
                        mx: "auto",
                        width: 300
                    }}>
                        <Stack direction={"row"} gap={8} sx={{
                            alignItems: "center",
                            justifyContent: "space-between"
                        }}>
                            <Avatar sx={{ width: 24, height: 24 }}
                            />
                            <h6>{res.name}</h6>
                            <Button>add</Button>
                        </Stack>
                    </Paper>
                })}

            </Stack> : null}
            {error ? "no user found with given credentials " : ''}
        </Box>
    </>
}
