import React, {useState, useEffect} from 'react'
import Layout from './../Components/Layouts/Layout';
import axios from 'axios';
import { useParams } from 'react-router-dom';

// product details page
const ProductDetails = () => {

const [product, setProduct] = useState({})
const params = useParams()

// get product i.e. need to be displayed
    const getProducts = async () =>{
        try{
            const {data} = await axios.get(`/api/product/get-product/${params.slug}`);
            setProduct(data?.getProduct);
            console.log(product);
        }catch(err){
            console.log(err)
        }
    }
    
    useEffect(() =>{
        if(params?.slug){getProducts();}
    }, [params?.slug])
  return (
    <Layout>
     <h1 className='text-center pt-3 home-heading'> Product Details</h1>
    <div className='d-flex justify-content-around h-80'>
    <div className='col-5 m-3'>
    <img className="card-img-top" src={`/api/product/product-image/${product._id}`} alt={product.name} />
    </div>
     <div className='col-6 m-3 card p-3 prod-details'>
        <p className='card-title'>Name :  {product.name}</p>
        <p className='card-price'>Price : $  {product.price}</p>
        <p className='card-title'>Quantity : {product.quantity}</p>
        <p className='card-desc'>Description : {product.description}</p>
     </div>
    </div>
    </Layout>
  )
}

export default ProductDetails
