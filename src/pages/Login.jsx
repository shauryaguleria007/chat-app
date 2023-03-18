import React from 'react'
import { Stack, Card, TextField, Box, Button, FormControl, CardHeader, CardContent } from "@mui/material"
import { maxWidth, padding } from '@mui/system'
import { red } from '@mui/material/colors';
import { Link } from "react-router-dom"
import { useRef, useEffect, useState } from "react"
import { useLoginMutation } from "../services/authApi"
import { useNavigate } from "react-router-dom"
import { Loading } from "../components/Loading"




export const Login = () => {
  const email = useRef()
  const password = useRef()
  const navigate = useNavigate()

  const [loginUser, { data, error, isLoading }] = useLoginMutation()

  const [errors, setErrors] = useState({
    email: false,
    password: false
  })

  useEffect(() => {
    if (data?.token) {
      localStorage.setItem("auth", data.token)
      return navigate("/")
    }
  }, [data])

  useEffect(() => {
    if (error?.data?.type === "password") setErrors((state) => {
      return { ...state, password: true }
    })

    if (error?.data?.type === "credential") setErrors((state) => {
      return { ...state, email: true }
    })
  }, [error])

  const handelSubmit = async (e) => {
    e.preventDefault()
    const userCredentials = {
      email: email.current.value,
      password: password.current.value
    }
    await loginUser(userCredentials)
  }

  return <>
    <Box height="100vh"
      // backgroundColor={red['A100']}
      display={"flex"} alignItems="center" justifyContent={"space-around"}
   >
      <Card
        sx={{
          borderRadius: 3,
          padding: 4,
          boxShadow: 15,
        }
        }
        
      >
        <CardHeader title="Welome to the chat app "
          subheader="please enter your account details "
        />

        <CardContent>
          <Stack component={"form"} rowGap={2} onSubmit={handelSubmit} >
            <TextField label="email"
              type="email"
              required size='small'
              inputRef={email}
              disabled={isLoading}
              error={errors.email}
              helperText={errors.email ? "invalid email" : ""}
              onFocus={() => setErrors((state) => {
                email.current.value = ""
                return { ...state, email: false }
              })}
            />

            <TextField label="password"
              required type="password"
              size="small"
              inputRef={password}
              disabled={isLoading}
              error={errors.password}
              helperText={errors.password ? "wrong password" : ""}
              onFocus={() => setErrors((state) => {
                password.current.value = ""
                return { ...state, password: false }
              })}
            />

            <Box display={"flex"}
              justifyContent={"center"}>
              <Button variant='contained'
                type="submit"
                size="small"
                disabled={isLoading}>Login</Button>
            </Box>

            <Button variant='outlined'
              size="medium"
              sx={{ marginTop: 3 }}>Google
            </Button>

            <Link to="/register" style={
              { textDecoration: "none" }
            }>
              <Button variant='contained' size="medium" fullWidth>Register</Button>
            </Link>
          </Stack>
        </CardContent>
      </Card>
    </Box >
    <Box height={"100vh"}
      bgcolor={"rgba(0,0,0,0.66)"}
      zIndex={100}
      width={"100vw"}
      position="absolute" top={0}
      display={isLoading ? "flex" : "none"}
      alignItems="center"
      justifyContent={"center"}
    >
      <Loading />
    </Box>
  </>
}
