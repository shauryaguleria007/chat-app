import React, { useEffect, useRef, useState } from 'react'
import { useAuthenticateUserQuery, useLazySendMailQuery } from '../services/authApi'
import { useNavigate, Link, Outlet, useParams } from 'react-router-dom'
import { Loading } from "./Loading"
import { useDispatch } from "react-redux"
import { setUser } from "../features/userSlice"
import { Box, Card, CardContent, CardHeader, TextField, Stack, CardActions } from "@mui/material"
import LoadingButton from '@mui/lab/LoadingButton'
import { display } from '@mui/system'
import { useComponentContext } from "../contexrt/ComponentContect"
import { Verify } from '../pages/Verify'

export const Authorizer = () => {
  const { Warning } = useComponentContext()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { id } = useParams()
  const { data, isLoading, isError, error } = useAuthenticateUserQuery()
  useEffect(() => {
    setTimeout(() => { }, 2000)
    if (isError) {
      if (error?.data?.type === "verification") return
      if (id) Warning("please login first ,then verify email through the recieved mail.", 6000)
      return navigate('/login')
    }
    if (data) {
      console.log(data, error)
      dispatch(setUser(data))
    }
  }, [data, isError, error])

  if (isLoading) return <Loading />
  if (data) return <Outlet />
  if (error?.data?.type === "verification") {
    if (id) return <Verify />
    else return <VerifyEmail />
  }

}


const VerifyEmail = () => {
  const { Warning } = useComponentContext()
  const navigate = useNavigate()
  const email = useRef()
  const [state, setState] = useState({
    err: false,
    success: false
  })
  const [sendMail, { error, isFetching, data }] = useLazySendMailQuery()

  const handelSubmit = async (e) => {
    e.preventDefault()
    await sendMail(email.current.value)
  }

  useEffect(() => {
    if (data?.success) setState((s) => {
      return { ...s, success: true }
    })
    if (error?.data?.type === "credential")
      setState((s) => {
        return { ...s, err: true }
      })
    if (error?.data === "Unauthorized") {
      Warning("please login first ")
      return navigate("/login")
    }


  }, [data, error])
  return <Box
    height="100vh"
    width="100vw"
    display={"flex"}
    alignItems="center"
    justifyContent={"center"}>
    <Card

      sx={{
        boxShadow: 15,
        borderRadius: "7px",
        py: {
          xs: 20,
          sm: 0
        },
        px: {
          xs: 3,
          sm: 0
        }
      }}


    >
      <CardHeader title="Please verify your email to continue ." />
      <CardContent>
        {
          state.success ? <>
            <h3>email send successfully to</h3>
            {email.current.value}
          </> : <Stack rowGap={2} component="form" onSubmit={handelSubmit} >
            <TextField label={"email"}
              required
              type="email"
              size='small'
              inputRef={email}
              error={state.err}
              helperText={state.err ? "Please enter the email that you  logged in with ." : ""}
              disabled={isFetching}
              onFocus={() => setState((s) => {
                email.current.value = ""
                return { ...s, err: false }
              })}
              variant='standard' />
            <Box
              display={'flex'}
              justifyContent={'center'}>
              <LoadingButton loading={isFetching} variant='contained'
                size="small"
                type='submit'>send Link</LoadingButton>
            </Box>
          </Stack>
        }
      </CardContent>
      {state.success ? <CardActions>
        <LoadingButton fullWidth onClick={() => window.location.href = 'http://localhost:5173/'}>Resend email</LoadingButton>

      </CardActions> : ""}
    </Card>
  </Box >

}