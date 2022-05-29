import * as React from 'react';
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from 'components/Spinner';

import { Typography, Container, Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box } from '@mui/material';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const theme = createTheme();

  // @ts-ignore
  const { user } = useSelector((state) => state.auth)
  const { goals, isLoading, isError, message } = useSelector(
    // @ts-ignore
    (state) => state.goals
  )

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (!user) {
      navigate('/login')
    }

  }, [user, navigate, isError, message, dispatch])

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
             <AccountCircleOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h4">
            Welcome {user && user.name}
          </Typography>
          <Typography component="h1" variant="h6">
            {user && user.email}
          </Typography>


       </Box>
    </Container>
 </ThemeProvider>

    // <>
    //   <section className='heading'>
    //     <h1>Welcome {user && user.name}</h1>
    //     <h1>{user.email}</h1>
    //     <p>BookMart Dashboard</p>
    //   </section>
    // </>
  )
}

export default Dashboard
