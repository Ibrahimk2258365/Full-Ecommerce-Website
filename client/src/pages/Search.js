
import React from 'react'
import Layout from '../components/Layout/Layout'
import { useSearch } from '../components/Context/Search'
import { Link, useNavigate } from 'react-router-dom';

const Search = () => {
  const [value, setValue] = useSearch();
  const navigate = useNavigate()
  return (
    <Layout title={"Search Results"}>
      <div className='container'>
        <div className='text-center'>
          <h1>Search Results</h1>
          <h6>{value?.results.length < 1 ? "Product Not found" : `Product Found ${value?.results.length}`}</h6>
        </div>
        <div className='d-flex flex-wrap'>
            { 
              value?.results.map((Sproducts) => {
                return (

                  <div className="card m-2 cardhover" style={{ width: '18rem' }} key={Sproducts._id}>
                    <img src={`/api/v1/product/product-photo/${Sproducts._id}`} className="card-img-top " height={"250px"} width={"250px"} alt={Sproducts.name} />
                    <div className="card-body">
                      <h5 className="card-title">{Sproducts.name}</h5>
                      <h4 className="pricecolor">${Sproducts.price}</h4>
                      <p className="card-text">{Sproducts.description.substring(0,40)}... <Link to={"/api/v1/product/"+Sproducts._id}>more</Link></p>
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

export default Search
