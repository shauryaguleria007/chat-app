import React, { useEffect } from 'react'
import { useAuthenticateUserQuery } from '../services/authApi'
import { useNavigate } from 'react-router-dom'

export const Authorizer = ({ children }) => {
  const navigate = useNavigate()
  const { data, isLoading, isError, error } = useAuthenticateUserQuery()
  useEffect(() => {
    setTimeout(() => {}, 2000)
    if (isError) {
      return navigate('/login')
    }
    if (data) {
      return children
    }
  }, [data, isError])

  return <h1>Loading....</h1>
}
