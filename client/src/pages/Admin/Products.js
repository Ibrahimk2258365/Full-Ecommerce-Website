import React, { useEffect, useState } from 'react'
import AdminMenu from '../../components/Layout/AdminMenu'

import Layout from './../../components/Layout/Layout';
import axios from 'axios';
import { useAuth } from '../../components/Context/Auth';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';

const Products = () => {
    const [auth] = useAuth();
    const [products, setproducts] = useState([]);
    // get all products
    const getAllProducts = async () => {
        try {
            const { data } = await axios.get("/api/v1/product/get-product", {}, {
                headers: {
                    "Authorization": auth?.token
                }
            });
            if (data.success) {
                setproducts(data.products)

            }
        } catch (error) {
            console.log(`error while getting products`);
            toast.error("some thing went wrong");
        }
    }
    useEffect(() => {
        getAllProducts()
    }, [])


    return (
        <Layout>
            <div className='container-fluid m-3 p-3'>
                <div className='row'>
                    <div className='col-md-3'>
                        <AdminMenu />
                    </div>

                    <div className='col-md-9'>
                        <h1 className='text-center'>
                            Product List
                        </h1>
                        <div className='d-flex flex-wrap'>
                            {
                                products.map((Sproducts) => {
                                    return (
                                        <Link to={`/dashboard/admin/update-product/${Sproducts.slug}`} className='product-link'>
                                            <div className="card m-3" style={{ width: '16rem' }} key={Sproducts._id}>
                                                <img src={`/api/v1/product/product-photo/${Sproducts._id}`} className="card-img-top " height={"250px"} width={"100px"} alt={Sproducts.name} />
                                                <div className="card-body">
                                                    <h5 className="card-title">{Sproducts.name}</h5>
                                                    <h5 className="card-title pricecolor">Price:{Sproducts.price}</h5>
                                                    {/* <p className="card-text">{Sproducts.description.substring(0,30) } ...more </p> */}

                                                </div> 
                                            </div>

                                        </Link>
                                    )
                                })
                            }
                        </div>
                     
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Products
