const asyncHandler = require('express-async-handler')

const Book = require('../models/bookModel')
const User = require('../models/userModel')

// always update bookRoutes and Server.js

// @desc    Get One Book
// @route   GET /api/books/get-book-details/:isbn
// @access  Private

const getOneBook = asyncHandler(async (req, res) => {

  // @ts-ignore
  const isbn  = req.params.isbn
  //  { isbn : isbn } ==  { isbn }
  const getBook = await Book.find({ isbn })

  res.status(200).json(getBook)
})


// @desc    Get All Books
// @route   GET /api/books
// @access  Private

const getAllBooks = asyncHandler(async (req, res) => {
  // @ts-ignore
  const books = await Book.find()

  res.status(200).json(books)
})

// @desc    Add book
// @route   POST /api/books
// @access  Private

const addBook = asyncHandler(async (req, res) => {

  const { title, author, imgUrl, isbn } = req.body

  if (!title || !author || !imgUrl || !isbn) {
    res.status(400)
    throw new Error('Please add all fields')
  }

    // Check if book exists
    // const userExists = await User.findOne({ email })

    // if (userExists) {
    //   res.status(400)
    //   throw new Error('User already exists')
    // }

  // create book

  const newBook = await Book.create({
    title: req.body.title,
    author: req.body.author,
    isbn: req.body.isbn,
    year: req.body.year,
    description: req.body.description,
    imgUrl: req.body.imgUrl,
    price: req.body.price,
    // @ts-ignore
    user: req.user.id
  })

  if (newBook) {
    res.status(201).json({
      _id: newBook.id,
      title: newBook.title,
      author: newBook.author,
      isbn: newBook.isbn,
      year: newBook.year,
      description: newBook.description,
      imgUrl: newBook.imgUrl,
      price: newBook.price
    })
  } else {
    res.status(400)
    throw new Error('Invalid book data')
  }

  // res.status(200).json(newBook)
})

// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  Private
// under construction

const updateBook = asyncHandler(async (req, res) => {
  const goal = await Book.findById(req.params.id)

  if (!goal) {
    res.status(400)
    throw new Error('Goal not found')
  }

  // Check for user
  // @ts-ignore
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the goal user
  // @ts-ignore
  if (goal.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const updatedGoal = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.status(200).json(updatedGoal)
})

// @desc    Delete goal
// @route   DELETE /api/goals/:id
// @access  Private
// under construction

const deleteBook = asyncHandler(async (req, res) => {

  // params.id -> bookRoutes.js
  const goal = await Book.findById(req.params.id)

  if (!goal) {
    res.status(400)
    throw new Error('Goal not found')
  }

  // Check for user
  // @ts-ignore
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the goal user
  // @ts-ignore
  if (goal.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  await goal.remove()

  res.status(200).json({ id: req.params.id })
})

module.exports = {
  getAllBooks,
  getOneBook,
  addBook,
  updateBook,
  deleteBook,
}
