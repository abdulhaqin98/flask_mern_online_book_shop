import { Box, Stack, Typography } from '@mui/material'
import { reset } from 'features/book/bookSlice';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import Books from '../Books';

const Recommend = () => {

   // useEffect gets called after child component renders.
   // Hence it shows old filterData. When it's re-rendered, it updates to new filterData

   const dispatch = useDispatch();

   const { recommendBooksIsbn, booksData, BookDetails } = useSelector(
      // @ts-ignore
      // useSelecter -> store.js -> state.books == books
      (state) => state.books
   )

   // const [filterData, setFilterData] = useState([]);
   const [filterData, setFilterData] = useState(null);

   useEffect(() => {
      // console.log(booksData[1].isbn);

      var result = [];
      for (var i = 0; i < booksData.length; i++) {
         for(var j =  0; j<recommendBooksIsbn.length; j++) {
            if (booksData[i].isbn === recommendBooksIsbn[j] && booksData[i].isbn != BookDetails[0].isbn) {
               result.push(booksData[i]);
            }
         }
      }

      // if (booksData[i].isbn === recommendBooksIsbn[j] && booksData[i].isbn != isbn)

      setFilterData(result);

      // console.log(result);
      // console.log(filterData);

      // console.log(recommendBooksIsbn);
   }, [])


   return (
      // <Books booksData={filterData} />
      <>
         {filterData && <Books booksData={filterData} />}
      </>
      )
}

export default Recommend