import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import bookService from './bookService'

const initialState = {
  recommendBooks: [],
  recommendBooksIsbn: [],
  BookDetails: [],
  booksData: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
}

// Create new book
export const addBook = createAsyncThunk(
  // store.js -> books
  'books/create',
  async (bookData, thunkAPI) => {
    try {
      // @ts-ignore
      const token = thunkAPI.getState().auth.user.token
      return await bookService.addBook(bookData, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Get one book by isbn
export const getOneBook = createAsyncThunk(
  'books/getOne',
  async (isbn, thunkAPI) => {
    try {
      // @ts-ignore
      // const token = thunkAPI.getState().auth.user.token
      return await bookService.getOneBook(isbn, "0")
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Get one book by name
export const getBookRecommendation = createAsyncThunk(
  'books/getRecommended',
  async (name, thunkAPI) => {
    try {
      // @ts-ignore
      const token = thunkAPI.getState().auth.user.token
      return await bookService.getBookRecommendation(name, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Get all books
export const getAllBooks = createAsyncThunk(
  'books/getAll',
  async (_, thunkAPI) => {
    try {
      // @ts-ignore
      // const token = thunkAPI.getState().auth.user.token
      return await bookService.getAllBooks("0")
      // return await bookService.getAllBooks(token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Delete user goal
export const deleteGoal = createAsyncThunk(
  'goals/delete',
  async (id, thunkAPI) => {
    try {
      // @ts-ignore
      const token = thunkAPI.getState().auth.user.token
      return await bookService.deleteGoal(id, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false
      state.isSuccess = false
      state.isError = false
      state.message = ''
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addBook.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addBook.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.booksData.push(action.payload)
      })
      .addCase(addBook.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        // @ts-ignore
        state.message = action.payload
      })
      .addCase(getAllBooks.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllBooks.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.booksData = action.payload
      })
      .addCase(getAllBooks.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        // @ts-ignore
        state.message = action.payload
      })
      .addCase(getOneBook.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getOneBook.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.BookDetails = action.payload
      })
      .addCase(getOneBook.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        // @ts-ignore
        state.message = action.payload
      })
      .addCase(getBookRecommendation.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getBookRecommendation.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.recommendBooks = JSON.parse(action.payload['recommend_books'])
        state.recommendBooksIsbn = JSON.parse(action.payload['recommend_books_isbn'])
      })
      .addCase(getBookRecommendation.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        // @ts-ignore
        state.message = action.payload
      })
      .addCase(deleteGoal.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteGoal.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.booksData = state.booksData.filter(
          (goal) => goal._id !== action.payload.id
        )
      })
      .addCase(deleteGoal.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        // @ts-ignore
        state.message = action.payload
      })
  },
})

export const { reset } = bookSlice.actions
export default bookSlice.reducer