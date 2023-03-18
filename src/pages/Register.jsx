import React from 'react'
import { Stack, Card, TextField, Box, Button, FormControl, CardHeader, CardContent } from "@mui/material"
import { maxWidth, padding } from '@mui/system'
import { red } from '@mui/material/colors';
import { Link, useNavigate } from "react-router-dom"
import { useRef, useEffect, useState } from "react"
import { useRegisterMutation } from "../services/userApi"
import { Loading } from "../components/Loading"
export const Register = () => {
  const navigate = useNavigate()
  const email = useRef()
  const password = useRef()
  const name = useRef()
  const [errors, setErrors] = useState({
    email: false,
    password: false
  })

  const [registerUser, { data, error, isLoading }] = useRegisterMutation()

  useEffect(() => {
    if (data?.token) {
      localStorage.setItem("auth", data.token)
      return navigate("/")
    }
  }, [data])


  useEffect(() => {
    if (error?.data?.type === "credential") setErrors((state) => {
      return { ...state, password: true }
    })

    if (error?.data?.type === "duplicate") setErrors((state) => {
      return { ...state, email: true }
    })

  }, [error])

  const handelSubmit = async (e) => {
    e.preventDefault()
    const userCredentials = {
      email: email.current.value,
      password: password.current.value,
      name: name.current.value
    }
    await registerUser(userCredentials)

  }

  return <> <Box height="100vh"
    // backgroundColor={red['A100']}
    display={"flex"} alignItems="center" justifyContent={"space-around"}
   >
    <Card
      sx={{
        borderRadius: 3,
        padding: 4,
        boxShadow: 12
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
            error={errors.email}
            onFocus={() => setErrors((state) => {
              email.current.value = ""
              return { ...state, email: false }
            })}
            helperText={`${errors.email ? "This email is already registered ." : ""}`}
          />

          <TextField label="name"
            type="text"
            required size='small'
            inputRef={name}
          />

          <TextField label="password"
            required type="password"
            size="small"
            inputRef={password}
            error={errors.password}
            onFocus={() => setErrors((state) => {
              password.current.value = ""
              return { ...state, password: false }
            })}
            helperText={`${errors.password ? "invalid password formatt ." : ""}`}
          />

          <Box display={"flex"}
            justifyContent={"center"}>
            <Button variant='contained'
              type="submit"
              size="small"
            >Register</Button>
          </Box>
          <Button variant='outlined'
            size="medium"
            sx={{ marginTop: 3 }}>Google</Button>
          <Link to="/login" style={
            { textDecoration: "none" }
          }>
            <Button variant='contained' size="medium" fullWidth>Login</Button>
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
      display={isLoading ? "flex" : "none"}   //trigger with is loading after api call
      alignItems="center"
      justifyContent={"center"}
    >
      <Loading />
    </Box>
  </>
}
