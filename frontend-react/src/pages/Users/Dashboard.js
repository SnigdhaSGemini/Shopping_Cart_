import React from 'react'
import Layout from '../../Components/Layouts/Layout'
import UserMenu from '../../Components/Layouts/UserMenu'
import { useAuth } from '../../Contexts/Authorization'

// user dashboard
const Dashboard = () => {
    const [authorization] = useAuth();
  return (
    <Layout title={"Dashboard"}>
     <div className='column-fluid  d-flex justify-content-between h-100 m-0'>
        <div className='col-3 m-5 '>
            <UserMenu/>
        </div>
        <div className='col-8 d-flex justify-content-around all-category   p-5'>
           <div className='card p-3 w-50 bg-light d-flex justify-content-center align-items-center'>
           <h3 className='home-heading text-center  pb-5'>{authorization?.user.name}</h3>
            <p className='home-filter text-center'>Email: {authorization?.user.email}</p>
            <p className='home-filter text-center'>Mobile: {authorization?.user.mobile}</p>
            <p className='home-filter text-center'>Address: {authorization?.user.address}</p>
           </div>
        </div>
      </div>
    </Layout>
  )
}

export default Dashboard
