import React from 'react'
import Header from './Header'
import Footer from './Footer'
import {Helmet} from 'react-helmet'
import { Toaster } from 'react-hot-toast';

// Layout Component -  To set the project layout , like - Header -> Body -> Footer
const Layout = ({children,title}) => {
  return (
    <div>
         <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
      </Helmet>
      <Header/>
      <main>
        <Toaster/>
        {children}</main>
      <Footer/>
    </div>
  )
}

Layout.defaultProps = {
    title: "Shopping Cart Website"
}

export default Layout
