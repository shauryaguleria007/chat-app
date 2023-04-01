import React, { useRef, useEffect } from 'react'
import { Box, Paper } from '@mui/material'
import { useParams } from 'react-router-dom'
export const Message = ({ res }) => {
    const { userChat } = useParams()
    useEffect(() => {
        scroll?.current?.scrollIntoView({ behaviour: "smooth" })
    }, [])
    const scroll = useRef()
    if (res.from === userChat) return <Box ref={scroll} sx={{
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
    return <Box ref={scroll} sx={{
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
            {/* <CardHeader /> */}
            {res.message}

        </Paper>
    </Box>
}
