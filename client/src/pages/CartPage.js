import React from 'react'
import Layout from '../components/Layout/Layout'
import { useAuth } from '../components/Context/Auth'
import { useCart } from '../components/Context/Cart';
import {  useNavigate } from 'react-router-dom';


const CartPage = () => {
    const [auth, setAuth] = useAuth();
    const [cart, setcart] = useCart();
    const navigate = useNavigate()
        const totalPrice = ()=>{
        let total = 0 ;
        cart?.map((item)=>{
           total = total + item.price
        })
        return total.toLocaleString("en-US",{
            style:"currency",
            currency:"USD"
        })
    }
    const removecartItems = (pid)=>{
       try {
        const myCart = [...cart];
        const index = myCart.findIndex((item)=>item._id===pid);
        myCart.splice(index,1);
        setcart(myCart)
        localStorage.setItem("cart",JSON.stringify(myCart))
       } catch (error) {
        console.log(error);
       }
    }
    return (
        <Layout>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-12'>
                        <h1 className='text-center bg-light p-2'>
                            {`Hello ${auth?.token && auth?.user?.name}`}
                        </h1>
                        <h4 className='text-center'>

                            {cart?.length > 0 ? `You have ${cart?.length} items in your cart ${auth?.token ? "" : "please login to proceed checkout"}` : "Your cart is empty"}
                            {/* {auth?.token ? "":"please login to proceed to checkout"} */}
                        </h4>
                    </div>

                </div>

                <div className='row'>
                    <div className='col-md-8'>
                        {
                            cart?.map(p => (
                                <div className='row cartrow'>
                                    <div className='col-md-4'>  <img src={`/api/v1/product/product-photo/${p._id}`} className="card-img-top " height={"100px"} width={"70px"} alt={p.name} /></div>
                                    <div className='col-md-8'>
                                        <h4 className='carttitle'>{p?.name}</h4>
                                        <p>{p.description.substring(0,30)}...</p>
                                        <h4>${p.price}</h4>
                                        <button className='btnremoveCart' onClick={()=>{removecartItems(p._id)}}>Remove</button>
                                    </div>
                                  
                                </div>
                                
                            ))



                        }
                    </div>
                    <div className='col-md-4'>
                        check out | History
                        <h3>Total : {totalPrice()}</h3>
                        {
                            auth?.user?.address ? (
                                <>
                                <h3>Current Address</h3>
                                <h4 className='text-center'>{auth?.user?.address}</h4>
                                <button className='btn btn-warning btnupdatecartaddresss' onClick={()=>{navigate("/dashboard/user/profile")}}>Update Address</button>
                                </>
                            ):("")

                        }
                        {
                            auth?.token ? ("check out"): (<>
                            <button className='btn btn-warning btnupdatecartaddresss' onClick={()=>{navigate("/login",{state:"/cart"})}}>Please login to proceed Checkout</button>
                            </>)
                        }
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CartPage
