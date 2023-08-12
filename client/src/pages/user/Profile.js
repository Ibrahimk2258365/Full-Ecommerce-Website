import React, { useEffect, useState } from 'react'
import UserMenu from '../../components/Layout/UserMenu'
import Layout from '../../components/Layout/Layout'
import { useAuth } from '../../components/Context/Auth'
import axios from 'axios'
import { LoaderIcon, toast } from 'react-hot-toast'

const Profile = () => {
    const [name, setname] = useState("")
    const [email, setemail] = useState("")
    const [phone, setphone] = useState("")
    const [password, setpassword] = useState("")
    const [address, setaddress] = useState("")
    const [auth, setAuth] = useAuth();
    //submit form
    const submitData = async (e) => {
        e.preventDefault();
console.log(auth?.user?._id);
        try {
            const res = await axios.put(`/api/v1/auth/profile`, {
                name, password, phone, address , 
            },{
                headers:{
                    "Authorization":auth?.token
                }
            });
            if (res.data.success === true) {
                toast.success(res.data.message)
                let ls = localStorage.getItem("auth");
                 ls = JSON.parse(ls)
                 ls.user = res.data.userprofile
                 localStorage.setItem("auth",JSON.stringify(ls))
                
                 setAuth( {...auth,user:res.data.userprofile})


            } else {
                toast.error(res.data.message)
            }


        } catch (error) {
            console.log(`error while register form ${error}`);
            toast.error("Something Went Wrong")
        }
    }
    useEffect(() => {
        const { name, email, password, phone, address } = auth.user;
        setname(name);
        setemail(email);
        setphone(phone)
        setaddress(address)
    }, [auth?.user])

    return (
        <Layout>
            
            <div className='container-fluid m-3 p-3'>
                <div className='row'>
                    <div className='col-md-3'><UserMenu /></div>
                    <div className='col-md-9'>

                        <div className='register'>


                            <form onSubmit={submitData} className='formcontainer' >
                                <h2 className='text-center'>User Profile </h2>
                                <div className="mb-3">

                                    <input required onChange={(e) => { setname(e.target.value) }} value={name} type="text" className="form-control" id="exampleInputname" placeholder='Enter your Name' />
                                </div>
                                <div className="mb-3">

                                    <input required disabled onChange={(e) => { setemail(e.target.value) }} value={email} type="Email" className="form-control" id="exampleInputemail" placeholder='Enter Your Email' />
                                </div>
                                <div className="mb-3">

                                    <input  onChange={(e) => { setpassword(e.target.value) }} value={password} type="text" className="form-control"  placeholder='Enter Your Password' />
                                </div>
                                <div className="mb-3">

                                    <input required onChange={(e) => { setphone(e.target.value) }} value={phone} type="text" className="form-control" id="exampleInputphone" placeholder='Enter Your Phone' />
                                </div>

                                <div className="mb-3">

                                    <input required onChange={(e) => { setaddress(e.target.value) }} value={address} type="text" className="form-control" id="exampleInputaddress" placeholder='Enter Your Address' />
                                </div>

                                <button type="submit" className="btn btn-primary">UPDATE</button>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Profile
