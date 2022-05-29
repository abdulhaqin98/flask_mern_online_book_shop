import { Grid, Typography } from '@mui/material';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import BookInfo from './BookInfo';
import Imgcontainer from './RecommendBooks/Imgcontainer';
import Recommend from './RecommendBooks/Recommend';

// use this as bookdetails
// make a single get request via isbn and display book details including author
// make a grid on bottom displaying 5 dummy books in flex
// Books.jsx (stack, grid, flex, gap, spacing) template copy in flex/horizontal for recommended books on bottom

const BookDetails = () => {

   const { BookDetails } = useSelector(
      // @ts-ignore
      // useSelecter -> store.js -> state.books == books
      (state) => state.books
   )

   //  // useSelector -> bookSlice.js // //

   return (
      <div>
         {/* <DummyContainer /> */}
         <Grid container spacing={6} style={{ maxWidth: 700, margin: "0 auto" }}>
            <Grid item sm={6}>
               <Imgcontainer {...BookDetails[0]} />
            </Grid>
            <Grid item sm={6}>
               <BookInfo {...BookDetails[0]} />
               {/* <BookInfo itemDetails={BookDetails[0]} /> */}
            </Grid>
         </Grid>
         <Typography variant="h5" ml={8} mt={4}>Recommended Books</Typography>
         {/* Do not click on books. It will crash. Need some work */}

         {/* useEffect loophole via getRecommendBooks dispatch */}
         <Recommend />
      </div>
   )
}

export default BookDetails