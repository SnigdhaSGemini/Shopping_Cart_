import React from 'react'
import Layout from '../Components/Layouts/Layout'
import { Link } from 'react-router-dom'

// page not found error page
const PageNotFound = () => {
  return (
    <Layout title={"Page Not Found"}>
      <div className='errorPage'>
        <h2>404 error : Page not found </h2>
        <Link to="/" className="error-button"> Go to Home</Link>
      </div>
    </Layout>
  )
}

export default PageNotFound
