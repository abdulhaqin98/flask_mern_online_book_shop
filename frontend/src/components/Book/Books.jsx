import React from 'react'
import { useDispatch } from 'react-redux'
import { Box, Grid, Stack } from '@mui/material'
import BookCard from './BookCard'
// import { deleteGoal } from '../../features/goals/goalSlice'

const Books = ( { booksData } ) => {

  return (
    <Box sx={{ width: '100%'}}>
    <Stack direction="row" justifyContent="center" spacing={2} mt={2} sx={{flexWrap: "wrap", gap:2}}>
      {booksData.length > 0 ? (
          <>
            {booksData.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </>
        ) : (
          <h3>Book catalogue is empty</h3>
        )}
    </Stack>
  </Box>
 )
}

export default Books