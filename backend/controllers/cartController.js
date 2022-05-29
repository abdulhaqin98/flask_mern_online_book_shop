const asyncHandler = require('express-async-handler')

const Cart = require('../models/cartModel')

// @desc    Get User Cart Data
// @route   GET /api/cart
// @access  Private

const getCart = asyncHandler(async (req, res) => {

    // @ts-ignore
    const { email } = req.body
    //  { email : email } ==  { email }
    const getCart = await Cart.find({ email })

    res.status(200).json(getCart)
})

// @desc    Add/Update cart data
// @route   POST /api/cart
// @access  Private

const addCart = asyncHandler(async (req, res) => {

    const { data, email } = req.body

    const getCart = await Cart.find({ email })

    if (!data || !email) {
        res.status(400)
        throw new Error('Please add all fields')
    }

    if (getCart.length < 1) {
        const newCart = await Cart.create({
            email: req.body.email,
            data: req.body.data
        })

        if (newCart) {
            res.status(201).json({
                _id: newCart.id,
                email: newCart.email,
                data: newCart.data
            })
        } else {
            res.status(400)
            throw new Error('Invalid cart data')
        }
    }
    else {
        // res.status(400)
        // throw new Error('cart already created')

        // @ts-ignore
        const updatedCart = await Cart.findByIdAndUpdate(getCart[0]._id, req.body, {
            new: true,
        })

        res.status(200).json(updatedCart)
    }

})

module.exports = {
    addCart,
    getCart
}