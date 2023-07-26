import React, {useState, useEffect} from 'react'
import Layout from '../../Components/Layouts/Layout'
import UserMenu from '../../Components/Layouts/UserMenu'
import axios from 'axios';
import { useAuth } from '../../Contexts/Authorization';

// user orders
const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [authorization,setAuthorization] = useAuth()

  // get all orders
  const getOrders = async () =>{
    try{
      const {data} = await axios.get(`/api/auth/orders`);
      setOrders(data);
    }catch(err){
      console.log(err)
    }
  }
  useEffect(()=>{
    if(authorization?.token){
      getOrders();
    }
  },[authorization?.token])
  return (
    <Layout title={"Orders"}>
      <div className='column-fluid p-3 d-flex justify-content-between flex-wrap h-100'>
        <div className='col-3'>
            <UserMenu/>
        </div>
        <div className='col-8 all-category'>
            <h1 className='text-center home-heading'>My Orders</h1>
            <div className='border shadow'>
                    <table className='table'>
                      <thead>
                        <tr>
                          <th scope='col'># </th>
                          <th scope='col'>Status </th>
                          <th scope='col'>Product </th>
                          <th scope='col'>Name </th>
                          <th scope='col'>Price </th>
                        </tr>
                      </thead>
                      <tbody>
            {
              orders?.map((order,item)=> (<>
                        <tr>
                        <th>{item +1}</th> 
                        <td className='card-title'>{order?.status}</td>
           <td><img className="card-img-top" src={`/api/product/product-image/${order?.products[0]?._id}`}  height="100vw" alt={order?.products[0]?.name} /></td> 
            <td> {order?.products[0]?.name}</td>
            <td className='card-price'><b> $ {order?.products[0]?.price}</b></td>
                        </tr>
                     
                        </>)
              )
            }
             </tbody>
                    </table>
                  </div>
           
        </div>
      </div>
    </Layout>
  )
}

export default Orders
