import { Children, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Logout } from './pages/Logout'
import { SendImage } from "./pages/homeComponents/SendImage"
import { Error } from './pages/Error'
import { Register } from './pages/Register'
import { Authorizer } from './components/authorizer'
import { Verify } from './pages/Verify'
import { Alert } from "@mui/material"
import { useComponentContext } from "./contexrt/ComponentContect"
import { SocketProvider } from './contexrt/SocketContext'
import { Chat } from "./pages/homeComponents/Chat"
import { FileUploadProvider } from './contexrt/FileUplaodContext'
import { v4 as uuidv4 } from 'uuid';

function App() {
  const { warning } = useComponentContext()
  return (
    <>
      {warning.trigger ? <Alert severity='warning' sx={{
        width: "75vw",
        zIndex: "10",
        position: "absolute",
        left: "50%",
        top: '10px',
        transform: "translateX(-50%)"
      }} >{warning.message}</Alert> : null
      }
      <BrowserRouter>
        <Routes >
          <Route path="/" element={<Authorizer />}>
            <Route path='/' element={<SocketProvider><Home /></SocketProvider>} >
              <Route path="/:userChat" element={<Chat />} />
              <Route path='image/:userChat' element={<FileUploadProvider><SendImage /></FileUploadProvider>} />
            </Route>
            <Route path='email/:id' element={<Verify />} />

          </Route>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path="/logout" element={<Logout />} />
          <Route path='*' element={<Error />} />
        </Routes>
      </BrowserRouter ></>
  )
}


export default App
