import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
export default function useCategory() {
    const [category, setCategory] = useState([]);
    try {
        
        //get category 
        const getCategory = async () => {
            const { data } = await axios.get("/api/v1/category/get-category");
            setCategory(data?.category)
        }
        useEffect(() => {
            getCategory()
        }, [])
    } catch (error) {
        console.log(error);
    }
   
    return category;
}



