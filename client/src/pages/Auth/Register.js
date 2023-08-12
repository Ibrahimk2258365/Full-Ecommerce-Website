import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate, navigate } from 'react-router-dom';



const Register = () => {
    const [name, setname] = useState("")
    const [email, setemail] = useState("")
    const [phone, setphone] = useState("")
    const [password, setpassword] = useState("")
    const [address, setaddress] = useState("")
    const [answer, setanswer] = useState("")
    const navigate = useNavigate();
    //submit form
    const submitData = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(`/api/v1/auth/register`, {
                name, email, password, phone, address ,answer
            });
            if (res.data.success===true) {
                toast.success(res.data.message)
                navigate("/login")
            }else{
                toast.error(res.data.message)
            }


        } catch (error) {
            console.log(`error while register form ${error}`);
            toast.error("Something Went Wrong")
        }
    }
    return (
        <Layout title={"Register Now"}>
            <div className='signup-container'>
         
                
                <form onSubmit={submitData} className='form' >
                <h2 className='title'>Regsiter Now</h2>
                    <div className="mb-3">

                        <input required onChange={(e) => { setname(e.target.value) }} value={name} type="text" className="form-control" id="exampleInputname" placeholder='Enter your Name' />
                    </div>
                    <div className="mb-3">

                        <input required onChange={(e) => { setemail(e.target.value) }} value={email} type="Email" className="form-control" id="exampleInputemail" placeholder='Enter Your Email' />
                    </div>
                    <div className="mb-3">

                        <input required onChange={(e) => { setphone(e.target.value) }} value={phone} type="text" className="form-control" id="exampleInputphone" placeholder='Enter Your Phone' />
                    </div>
                    <div className="mb-3">

                        <input required onChange={(e) => { setpassword(e.target.value) }} value={password} type="password" className="form-control" id="exampleInputPassword1" placeholder='Enter Your Password' />
                    </div>
                    <div className="mb-3">

                        <input required onChange={(e) => { setaddress(e.target.value) }} value={address} type="text" className="form-control" id="exampleInputaddress" placeholder='Enter Your Address' />
                    </div>
                    <div className="mb-3">

                        <input required onChange={(e) => { setanswer(e.target.value) }} value={answer} type="text" className="form-control" id="exampleInputaddress" placeholder='What is your favroute Sports' />
                    </div>
                    <button type="submit" className="submit">Submit</button>
                </form>

            </div>
             
        </Layout>
    )
}

export default Register
