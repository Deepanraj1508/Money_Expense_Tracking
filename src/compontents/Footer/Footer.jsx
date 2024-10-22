import React from 'react'
import './Footer.css'
import logo from '../../assets/logo.png'

const Footer = () => {
  return (
    <div className='footer-main'>
        <div className='footer-logo-main'>
          <img className='footer-logo' src={logo} alt="" />
          <h1 className='footer-title'>Money Expense Tracking </h1> 
        </div>
        <div className='copyrights'>
        <h1 className='footer-copyrights'>Developed By. Deepanraj K </h1> 
        </div>
    </div>
  )
}

export default Footer