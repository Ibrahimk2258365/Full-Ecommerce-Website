import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Helmet } from "react-helmet";
import  { Toaster } from 'react-hot-toast';
const Layout = ({children,author,title,description,keywords}) => {
  return (
    <div>
      <Helmet>
        <meta charset="utf-8" />
        <meta name="author" content={author} />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main style={{ minHeight: "70vh" }}>
      <Toaster/>
        {children}
      </main>

      <Footer />
    </div>
  )
}
Layout.defaultProps={
  title:"Ecommerce App - Shop now",
  description:"mern stack project",
  keywords:"mern,react,node,mongodb",
  author:"Imran khan"
}
export default Layout
