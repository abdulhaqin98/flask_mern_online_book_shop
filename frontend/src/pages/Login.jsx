import * as React from 'react';
import { Typography, Container, Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Spinner from 'components/Spinner';

import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login, reset } from '../features/auth/authSlice'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'

function Copyright(props) {

   return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
         {'Copyright © '}
         <Link color="inherit" href="https://google.com/">
            BookMart
         </Link>{' '}
         {new Date().getFullYear()}
         {'.'}
      </Typography>
   );
}

const theme = createTheme();

export default function Login() {

   const [formData, setFormData] = useState({
      email: '',
      password: '',
   })

   const { email, password } = formData

   const navigate = useNavigate()
   const dispatch = useDispatch()

   const { user, isLoading, isError, isSuccess, message } = useSelector(
      // @ts-ignore
      (state) => state.auth
   )

   useEffect(() => {
      if (isError) {
         toast.error(message)
      }

      if (isSuccess || user) {
         navigate('/')
      }

      dispatch(reset())
   }, [user, isError, isSuccess, message, navigate, dispatch])

   const onChange = (e) => {
      setFormData((prevState) => ({
         ...prevState,
         [e.target.name]: e.target.value,
      }))
   }

   const onSubmit = (e) => {
      e.preventDefault()

      const userData = {
         email,
         password,
      }

      // @ts-ignore
      dispatch(login(userData))
   }

   if (isLoading) {
      return <Spinner />
   }

   //

   return (
      <ThemeProvider theme={theme}>
         <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
               sx={{
                  marginTop: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
               }}
            >
               <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                  <LockOutlinedIcon />
               </Avatar>
               <Typography component="h1" variant="h5">
                  Sign in
               </Typography>

               <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
                  <TextField
                     margin="normal"
                     required
                     fullWidth
                     id="email"
                     label="Email Address"
                     name="email"
                     autoComplete="email"
                     autoFocus
                     value={email}
                     onChange={onChange}
                  />
                  <TextField
                     margin="normal"
                     required
                     fullWidth
                     name="password"
                     label="Password"
                     type="password"
                     id="password"
                     autoComplete="current-password"
                     value={password}
                     onChange={onChange}
                  />
                  <Button
                     type="submit"
                     fullWidth
                     variant="contained"
                     sx={{ mt: 3, mb: 2 }}
                  >
                     Sign In
                  </Button>
               </Box>

            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
         </Container>
      </ThemeProvider>
   );
}