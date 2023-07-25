import React from 'react'
import { NavLink } from 'react-router-dom'

// User Panel
const UserMenu = () => {
  return (
    <>
    <div className='text-center'>
    <h4 className='admin-heading'>User Details</h4>
        <div className="list-group">
     <NavLink to="/dashboard/user/account" className="list-group-item list-group-item-action"> Account Details</NavLink>
     <NavLink to="/dashboard/user/orders" className="list-group-item list-group-item-action">My Orders</NavLink>
   </div>
   
    </div>
       </>
  )
}

export default UserMenu
