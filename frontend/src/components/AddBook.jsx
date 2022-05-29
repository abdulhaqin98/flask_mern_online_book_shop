import * as React from 'react';
import { Typography, Container, Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Spinner from 'components/Spinner';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';

import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addBook, reset } from '../features/book/bookSlice'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'

import FileInput from "../components/FileInput";

const theme = createTheme();

// *** whenever a new field is added ***
// *** update line [22, 38, 93, 104] ***

export default function AddBook() {

   const [formData, setFormData] = useState({
      title: '',
      author: '',
      isbn: '',
      year: '',
      description: '',
      price: '',
      imgUrl: ''
   })

   const [buttonDisable, setbuttonDisable] = useState(true);
   // file upload
   // const [data, setData] = useState({
   // 	name: "",
   // 	artist: "",
   // 	song: "",
   // 	img: "",
   // });

   const { title, author, isbn, year, description, price, imgUrl } = formData;

   const navigate = useNavigate()
   const dispatch = useDispatch()

   const { bData, isLoading, isError, isSuccess, message } = useSelector(
      // @ts-ignore
      // books -> from store.js
      (state) => state.books
   )

   useEffect(() => {
      if (isError) {
         toast.error(message)
         // console.log(message);
      }

      // if (isSuccess || user) {
      //   navigate('/')
      // }

      dispatch(reset())
   }, [bData, isError, isSuccess, message, navigate, dispatch])

   // image upload start

   const handleChange = ({ currentTarget: input }) => {
      setFormData({ ...formData, [input.name]: input.value });
   };

   const handleInputState = (name, value) => {
      // name => img, value => img : 'value'
      setFormData((prev) => ({ ...prev, [name]: value }));

      //enable ADD button
      if (value.toString().includes('firebase')) {
         setbuttonDisable(false);
      }
   };

   // image upload end

   const onChange = (e) => {
      setFormData((prevState) => ({
         ...prevState,
         [e.target.name]: e.target.value,
      }))
   }

   const onSubmit = (e) => {
      e.preventDefault();

      // if (!title) {
      //    toast.error('Empty Field')
      // } else {
      const bookData = {
         title,
         author,
         isbn,
         year,
         description,
         price,
         imgUrl
      }

      // @ts-ignore
      dispatch(addBook(bookData));

      setFormData((prevState) => ({
         ...prevState, title: '', author: '', isbn: '', year: '', description: '', price: '', imgUrl: ''
      }));
      // }
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
                  <MenuBookOutlinedIcon />
               </Avatar>
               <Typography component="h1" variant="h5">
                  Add Book
               </Typography>
               <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                     <Grid item xs={12}>
                        <TextField
                           autoComplete="given-name"
                           required
                           fullWidth
                           autoFocus
                           name="isbn"
                           id="isbn"
                           label="ISBN"
                           value={isbn}
                           onChange={onChange}
                        />
                     </Grid>
                     <Grid item xs={12}>
                        <TextField
                           autoComplete="given-name"
                           required
                           fullWidth
                           name="title"
                           id="title"
                           label="Title"
                           value={title}
                           onChange={onChange}
                        />
                     </Grid>
                     <Grid item xs={12}>
                        <TextField
                           autoComplete="given-name"
                           required
                           fullWidth
                           name="author"
                           id="author"
                           label="Author"
                           value={author}
                           onChange={onChange}
                        />
                     </Grid>
                     <Grid item xs={12}>
                        <TextField
                           autoComplete="given-name"
                           required
                           fullWidth
                           name="year"
                           id="year"
                           label="Year"
                           value={year}
                           onChange={onChange}
                        />
                     </Grid>
                     <Grid item xs={12}>
                        <TextField
                           autoComplete="given-name"
                           required
                           fullWidth
                           name="description"
                           id="description"
                           label="Description"
                           value={description}
                           onChange={onChange}
                        />
                     </Grid>
                     <Grid item xs={12}>
                        <FileInput
                           name="imgUrl"
                           label="Choose Image"
                           handleInputState={handleInputState}
                           type="image"
                           value={imgUrl} />
                     </Grid>
                     <Grid item xs={12}>
                        <TextField
                           autoComplete="given-name"
                           required
                           fullWidth
                           name="price"
                           id="price"
                           label="Price"
                           value={price}
                           onChange={onChange}
                        />
                     </Grid>
                  </Grid>
                  <Button
                     type="submit"
                     fullWidth
                     variant="contained"
                     sx={{ mt: 3, mb: 2 }}
                     disabled={buttonDisable}
                  >
                     <AddBoxOutlinedIcon /><>&nbsp;&nbsp;</>
                     ADD
                  </Button>
               </Box>
            </Box>
         </Container>
      </ThemeProvider>
   );
}