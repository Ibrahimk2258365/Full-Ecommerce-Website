
import React from 'react'
import Layout from '../components/Layout/Layout'
import useCategory from '../Hooks/useCategory'
import { Link } from 'react-router-dom';

const Categories = () => {
    const category = useCategory();
  return (
    <Layout title='All Categories'>
      <div className='row'>
        <div className='col-md-6'>
           {category?.map((c)=>{return(
             <button className='btnCategroy'><Link to={`/category/${c.slug}`} className='sbncatlink'>{c.name}</Link></button>
           )})}
        </div>
        <div className='col-md-6'></div>
      </div>
    </Layout>
  )
}

export default Categories
