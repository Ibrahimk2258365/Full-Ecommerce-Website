import React,{useState,useEffect} from 'react'
import { useAuth } from '../Context/Auth'
import { Outlet } from 'react-router-dom'
import axios from 'axios'
import Spinner from '../Spinner'
export default function AdminRoute() {
    const [auth,setAuth]= useAuth()
    const [ok, setok] = useState(false)
    useEffect(() => {
      const authCheck =async ()=>{
        const res =await axios.get("/api/v1/auth/admin-auth",{
           headers:{
            "Authorization":auth?.token
           }
        });
        if (res.data.ok===true) {
            setok(true)
        }else{
            setok(false)
        }
      }
      if (auth?.token) {
        authCheck();
      }
    }, [auth?.token])
    return ok ?<Outlet/> :<Spinner path=''/>
}
