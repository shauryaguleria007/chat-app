import { useState, createContext, useContext, useEffect } from "react"


const FileUploadContext = createContext()

export const FileUploadProvider = ({ children }) => {
    const [file, setfile] = useState([])
    const [showPreview, setPreview] = useState(false)

    useEffect(() => {
        console.log(file)
    }, [file])
    return <FileUploadContext.Provider value={{
        file,
        setfile,
        showPreview,
        setPreview
    }}>
        {children}
    </FileUploadContext.Provider>
}



export const useFileUploadContext = () => useContext(FileUploadContext)