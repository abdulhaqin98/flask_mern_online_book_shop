import * as React from 'react';
import { Typography, Container, Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Spinner from 'components/Spinner';

import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { register, reset } from '../features/auth/authSlice'
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

export default function Register() {

   const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
      password2: '',
    })
  
    const { name, email, password, password2 } = formData
  
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
  
      if (password !== password2) {
        toast.error('Passwords do not match')
      } else {
        const userData = {
          name,
          email,
          password,
        }
  
        // @ts-ignore
        dispatch(register(userData))
      }
    }
  
    if (isLoading) {
      return <Spinner />
    }

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
                  Sign up
               </Typography>
               <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                     <Grid item xs={12}>
                        <TextField
                           autoComplete="given-name"
                           name="name"
                           required
                           fullWidth
                           autoFocus
                           id="name"
                           label="Enter your name"
                           value={name}
                           onChange={onChange}
                        />
                     </Grid>
                     <Grid item xs={12}>
                        <TextField
                           required
                           fullWidth
                           autoComplete="email"
                           label="Email Address"
                           id="email"
                           name="email"
                           value={email}
                           onChange={onChange}
                        />
                     </Grid>
                     <Grid item xs={12}>
                        <TextField
                           required
                           fullWidth
                           label="Password"
                           type="password"
                           autoComplete="new-password"
                           id="password"
                           name="password"
                           value={password}
                           onChange={onChange}
                        />
                     </Grid>
                     <Grid item xs={12}>
                        <TextField
                           required
                           fullWidth
                           label="Confirm Password"
                           type="password"
                           autoComplete="new-password"
                           id="password2"
                           name='password2'
                           value={password2}
                           onChange={onChange}
                        />
                     </Grid>
                  </Grid>
                  <Button
                     type="submit"
                     fullWidth
                     variant="contained"
                     sx={{ mt: 3, mb: 2 }}
                  >
                     Sign Up
                  </Button>
               </Box>
            </Box>
            <Copyright sx={{ mt: 5 }} />
         </Container>
      </ThemeProvider>
   );
}