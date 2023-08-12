import { Layout } from 'antd'
import React from 'react'
import { useSearch } from '../Context/Search'
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';
const SearchInput = () => {
    const navigate = useNavigate()
    const [value,setValue] = useSearch();
    const handlesubmit = async(e)=>{
        e.preventDefault()
        try {
            
            const {data} = await axios.get(`/api/v1/product/search/${value.keywords}`)
            setValue({...value,results:data})
            navigate("/search")
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <Layout>
            <form className="d-flex" onSubmit={handlesubmit}>
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"
                value={value.keywords}
                onChange={(e)=>
                    setValue({...value,keywords:e.target.value})
                }
                />
                <button className="btn btn-outline-success" type="submit">Search</button>
            </form>

        </Layout>
    )
}

export default SearchInput
