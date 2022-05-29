const mongoose = require('mongoose')


// original
// const goalSchema = mongoose.Schema(

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a text value'],
    },
    author: {
      type: String,
      required: [true, 'Please add a author'],
    },
    imgUrl: {
      type: String,
      required: [true, 'Please add a image'],
    },
    isbn: {
      type: String,
      required: [true, 'Please add a isbn'],
    },
    year: {
      type: String,
      required: [true, 'Please add a year'],
    },
    description: {
      type: String,
      required: [true, 'Please add a descripion'],
    },
    price: {
      type: String,
      required: [true, 'Please add a price']
    }
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Book', bookSchema)
