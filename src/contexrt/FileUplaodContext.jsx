import { useState, createContext, useContext, useEffect } from "react"


const FileUploadContext = createContext()

export const FileUploadProvider = ({ children }) => {
    const [file, setfile] = useState([])
    const [showPreview, setPreview] = useState(false)

    const removeMedia = (index) => {
        setfile((res) => {
            res.splice(index, 1)
            return [...res]
        })
    }

   

    return <FileUploadContext.Provider value={{
        file,
        setfile,
        showPreview,
        setPreview,
        removeMedia
    }}>
        {children}
    </FileUploadContext.Provider>
}



export const useFileUploadContext = () => useContext(FileUploadContext)