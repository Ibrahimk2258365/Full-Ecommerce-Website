import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate, navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../components/Context/Auth';

const ForgetPassword = () => {
    
    const [email, setemail] = useState("")
    const [answer, setanswer] = useState("")
    const [newPassword, setpassword] = useState("")
    
    const navigate = useNavigate();
    //submit form
    const submitData = async (e) => {
        e.preventDefault();
       
        try {
            const res = await axios.post(`/api/v1/auth/forget-password`, {
                email, newPassword,answer
            });
            console.log(res.data.success);
            if (res.data.success === true) {
               
                toast.success(res.data.message)
                navigate("/login")
            } else {
                toast.error(res.data.message)
            }


        } catch (error) {
            console.log(`error while register form ${error}`);
            toast.error("Something Went Wrong")
        }
    }
    return (
        <Layout title="Forget-password">
            <div className='login-container'>
                <form onSubmit={submitData} className='login-form' >
                    <h2 className='text-center'>Reset</h2>
                    <div className="mb-3">
                        <input required onChange={(e) => { setemail(e.target.value) }} value={email} type="Email" className="input-container" id="exampleInputemail" placeholder='Enter Your Email' />
                    </div>
                    <div className="mb-3">
                        <input required onChange={(e) => { setanswer(e.target.value) }} value={answer} type="text" className="input-container"  placeholder='Enter Your Favorite Sports' />
                    </div>
                    <div className="mb-3">
                        <input required onChange={(e) => { setpassword(e.target.value) }} value={newPassword} type="password" className="input-container" id="exampleInputPassword1" placeholder='Enter New Password' />
                    </div>
                    <button type="submit" className="btn btn-primary">Reset</button>
                </form>
            </div>
        </Layout>
    )
}

export default ForgetPassword
