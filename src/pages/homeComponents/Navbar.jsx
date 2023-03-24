import React from 'react'
import { Box, Avatar, Stack } from "@mui/material"
import { getUser } from '../../app/store'
export const Navbar = () => {
    const user = getUser()
    return (
        <Box sx={{
            height: "10%",
            outline: "1px solid black",
        }}>
         navbar

        </Box>
    )
}
