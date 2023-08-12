import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const Spinner = ({path="login"}) => {
    const [count, setcount] = useState(5)
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
      const interval = setInterval(() => {
        setcount((prevalue)=>--prevalue)
      }, 1000);
      if (count===0) {
        navigate(`/${path}`,{state:location.pathname})
      }
      return ()=>{clearInterval(interval)}
    }, [count,navigate,location,path])
    
    return (
        <>
            <div className="spinner-">
                <h1>redirecting you in {count} second</h1>
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>

        </>
    )
}

export default Spinner
