import React from 'react'
import Layout from '../../Components/Layouts/Layout.js'
import AdminMenu from '../../Components/Layouts/AdminMenu.js'
import { useAuth } from '../../Contexts/Authorization.js'
const Dashboard = () => {
  const [authorization] = useAuth();
  return (
    <Layout title={"Admin Dashboard"}>
     <div className='conatiner-fluid  d-flex justify-content-between h-100 m-0'>
      <div className='col-3 m-5'>
       <AdminMenu/>
      </div>
      <div className='col-8 d-flex justify-content-around all-category p-5'>
        <div className='card p-3 w-50 bg-light d-flex justify-content-center align-items-center m-5'>
        <h1 className='home-heading mb-5'>{authorization?.user.name}  </h1>
        <p className='home-filter'>Email: {authorization?.user.email}</p>
        <p className='home-filter'>Mobile: {authorization?.user.mobile}</p>
        </div>
      </div>
     </div>
    </Layout>
  )
}

export default Dashboard
