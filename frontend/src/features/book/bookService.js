import axios from 'axios'

const API_URL = '/api/books/'
const RECOMMEND_BOOKS_URL = 'https://frozen-ravine-26184.herokuapp.com/api_book/recommend/'

// Add new book
const addBook = async (bookData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

    const response = await axios.post(API_URL, bookData, config);
    
    return response.data;
}

// Get one book (no-auth from server side)
const getOneBook = async (isbn, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  // const response = await axios.get(API_URL, config)
  const response = await axios.get(API_URL + 'get-book-details/' + isbn)

  const title = response.data[0].title;
  console.log('get one book');
  console.log(response.data[0]);

  return response.data
}

// Call Flask server and Get Book recommendations by Book Name

const getBookRecommendation = async (name, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  // const name_parameter = name.split(' ').join('%20');
  // const response = await axios.get(RECOMMEND_BOOKS_URL + 'Timeline')
  const response = await axios.get(RECOMMEND_BOOKS_URL + name)

  return response.data
}


// Get all books (no-auth from server side)
const getAllBooks = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  // const response = await axios.get(API_URL, config)
  const response = await axios.get(API_URL)

  console.log('bookService: ' + response.data);

  return response.data
}

// Delete user goal
// under construction
const deleteBook = async (bookId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(API_URL + bookId, config)

  return response.data
}

const bookService = {
  addBook,
  getAllBooks,
  getOneBook,
  deleteBook,
  getBookRecommendation
}

export default bookService
