import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../components/Form/CategoryForm";
import { useAuth } from "../../components/Context/Auth";
import { Modal } from 'antd';
const CreateCategory = () => {
    const [category, setcategory] = useState([]);
    const [name, setname] = useState("");
    const [visible, setVisible] = useState(false)
    const [updateName, setupdateName] = useState("")
    const [Selected, setSelected] = useState(null)
    const [auth] = useAuth();
    //get all category
    const getallcategory = async () => {
        try {
            const res = await axios.get("/api/v1/category/get-category");
            console.log(res);
            if (res?.data?.success) {
                setcategory(res?.data?.category);
            }
            console.log(category);
        } catch (error) {
            console.log(`error while getting all category`);
            toast.error("Something went wrong while getting category");
        }
    };
    //handle submit
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const res = await axios.post(
                "/api/v1/category/create-category",
                {
                    name,
                },
                {
                    headers: {
                        Authorization: auth?.token,
                    },
                }
            );
            if (res.data.success) {
                toast.success(`${name} has been created Successfully`);
                getallcategory();
                setname("")
            } else {
                toast.error(`${name} ${res.data.message}`);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong while creating category");
        }
    };
    useEffect(() => {
        getallcategory();
    }, []);
    //handleUpdateSubmit
    const handleUpdateSubmit =async (e)=>{
        e.preventDefault()
        try {
            const {data} = await axios.put(`/api/v1/category/update-category/${Selected._id}`,{name:updateName},{
                headers:{
                    "Authorization":auth?.token
                }
            })
            if (data.success) {
                toast.success(`${updateName} is updated successfully`)
                setupdateName("null")
                setSelected(null);
                setVisible(false)
                getallcategory()

            }else{
                toast.error(`${updateName} ${data.message}`)
            }
        } catch (error) {
            console.log(`some thing went wrong in update modal`);
            toast.error(`Not update Some thing went wrong`)
        }
    }
    //handle delete
    const handleDelte =async (id)=>{
       
        try {
            let confrm ;
            confrm = window.prompt("Do you really want to delete `YES` `NO`")
           
           if (confrm==="yes") {
            const {data} = await axios.delete(`/api/v1/category/delete-category/${id}`,{
                headers:{
                    "Authorization":auth?.token
                }
            })
            if (data.success) {
                toast.success(`${data.message}`)
               
                getallcategory()

            }else{
                toast.error(` ${data.message}`)
            }
           }
        } catch (error) {
            console.log(`some thing went wrong in update modal`);
            toast.error(`Not update Some thing went wrong`)
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
                        <h1>Category</h1>
                        <CategoryForm
                            handleSubmit={handleSubmit}
                            value={name}
                            setValue={setname}
                            buttonName={"Add Category"}
                        />
                        <div className="w-74">
                            <table class="table w-75">
                                <thead>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {category?.map((c) => {
                                        return (
                                            <>
                                                <tr>
                                                    <td key={c._id}>{c.name}</td>
                                                    <td>
                                                        <button className="btn btn-primary catbtn ms-3" onClick={()=>{setVisible(true); setupdateName(c.name); setSelected(c)}}>
                                                            Edit
                                                        </button>
                                                        <button className="btn btn-danger catbtn ms-3" onClick={()=>{handleDelte(c._id)}}>
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            </>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <Modal onCancel={()=>{setVisible(false)}} footer={null} visible={visible}>
                        <CategoryForm value={updateName} setValue={setupdateName} handleSubmit={handleUpdateSubmit} buttonName={"Update"}/>
                    </Modal>
                </div>
            </div>
        </Layout>
    );
};

export default CreateCategory;
