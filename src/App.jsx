// src/App.jsx
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Swap from './screens/Swap/Swap'
import Orders from './screens/Orders/Orders'
// import BottomNav from './components/BottomNav/BottomNav'

export default function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Swap />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}
