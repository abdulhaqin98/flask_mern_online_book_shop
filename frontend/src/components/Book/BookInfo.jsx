import { Button, Divider, Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect } from 'react'

import { useDispatch, useSelector } from "react-redux";
import { addToCart, createCart } from 'features/cart/cartSlice';

const BookInfo = ({ title, author, isbn, price, description, imgUrl }) => {

  const itemDetails = { title, author, isbn, price, description, imgUrl }

  const dispatch = useDispatch();
  const { cartItems } = useSelector(
    // @ts-ignore
    // useSelecter -> store.js -> state.books == books
    (state) => state.cart
  )
  // @ts-ignore
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    const arrData = { "email": user.email, "data": JSON.stringify(cartItems) }
    // @ts-ignore
    dispatch(createCart(arrData));
  }, [cartItems])

  const handleAddToCart = (itemDetails) => {

    dispatch(addToCart(itemDetails));

    // const arrData = { "email": user.email, "data": JSON.stringify(cartItems) }
    // // @ts-ignore
    // dispatch(createCart(arrData));

  };

  return (
    <Grid container direction="column" style={{ height: "100%" }}>
      <Typography></Typography>
      <Divider />
      <Box>
        <Typography variant="h4">{title}</Typography>
        <Typography variant="h5" mt={2}>{author}</Typography>
        <Typography variant="h5" mt={2}>{isbn}</Typography>
        <Typography variant="h5" mt={2}>₹<>&nbsp;&nbsp;</>{price}</Typography>
        <Typography variant="subtitle1" mt={2}>{description}</Typography>
      </Box>
      {/* <Button variant="contained" color="primary" style={{ marginTop: "auto" }} > */}
      <Button variant="contained" color="primary" style={{ marginTop: "auto" }} onClick={() => handleAddToCart(itemDetails)}>
        Purchase
      </Button>

    </Grid>
  )
}

export default BookInfo