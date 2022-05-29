const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema(
  {
    data: {
      type: String,
      required: [true, 'no cart data'],
    },
    email: {
      type: String,
      required: [true, 'no email'],
      unique: true,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Cart', cartSchema)
