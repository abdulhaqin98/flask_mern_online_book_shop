import { Grid } from '@mui/material'
import React from 'react'

const ImageGrid = ({images}) => {
  return (
    <div>
      <Grid container direction="column">
        {
          images.map(image => (
            <img src={image} height={80} style={{ border: "solid 1px #eee", cursor: "pointer"}} />
          ))
        }
      </Grid>
    </div>
  )
}

export default ImageGrid