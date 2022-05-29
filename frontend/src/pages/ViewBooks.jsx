import * as React from 'react';
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '../components/Spinner'
import { getAllBooks, reset } from '../features/book/bookSlice'
import Books from 'components/Book/Books';

// ViewBooks is public, so Delete function is not included.

function ViewBooks() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // @ts-ignore
  const { user } = useSelector((state) => state.auth)
  const { booksData, isLoading, isError, message } = useSelector(
    // @ts-ignore
    // useSelecter -> store.js -> state.books == books
    (state) => state.books
  )

  // useSelector -> bookSlice.js

  useEffect(() => {
    // if (isError) {
    //   console.log(message)
    // }

    // get all books -> do not navigate to login
    // if (!user) {
    //   navigate('/login')
    // }

    dispatch(getAllBooks())

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  if (isLoading) {
    return <Spinner />
  }

  // ViewBooks -> Books -> BookCard

  return (
    <Books booksData={booksData} />
  )
}

export default ViewBooks
