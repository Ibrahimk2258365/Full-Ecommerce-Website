import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Button, Select } from "antd";
import { useAuth } from "../../components/Context/Auth";
import { useNavigate } from "react-router-dom";

const { Option } = Select;
const CreateProduct = () => {
  const navigate = useNavigate()
  const [auth] = useAuth()
  const [categories, setcategories] = useState([]);
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [price, setprice] = useState("");
  const [quantity, setquantity] = useState("");
  const [shipping, setshipping] = useState("");
  const [category, setcategory] = useState("");
  const [photo, setphoto] = useState("");
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
  useEffect(() => {
    getallcategory();
  }, []);
//handle click
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
    productData.append("photo",photo);
    const {data} = await axios.post("/api/v1/product/create-product",productData,{
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
    console.log(`error while create product`);
    toast.error("error while creating product")
  }
}
  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Create product</h1>
            <div className="m-1 w-75">
              <Select
                placeholder={"Please Select Category"}
                size="large"
                showSearch
                className="w-75 form-select mb-3"
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
                  photo && (
                    <img src={URL.createObjectURL(photo)} className="img img-responsive" height={"200px"} />
                  )
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
                 </div>

            </div>
          </div>
        </div>
      </div>

    </Layout>
  );
};

export default CreateProduct;
