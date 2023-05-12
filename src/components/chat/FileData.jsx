import React, { useState, useRef, useEffect } from 'react'
import { Box, Paper, Stack, IconButton, Input, Button } from "@mui/material"
import FileUploadIcon from '@mui/icons-material/FileUpload';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link, useParams } from "react-router-dom"
import { useFileUploadContext } from "../../contexrt/FileUplaodContext"


export const FileData = () => {
    const { userChat } = useParams()
    const inputRef = useRef()
    const { setfile, setPreview } = useFileUploadContext()



    const handleDragOver = (e) => {
        e.preventDefault()
    }

    const addUrl = async (res) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.addEventListener("load", () => {
                resolve(reader.result)
            })
            if (res) reader.readAsDataURL(res);
        })
    }

    const handleDrop = async (e) => {
        e.preventDefault()
        Array.from(e.dataTransfer.files).map(async (res) => {
            if (res.type.match("image/*") || res.type.match("/*.mp4")) {
                const url = await addUrl(res)
                console.log(res.type);
                setfile((state) => {
                    state.push({
                        file: res, url, type: res.type
                    })
                    return [...state]
                })
                setPreview(true)
            }
        })

    }

    const handleAddFile = async (e) => {
        e.preventDefault()
        Array.from(e.target.files).map(async (res) => {
            if (res.type.match("image/*") || res.type.match("/*.mp4")) {
                console.log(res.type);

                const url = await addUrl(res)
                setfile((state) => {
                    state.push({
                        file: res, url, type: res.type
                    })
                    return [...state]
                })
                setPreview(true)
            }
        })
        setPreview(true)

    }
    return <Paper sx={{
        width: 1,
        height: 1
    }}>
        <Stack gap={3}
            alignItems={"center"}
            justifyContent={"center"}
            height={1}
            width={1}>
            <Paper sx={{
                height: 2 / 3,
                width: 2 / 3,
                p: 4
            }}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
            >
                <Stack sx={{
                    justifyContent: "space-between",
                    alignItems: "center",
                    height: 1,

                }}>
                    <input type="file" ref={inputRef} hidden multiple
                        accept='image/*,.mp4'
                        onChange={handleAddFile} />
                    <Box>drag files here</Box>
                    <Stack direction={"row"} gap={3}
                        sx={{
                            width: 1,
                            justifyContent: "space-around"
                        }}>
                        <Link to={`/${userChat}`} style={{
                            textDecoration: "none"
                        }}>
                            <Button startIcon={<ArrowBackIcon />} variant="contained">Back</Button>
                        </Link>
                        <Button variant='contained' onClick={() => inputRef?.current?.click()} startIcon={<FileUploadIcon />}>Add media</Button>
                    </Stack>
                </Stack>
            </Paper >
        </Stack >
    </Paper >

}


