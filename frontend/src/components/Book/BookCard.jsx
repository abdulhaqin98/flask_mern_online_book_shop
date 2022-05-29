import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { Link } from 'react-router-dom';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';

import { useDispatch, useSelector } from 'react-redux';
import { getBookRecommendation, getOneBook, reset } from 'features/book/bookSlice';

export default function BookCard({ book }) {

   const dispatch = useDispatch();

   // onclick function
   function alertCall(e) {

      // isbn == id
      // @ts-ignore
      dispatch(getOneBook(e.target.id))
      // @ts-ignore
      dispatch(getBookRecommendation(book.title.split(" ").join("%20")));
      
   }

   return (
      <Card sx={{ width: 250 }}>
         {/* <CardActionArea onClick={alertCall}> */}
         <CardActionArea onClick={alertCall} component={Link} to={'book-details/'+book.isbn} >
            <CardMedia
               component="img"
               height="140"
               image={book.imgUrl}
               alt={book.isbn}
               id={book.isbn}
            />
            <CardContent id={book.isbn}>
               <Typography id={book.isbn} gutterBottom variant="h5" component="div" >
                  {book.title}
               </Typography>
               <Typography id={book.isbn} gutterBottom pb={2} variant="body2" color="text.secondary">
                  {book.author}
               </Typography>
               <Typography id={book.isbn} gutterBottom variant="h5" component="div">
                  ₹{book.price}
               </Typography>
            </CardContent>
         </CardActionArea>
      </Card>
   );
}
