import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Admin from './pages/Admin';
import Employee from './pages/Employee';
import Customer from './pages/Customer';
export default function App(){
  return (
    <BrowserRouter>
      <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{duration:0.6}}>
        <header className="site-header">
          <div className="logo-wrap">
            <img src="/logo192.png" alt="aSK mart" className="logo" />
            <h1 className="brand">aSK mart</h1>
          </div>
          <nav>
            <Link to="/">Shop</Link>
            <Link to="/admin">Admin</Link>
            <Link to="/employee">Employee</Link>
          </nav>
        </header>
        <Routes>
          <Route path="/" element={<Customer/>} />
          <Route path="/admin" element={<Admin/>} />
          <Route path="/employee" element={<Employee/>} />
        </Routes>
      </motion.div>
    </BrowserRouter>
  )
}
