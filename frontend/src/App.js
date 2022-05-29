import "./App.css";

import AddBook from 'components/AddBook';
import AddBookSuccess from 'components/AddBookSuccess';
import Navbar from 'components/Navbar';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import ViewBooks from 'pages/ViewBooks';
import BookDetails from 'components/Book/BookDetails';
import ProductDetails from 'components/productDetails/ProductDetails';

import Cart from 'pages/Cart'

function App() {
  return (
    <>
      <Router>
        <div className='container'>
          <Navbar />
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            {/* <Route path='/logindes' element={<Register />} /> */}

            <Route path='/add-book' element={<AddBook />} />
            <Route path='/add-book-success' element={<AddBookSuccess />} />
            
            <Route path='/view-books' element={<ViewBooks />} />

            <Route path='/view-books/book-details/:isbn' element={<BookDetails />} />

            <Route path='/product-design' element={<ProductDetails />} />

            {/* Cart */}
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
