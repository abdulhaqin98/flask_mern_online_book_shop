import axios from 'axios'

const API_URL = '/api/cart/'

// Add new cart
const createCart = async (Data, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }

    console.log("cart data to db");
    console.log(Data);

    const response = await axios.post(API_URL, Data, config);

    return response.data;
}

const cartService = {
    createCart
}

export default cartService