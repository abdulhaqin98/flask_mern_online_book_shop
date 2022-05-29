import { Button, Divider, Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

const Info = ({title, description, price, category}) => {
  return (
    <Grid container direction="column" style={{ height: "100%"}}>
      <Typography></Typography>
      <Divider />
      <Box>
        <Typography variant="h4">{title}</Typography>
        <Typography variant="subtitle1">{description}</Typography>
        <Typography variant="h5">{price}</Typography>
      </Box>
      <Button variant="contained" color="primary" style={{marginTop: "auto"}}>
        Purchase
      </Button>

    </Grid>
  )
}

export default Info