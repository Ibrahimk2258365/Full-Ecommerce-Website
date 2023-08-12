import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate, navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../components/Context/Auth';



const Login = () => {
    const [auth, setAuth] = useAuth();
    const [email, setemail] = useState("")

    const [password, setpassword] = useState("")
    const location = useLocation();
    const navigate = useNavigate();
    //submit form
    const submitData = async (e) => {
        e.preventDefault();
       
        try {
            const res = await axios.post(`/api/v1/auth/login`, {
                email, password
            });
            console.log(res.data.success);
            if (res.data.success === true) {
                setAuth({ ...auth, user: res.data.user, token: res.data.token })
                localStorage.setItem("auth", JSON.stringify(res.data))
                toast.success(res.data.message)
                navigate(location.state || "/")
            } else {
                toast.error(res.data.message)
            }


        } catch (error) {
            console.log(`error while register form ${error}`);
            toast.error("Something Went Wrong")
        }
    }
    return (
        <Layout title={"Login N ow"}>
            <div className='login-container'>


                <form onSubmit={submitData} className='login-form' >
                <h2 className="form-title">Sign in to your account</h2>

                    <div className="mb-3">

                        <input required onChange={(e) => { setemail(e.target.value) }} value={email} type="Email" className="input-container" id="exampleInputemail" placeholder='Enter Your Email' />
                    </div>

                    <div className="mb-3">

                        <input required onChange={(e) => { setpassword(e.target.value) }} value={password} type="password" className="input-container" id="exampleInputPassword1" placeholder='Enter Your Password' />
                    </div>
                   
                    <button type="submit" className="s-button">Login Now</button>
                    <div className='signup-link'>
                    <button type="button" className="signup-link-text" onClick={()=>{navigate("/forget-password")}}>Forgetten password?</button>
                    </div>
                    
                </form>

            </div>

        </Layout>
    )
}

export default Login
