const express = require('express')
const router = express.Router()
const {
    addCart,
    getCart
} = require('../controllers/cartController')

const { protect } = require('../middleware/authMiddleware')

// router.route('/').get(getAllBooks).post(protect, addBook)

router.route('/').post(addCart).get(getCart)

module.exports = router
