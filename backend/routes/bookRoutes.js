const express = require('express')
const router = express.Router()
const {
  getAllBooks,
  getOneBook,
  addBook,
  updateBook,
  deleteBook,
} = require('../controllers/bookController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(getAllBooks).post(protect, addBook)
router.route('/:id').delete(protect, deleteBook).put(protect, updateBook)

router.route('/get-book-details/:isbn').get(getOneBook)

module.exports = router
