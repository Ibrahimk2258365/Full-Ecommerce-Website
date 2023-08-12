
import React, { useEffect, useState } from 'react'
import Layout from './../components/Layout/Layout';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'antd';


const ProductDetail = () => {
    const params = useParams()
    const [product, setProduct] = useState({});
    const [category, setcategory] = useState({})
    const [releated, setreleated] = useState([])
    const navigate = useNavigate()
    const [pid, setpid] = useState("")
    const [cid, setcid] = useState("")
    useEffect(() => {
        if (params?.slug) {
            getProduct()

        }




    }, [params?.slug])
    const getProduct = async () => {
        try {

            const { data } = await axios.get(`/api/v1/product/get-product/${params.slug}`);
            setProduct(data?.product)
            setcategory(data?.product?.category)
            // setcid(data?.product.category._id)
            // setpid(product?._id)
            getsimilarProducts(data?.product?._id,data.product?.category._id)

        } catch (error) {
            console.log(error);
        }
    }



    const getsimilarProducts = async (pid,cid) => {
        try {
            const { data } = await axios.get(`/api/v1/product/releated-product/${pid}/${cid}`)
            setreleated(data?.products)

        } catch (error) {
            console.log(error);
        }
    }
    
    return (
        <Layout>
            <div className='container'>

                {/* {JSON.stringify(product)} */}
                <h2 className='text-center mt-5'>Product Details</h2>
                <div className='row mt-3'>
                    <div className='col-md-6 p-5'>
                        <img src={`/api/v1/product/product-photo/${product?._id}`} className="card-img-top " height={"300px"} alt={product?.name} />
                    </div>

                    <div className='col-md-6 p-5 '>


                        <h6>Name : {product?.name}</h6>
                        <h6>Price : ${product?.price}</h6>
                        <h6>Category : {category?.name}</h6>
                        <h6>Description : {product?.description}</h6>
                        <h6>Shipping : {product?.shipping === true ? "Yes" : "No"}</h6>
                        <Button className='btn btn-primary cartbtn'>Add to Cart</Button>
                    </div>
                </div>
                <div className='row'>
                   <h2 className='text-center'>Similar Products</h2>
                   {releated.length < 1 && ("No similar Product Found")}
                   <div className='d-flex flex-wrap'>
            { 
              releated?.map((Sproducts) => {
                return (

                  <div className="card m-2 cardhover" style={{ width: '18rem' }} key={Sproducts._id}>
                    <img src={`/api/v1/product/product-photo/${Sproducts._id}`} className="card-img-top " height={"250px"} width={"250px"} alt={Sproducts.name} />
                    <div className="card-body">
                      <h5 className="card-title">{Sproducts.name}</h5>
                      <h4 className="pricecolor">Price:{Sproducts.price}</h4>
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

            </div>
        </Layout>
    )
}

export default ProductDetail
