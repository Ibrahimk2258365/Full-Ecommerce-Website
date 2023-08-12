import React, { useEffect, useState } from 'react'
import Layout from './../../components/Layout/Layout';
import AdminMenu from './../../components/Layout/AdminMenu';
import { Select } from 'antd';
import { Option } from 'antd/es/mentions';
import axios from 'axios';
import { toast } from 'react-hot-toast';

import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../components/Context/Auth';

const UpdateProduct = () => {
  const [name, setname] = useState("")
  const [description, setdescription] = useState("")
  const [price, setprice] = useState();
  const [quantity, setquantity] = useState()
  const [photo, setphoto] = useState("")
  const [shipping, setshipping] = useState("")
  const [categories, setcategories] = useState([])
  const [category, setcategory] = useState("")
  const  {slug} = useParams()
  const [id, setid] = useState("")
  const navigate = useNavigate()
  const [auth] = useAuth()
    //get all category
    const getallcategory = async () => {
      try {
        const res = await axios.get("/api/v1/category/get-category");
  
        if (res?.data?.success) {
          setcategories(res?.data?.category);
        
        }
      } catch (error) {
        console.log(`error while getting all category`);
        toast.error("Something went wrong while getting category");
      }
    };
    //get single category
    const getsinglecategory = async ()=>{
      try {
       
        
        const res = await axios.get(`/api/v1/product/get-product/${slug}`);
        
        if (res.data.success) {
          setcategory(res.data.product.category._id);
          setname(res.data.product.name)
          setdescription(res.data.product.description)
          setprice(res.data.product.price)
          setquantity(res.data.product.quantity)
          setshipping(res.data.product.shipping)
          setid(res.data.product._id)
        }
      } catch (error) {
        console.log(`error while getting single category`);
      }
    }
    useEffect(() => {
      getallcategory();
      getsinglecategory()
    }, []);
    const handleClick =async (e)=>{
      try {
        e.preventDefault();
        const productData = new FormData();
        productData.append("name",name);
        productData.append("description",description)
        productData.append("price",price);
        productData.append("quantity",quantity);
        productData.append("shipping",shipping);
        productData.append("category",category);
        if (photo) {
          productData.append("photo",photo);
        } 
        const {data} = await axios.put(`/api/v1/product/update-product/${id}`,productData,{
          headers:{
            "Authorization":auth?.token
          }
        })
        if (data.success) {
           toast.success(data.message)
          navigate("/dashboard/admin/products")
        }else{
           toast.error(data.message)
        }
      } catch (error) {
        console.log(`error while updating product`);
        toast.error("error while updating product")
      }
    }
    //handle delete
    const handleDelete = async()=>{
      try {
       
        
         const res=  await axios.delete(`/api/v1/product/delete-product/${id}`,{
          headers:{
            "Authorization":auth?.token
          }
         })
         if (res.data.success) {
          toast.success("successfully delete product")
          navigate("/dashboard/admin/products")
         }
        
        
       
      } catch (error) {
        console.log(`error while delete product`);
      }
    }
  return (
    <Layout>
      <div className='container-fluid m-3 p-3'>
      <div className='row'>
        <div className='col-md-3'>
          <AdminMenu/>
        </div>
        <div className='col-md-9'>
        <h1>Create product</h1>
            <div className="m-1 w-75">
              <Select
                placeholder={"Please Select Category"}
                size="large"
                showSearch
                className="w-75 form-select mb-3"
                value={category}
                onChange={(value) => {
                  setcategory(value);
                }}
              >
                {categories?.map((c) => {
                  return (
                    <Option key={c._id} value={c._id}>
                      {c.name}
                    </Option>
                  );
                })}
              </Select>

              <div className="mb-3 ">
                <label className="buttonUpload w-75">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => {
                      setphoto(e.target.files[0])

                    }}
                    hidden
                    className="inptbtn"
                  />
                </label>
              </div>
              <div className="text-center w-75">
                {
                  photo ?(<img src={URL.createObjectURL(photo)} className="img img-responsive" height={"200px"} />)
                  :(<img src={`/api/v1/product/product-photo/${id}`} className="img img-responsive" height={"200px"} />)
                }
              </div>
              <div className="text-center mb-3 w-75">
                <input type="text" className="form-control" placeholder="Enter Product Name" value={name} onChange={(e) => { setname(e.target.value) }} />
              </div>
              <div className="text-center mb-3 w-75">
                <textarea placeholder="Enter Product Description" className="form-control" value={description} onChange={(e) => { setdescription(e.target.value) }} ></textarea>

              </div>
              <div className="text-center mb-3 w-75 ">
                <input type="number" className="form-control" placeholder="Enter product Price" value={price} onChange={(e) => { setprice(e.target.value) }} />
              </div>
              <div className="text-center mb-3 w-75">
                <input type="number" className="form-control" placeholder="Enter Quantiy" value={quantity} onChange={(e) => { setquantity(e.target.value) }} />
              </div>
              <div className="mb-3 w-75">
                <Select
                  placeholder={"Please Select Shipping"}
                  size="large"

                  className="w-75 form-select mb-3"
                  value={shipping?"Yes":"No"}
                  onChange={(value) => {
                    setshipping(value);
                  }}
                >

                  <Option key={1} value={1}>
                    Yes
                  </Option>
                  <Option key={2} value={0}>
                    No
                  </Option>

                </Select>
                 </div>
                 <div className=" w-75">
                 
                  <button className="btn btn-primary" onClick={handleClick}>Submit</button>
                  <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
                 </div>

            </div>
        </div>
      </div>
      </div>
    </Layout>
  )
}

export default UpdateProduct
