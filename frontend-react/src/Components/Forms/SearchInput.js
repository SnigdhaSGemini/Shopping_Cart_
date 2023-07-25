import React from 'react'
import { useSearch } from '../../Contexts/Search'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {BiSearch} from 'react-icons/bi';

// Search Box
const SearchInput = () => {
    const [val,setVal] = useSearch();
    const navigate = useNavigate();

    const searchProducts = async (e) =>{
        e.preventDefault();
        try{
            const {data} = await axios.get(`/api/product/search/${val.key}`);
            setVal({...val,results: data});
            navigate("/search")
            console.log(val);
        }catch(err){
            console.log(err)
        }
    }
  return (
    <div>
      <form className="form-inline my-2 my-lg-0 d-flex " onSubmit={searchProducts}>
  <input className="form-control mr-sm-2 search-input" type="search" placeholder="Search" aria-label="Search" value={val.key} onChange={(e) => setVal({...val , key: e.target.value})}/>
  <button className="btn btn-outline-warning my-2 my-sm-0  search-button" type="submit"><BiSearch/></button>
</form>

    </div>
  )
}

export default SearchInput
