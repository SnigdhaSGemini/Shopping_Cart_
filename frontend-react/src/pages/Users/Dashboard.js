import React from 'react'
import Layout from '../../Components/Layouts/Layout'
import UserMenu from '../../Components/Layouts/UserMenu'
import { useAuth } from '../../Contexts/Authorization'

// user dashboard
const Dashboard = () => {
    const [authorization] = useAuth();
  return (
    <Layout title={"Dashboard"}>
     <div className='column-fluid m-3 p-3 d-flex'>
        <div className='col-3'>
            <UserMenu/>
        </div>
        <div className='col-9'>
           <div className='card p-3 m-3 cart'>
            <h3 className='home-heading text-center'>{authorization?.user.name}</h3>
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
