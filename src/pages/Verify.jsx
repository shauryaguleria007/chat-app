import { useParams } from "react-router-dom"
import { useVerifyMailQuery } from "../services/authApi"
import { Loading } from "../components/Loading"
import { Card, CardContent, CardHeader, Box, TextField, Stack } from "@mui/material"
import LoadingButton from '@mui/lab/LoadingButton'
import { useDispatch } from "react-redux"
import { setUser } from "../features/userSlice"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { useComponentContext } from "../contexrt/ComponentContect"
export const Verify = () => {
    const { Warning } = useComponentContext()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams()
    const { data, isFetching, error } = useVerifyMailQuery(id)
    useEffect(() => {
        if (data) setTimeout(() => {
            dispatch(setUser(data))
            window.location.href = `${process.env.VITE_CLIENT}`;
            return
        }, 2000)
    }, [data])

    useEffect(() => {
        if (error?.data?.type === "emailVerification") {
            Warning("your session has expired ,please resend mail", 5000)
            return navigate("/")
        }
    }, [error])

    if (isFetching) return <Loading />


    if (data) return <Box height="100vh"
        // backgroundColor={red['A100']}
        display={"flex"} alignItems="center" justifyContent={"center"}
    >
        <Card>
            <CardHeader title="Redirecting to home  ." />
            <CardContent>
                <LoadingButton loading fullWidth size="large" />
            </CardContent>
        </Card>
    </Box>
}