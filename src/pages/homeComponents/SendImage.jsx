import React, { useState, useRef, useEffect } from 'react'
import { Box, Paper, Stack, IconButton, Input, Button } from "@mui/material"
import FileUploadIcon from '@mui/icons-material/FileUpload';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link, useParams } from "react-router-dom"
import { useFileUploadContext } from "../../contexrt/FileUplaodContext"
import { FileData } from '../../components/chat/FileData';
import { Preview } from "../../components/chat/Preview"
export const SendImage = () => {
    const { showPreview, setPreview, file } = useFileUploadContext()
  
    if (showPreview) return <Preview />
    return <FileData />
}


