import React from 'react'
import Layout from '../../Components/Layouts/Layout.js'
import AdminMenu from '../../Components/Layouts/AdminMenu.js'
import { useAuth } from '../../Contexts/Authorization.js'
const Dashboard = () => {
  const [authorization] = useAuth();
  return (
    <Layout title={"Admin Dashboard"}>
     <div className='conatiner-fluid d-flex justify-content-around m-3 p-3'>
      <div className='col-3'>
       <AdminMenu/>
      </div>
      <div className='col-8'>
        <div className='card text-center p-3 cart'>
        <h1 className='home-heading'>{authorization?.user.name}  </h1>
        <p className='home-filter'>Email: {authorization?.user.email}</p>
        <p className='home-filter'>Mobile: {authorization?.user.mobile}</p>
        </div>
      </div>
     </div>
    </Layout>
  )
}

export default Dashboard
