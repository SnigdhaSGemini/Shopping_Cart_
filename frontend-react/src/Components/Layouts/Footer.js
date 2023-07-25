import React from 'react'
import { Link } from 'react-router-dom' 
import {MdPolicy, MdConnectWithoutContact, MdSupervisedUserCircle} from 'react-icons/md'

// Footer Component
const Footer = () => {
  return (
    <div className='bg-dark text-light p-3 footer'>
      <p className='text-center'> &copy; {new Date().getFullYear()}; Copyrighted Content</p>
      <p className='text-center mt-3 footer-links'>
        <Link className='footer-link' to="/about"><h1><MdSupervisedUserCircle/></h1>About</Link>
        <Link className='footer-link' to="/contact-us"> <h1><MdConnectWithoutContact/></h1>Contact Us</Link>
        <Link className='footer-link' to="/privacy-policy"><h1><MdPolicy/></h1> Privacy Policy</Link>
      </p>
    </div>
  )
}

export default Footer
