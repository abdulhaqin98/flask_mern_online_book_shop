const mongoose = require('mongoose')


// original
// const goalSchema = mongoose.Schema(

const goalSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    text: {
      type: String,
      required: [true, 'Please add a text value'],
    },
    author: {
      type: String,
      required: [true, 'Please add a author'],
    }
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Goal', goalSchema)
