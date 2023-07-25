import axios from 'axios';
import Layout from '../Components/Layouts/Layout'
import React, {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom';

// display particular category products page
const CategoryFilter = () => {

    const params = useParams();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [category, setcategory] = useState([]);

    useEffect(()=>{
        if(params?.slug) getProductsByCategory();
    },[params?.slug])
    const getProductsByCategory = async () =>{
        try{
            const {data} = await axios.get(`/api/product/category-product/${params.slug}`);
            setProducts(data?.products);
            setcategory(data?.category)
        }catch(err){
            console.log(err)
        }
    }
  return (
    <Layout>
     <h1 className='text-center home-heading pt-4 '>  {category?.name} </h1>
     <h6 className='text-center mb-5 found-result'> {products?.length} Results Found</h6>
     <div className='d-flex flex-wrap justify-content-around'>
        {products?.map(prod =>(<>
        <div className="card m-2 col-5"  >
  <img className="card-img-top" src={`/api/product/product-image/${prod._id}`} alt={prod.name} />
  <div className="card-body">
    <h5 className="card-title">{prod.name}</h5>
    <p className="card-text ">{prod.description.substring(0,25)} ...</p>
    <p className="card-text card-price">$ {prod.price}</p>
  <div>
  <button href="#" className="btn btn-outline-secondary m-1" onClick={()=> navigate(`/product-details/${prod.slug}`)}>See More</button>
</div>

</div>
</div>
</>
       ))}
        </div> 
    </Layout>
  )
}

export default CategoryFilter
