import { useEffect, useState } from 'react';
import axios from 'axios';

// Custom Hook - to get all categories from database
export default function useCategory  (){
    const [categories, setCategories] = useState([]);

    const getCategories = async () => {
        try{
            const {data} = await axios.get(`/api/category/all-category/`);
            setCategories(data?.getAllCategory);
        }catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{
        getCategories();
    },[]);
    return categories;
}