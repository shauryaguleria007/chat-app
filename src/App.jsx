import { Children, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Logout } from './pages/Logout'

import { Error } from './pages/Error'
import { Register } from './pages/Register'
import { Authorizer } from './components/authorizer'
import { Verify } from './pages/Verify'
import { Alert } from "@mui/material"
import { useComponentContext } from "./contexrt/ComponentContect"
import { SocketProvider } from './contexrt/SocketContext'
function App() {
  const { warning } = useComponentContext()
  return (
    <>
      {warning.trigger ? <Alert severity='warning' sx={{
        width: "75vw",
        mx: "auto",
        mt: 1,
      }} >{warning.message}</Alert> : null
      }
      <BrowserRouter>
        <Routes >
          <Route path="/" element={<Authorizer />}>
            <Route path='/' element={<SocketProvider><Home /></SocketProvider>
            } />
            <Route path='/:id' element={<Verify />} />
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
