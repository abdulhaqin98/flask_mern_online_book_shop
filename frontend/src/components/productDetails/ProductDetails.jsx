import { Box, Container, Grid, Stack, Typography } from '@mui/material';
import BookCard from 'components/Book/BookCard';
import React, { useState } from 'react'
// import ImageGrid from './ImageGrid';
import Info from './Info';
import MainImage from './MainImage';


// use this as bookdetails
// make a single get request via isbn and display book details including author
// make a grid on bottom displaying 5 dummy books in flex
// Books.jsx (stack, grid, flex, gap, spacing) template copy in flex/horizontal for recommended books on bottom

const ProductDetails = () => {

   const [selectedImage, setSelectedImage] = useState(0);

   const images = [
      "https://firebasestorage.googleapis.com/v0/b/online-book-shop-react.appspot.com/o/images%2F1652125350598book1.jpeg?alt=media&token=81c47292-0210-4d52-9406-fea4901c3003",
      "https://firebasestorage.googleapis.com/v0/b/online-book-shop-react.appspot.com/o/images%2F1652125350598book1.jpeg?alt=media&token=81c47292-0210-4d52-9406-fea4901c3003"
   ];

   const product = {
      title: "the book name",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod maiores nemo id minima, nam molestiae ex quaerat quibusdam doloribus totam.",
      price: 300,
      category: "a cat"
   }

   const book = {
      _id: '100kjsnfkjewb',
      isbn: '1001000100',
      title: "the book name",
      price: 300,
      author: 'the author',
      imgUrl: 'https://firebasestorage.googleapis.com/v0/b/online-book-shop-react.appspot.com/o/images%2F1652125350598book1.jpeg?alt=media&token=81c47292-0210-4d52-9406-fea4901c3003'
   }

   return (
      <div>
         <Grid container spacing={6} style={{ maxWidth: 700, margin: "0 auto" }}>
            {/* <Grid item sm={1}>
               <ImageGrid images={images} />
            </Grid> */}
            <Grid item sm={6}>
               <MainImage src={images[selectedImage]} />
            </Grid>
            <Grid item sm={6}>
               <Info {...product} />
            </Grid>
         </Grid>
         <Typography variant="h5" ml={8} mt={4}>Recommended Books</Typography>
         <Box sx={{ width: '100%' }}>

            <Stack direction="row" justifyContent="center" spacing={2} mt={4} sx={{ flexWrap: "wrap", gap: 2 }}>

               <BookCard key={book._id} book={book} />
               <BookCard key={book._id} book={book} />
               <BookCard key={book._id} book={book} />
               <BookCard key={book._id} book={book} />
               <BookCard key={book._id} book={book} />

            </Stack>
         </Box>
      </div>
   )
}

export default ProductDetails