import React, {useState,useEffect} from 'react'
import AdminMenu from '../../Components/Layouts/AdminMenu'
import Layout from '../../Components/Layouts/Layout'
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const Products = () => {
    const [products, setProducts] = useState([])

    // get all products
    const getAll = async () =>{
        try{
            const {data} = await axios.get("/api/product/all-product");
            setProducts(data.getAllProducts);
        }catch(err){
            console.log(err);
            toast.error("Something Went Wrong While Getting Products")
        }
    }
    useEffect(()=>{
        getAll();
    },[])
  return (
    <Layout>
    <div className='d-flex p-3 justify-content-around'>
    <div className='col-3 '>
        <AdminMenu/>
      </div>
      <div className='col-8'>
        <h1 className='text-center home-heading'>Products</h1>
       <div className='d-flex justify-content-around flex-wrap'>
       {products?.map(prod =>(<>
        <Link key={prod._id} to={`/dashboard/admin/update-product/${prod.slug}`} className="product-card col-6 ">
        <div className="card m-1"  >
  <img className="card-img-top" src={`/api/product/product-image/${prod._id}`} alt={prod.name} height="200vw"/>
  <div className="card-body">
    <h5 className="card-title">{prod.name}</h5>
    <p className="card-text">{prod.description}</p>
  </div>
</div>
        </Link>
</>
       ))}
       </div>
      </div>
    </div>
    </Layout>
  )
}

export default Products
