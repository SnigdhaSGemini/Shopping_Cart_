import React, {useState, useEffect} from 'react'
import AdminMenu from './../../Components/Layouts/AdminMenu';
import Layout from '../../Components/Layouts/Layout';
import axios from 'axios';
import { useAuth } from '../../Contexts/Authorization';
import { Select } from 'antd';


const {Option}  = Select;

const EditOrders = () => {
    const [status , setStatus] = useState(["Ordered" ,"Packed", "Shipped", "Out for Delivery", "Delivered", "Cancelled"]);
    const [changeStatus, setChangeStatus] = useState("");
    const [orders, setOrders] = useState([]);
    const [authorization,setAuthorization] = useAuth()
  
    // get all orders
    const getOrders = async () =>{
      try{
        const {data} = await axios.get(`/api/auth/all-orders`);
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

    // update status of orders

    const updateStatus = async (oid, value) =>{
        try{
            const {data} = await axios.put(`/api/auth/set-orders/${oid}`, {status: value});
            getOrders();
        }catch(err){
            console.log(err)
          }
    }
  return (
    <Layout title={"All Orders"}>
      <div className='d-flex justify-content-around p-3'>
      <div className='col-3'>
        <AdminMenu/>
      </div>
      <div className='col-8'>
        <h1 className='text-center home-heading'>All Orders</h1>
        <div className='border shadow'>
        <table className='table'>
                      <thead>
                        <tr>
                          <th scope='col'># </th>
                          <th scope='col'>User </th>
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
                        <td className='card-title'>{order?.buyer?.name}</td>
                        <td>
                            <Select bordered={false} onChange={(val) => updateStatus(order._id,val)} defaultValue={order?.status}>
                               {status.map((stat, idx)=>(
                                <Option key={idx} value={stat}> {stat}</Option>
                               ))}
                            </Select>
                        </td>
           <td><img className="card-img-top" src={`/api/product/product-image/${order?.products[0]?._id}`} alt={order?.products[0]?.name} /></td> 
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

export default EditOrders
