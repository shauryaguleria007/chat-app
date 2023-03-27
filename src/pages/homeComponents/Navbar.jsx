import React, { useEffect, useRef, useState } from 'react'
import { Box, Avatar, TextField, Typography, Toolbar, Button, Stack, AppBar, Card, CardHeader, CardContent, Paper } from "@mui/material"
import {
    blueGrey
} from '@mui/material/colors';

import { getUser } from '../../app/store'
import { useFindUserMutation } from "../../services/userApi"
import { addContact } from '../../features/userSlice';
import { useDispatch } from 'react-redux';

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
            }} src={user?.avatarUrl} />
        </Toolbar>
    </AppBar>
        <Box alignItems={"center"}
            justifyContent={"center"}
            position={"absolute"}
            sx={{
                display: `${displaySearch.display ? "flex" : "none"}`,
                top: (displaySearch.y + displaySearch.z + 50),
                left: "50%",
                transform: "translateX(-50%)",
                height: "50%",
                width: "100%",
                "& ::-webkit-scrollbar": {
                    display: "none"
                }
            }}
            id="search"
        >
            <Card sx={{
                py: 2,
                px: 3,
                height: "100%",
                overflowY: "scroll",

            }} elevation={9}>
                <CardHeader title={error ? "" : "Results for"} subheader={error ? "" : `${chatUser?.current?.value}`} />
                <CardContent>

                    {(data) ? <Stack gap={1}>
                        {data.map((res, index) => {
                            return <SearchComponent key={index} res={res} />
                        })}

                    </Stack> : null}
                    {error ? "no user found with given credentials " : ''}</CardContent></Card>
        </Box>
    </>
}



const SearchComponent = ({ res }) => {
    const dispatch = useDispatch()
    const add = () => {
        dispatch(addContact(res))
    }
    return <Paper sx={{
        px: 3,
        py: 1,
        mx: "auto",
        width: 300,
        // backgroundColor: blueGrey["A400"],

    }}
    >
        <Stack direction={"row"} sx={{
            gap: {
                xs: 1,
                sm: 6
            },
            alignItems: "center",
            justifyContent: "space-between"
        }}
        >
            <Avatar sx={{ width: 24, height: 24 }} src={`${res?.avatarUrl}`}
            />
            <h6>{res.name}</h6>
            <Button onClick={add}>add</Button>
        </Stack>
    </Paper>
}