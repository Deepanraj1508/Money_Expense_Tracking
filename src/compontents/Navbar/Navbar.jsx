import React from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'

const Navbar = () => {
  return (
    <div className='navbar'>
        <img className='nav-logo' src={logo} alt="" />
        <h1 className='nav-title'>Money Expense Tracking </h1>
    </div>
  )
}

export default Navbar