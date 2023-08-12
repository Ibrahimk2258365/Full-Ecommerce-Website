import React from 'react'
import Layout from '../components/Layout/Layout'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
  return (
    <Layout>
      <div className="not-found-container">
      <div className="not-found-content">
        <h1 className='pnf-h1'>Oops!</h1>
        <h2 className='pnf-h2'>404 Page Not Found</h2>
        <p className='pnf-p'>The page you are looking for does not exist.</p>
        <Link className="not-found-button" to={"/"}>Go Home</Link>
      </div>
    </div>
    </Layout>
  )
}

export default PageNotFound
