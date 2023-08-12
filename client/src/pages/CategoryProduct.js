import React, { useState } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'

const CategoryProduct = () => {
    const [products, setproducts] = useState([])
    const [category, setcategory] = useState([])
    const navigate = useNavigate()
    const params = useParams()
    const getProductByCat = async ()=>{
        try {
            const {data} =await axios.get(`/api/v1/product/product-category/${params.slug}`)
            setproducts(data?.product);
            setcategory(data?.category)
            console.log(data?.category);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
      if (params?.slug) {
        getProductByCat()
      }
    }, [params?.slug])
    
  return (
    <Layout>
     <div className='container mt-3'>
        
        <h4 className='text-center'>{category[0]?.name}</h4>
        <h6 className='text-center'>{products.length} Products Found</h6>
        <div className='d-flex flex-wrap'>
            { 
              products?.map((Sproducts) => {
                return (

                  <div className="card m-2 cardhover" style={{ width: '18rem' }} key={Sproducts._id}>
                    <img src={`/api/v1/product/product-photo/${Sproducts._id}`} className="card-img-top " height={"250px"} width={"250px"} alt={Sproducts.name} />
                    <div className="card-body">
                      <h5 className="card-title">{Sproducts.name}</h5>
                      <h4 className="pricecolor">Price:{Sproducts.price}</h4>
                      {/* <p className="card-text">{Sproducts.description.substring(0,40)}... <Link to={"/api/v1/product/"+Sproducts._id}>more</Link></p> */}
                      <div className='d-flex'>
                        <button class="btn btn-primary me-2" onClick={()=>{
                          navigate(`/product/${Sproducts.slug}`)
                        }}>More Details</button>
                        <button class="btn btn-secondary">Add To Cart</button>
                      </div>
                    </div>
                  </div>


                )
              })
            }
          </div>
        
     </div>
    </Layout>
  )
}

export default CategoryProduct
