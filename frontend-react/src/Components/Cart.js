import React from 'react'
import Layout from './Layouts/Layout'
import { useCart } from '../Contexts/Cart';
import { useAuth } from '../Contexts/Authorization';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';

// Cart Page

const Cart = () => {
    const [cart,setCart] = useCart();
    const [authorization, setAuthorization] = useAuth()
    const navigate = useNavigate();

    // Remove from cart functionality
    const removeItemCart = (id) => {
        try{
            let Mycart = [...cart];
            let idx = Mycart.findIndex(item => item._id === id) ;
            if (idx !== -1) {
                Mycart.splice(idx, 1);
                setCart(Mycart);
                localStorage.setItem("cart",JSON.stringify(Mycart))
            }
        }catch(err){
            console.log(err)
        }
    }

    // Order button functionality

    const OrderItemCart = async (id) =>{
        try{
            let Mycart = [...cart];
            let idx = Mycart.findIndex(item => item._id === id) ;
            if (idx !== -1) {
                const order = Mycart.splice(idx, 1);
                console.log(order);
                const {data} = await axios.post(`/api/product/orders/`,{cart: order});
                console.log(data.cart);
                toast.success("Order Placed !");
                setCart(Mycart);
                localStorage.setItem("cart",JSON.stringify(Mycart));
                setTimeout(()=>{  navigate("/dashboard/user/orders");},1000)
            }
        }catch(err){
            console.log(err);
            toast.error("Something Went Wrong While Placing Order")
        }
    }

    // To calculate total amount in cart
    const totalAmount = () =>{
        try{
            let total = 0;
            cart?.map(item => {
                total = total + item.price
            });
            return total;
        }catch(err){
            console.log(err)
        }
    }
   

  return (
    <Layout>
      <div>
        <h1 className='text-center p-3 home-heading'> Your Cart</h1>
        {authorization?.token ? (<><h5 className='text-center p-3 pt-0 home-filter'> Welcome {authorization?.user.name}</h5>
        {cart?.length > 0 ? (<>
        <p className='text-center p-3 pt-0 found-result'>
            You have {cart?.length} items in your cart
        </p>
       <div className='d-flex justify-content-around cart'>
       <div className='col-7 m-3 d-flex flex-wrap'><h5 className='cart-item-heading'>Cart Items</h5>
       {cart?.map(prod =>(
        <div className='card m-1 d-flex flex-wrap'>
            <div className='col-4 p-2'>
            <img className="card-img-top" src={`/api/product/product-image/${prod._id}`} alt={prod.name} />
            </div>
            <div className='col-8 d-flex p-1 flex-wrap'>
               <div> <h5  className='text-center card-title'>{prod.name}</h5>
                <p className='card-text'> {prod.description.substring(0,40)} ...</p>
                <b className='card-price'> $ {prod.price}</b></div>
                <div className=' p-2 d-flex align-items-center flex-wrap '><button className='btn btn-outline-warning m-1' 
                onClick= {() =>removeItemCart(prod._id)}
                >Remove</button>
                <button className='btn btn-outline-success m-1' 
                onClick= {() =>OrderItemCart(prod._id)}
                >Order</button>
                </div>
                
            </div>
        </div>
       ))}
       </div>
        <div className='col-4 card p-3'><h4 className='cart-item-heading text-center'>Your Total</h4>
        <p className='total-head text-center'>Total | Checkout | Payment</p>
        <p className='total-amount'>Amount : $ {totalAmount()} .00</p>
        {authorization?.user?.address ? (<>
        <h6 className='home-filter'>Current Address: </h6>
        <p className='text-center mb-5'>{authorization?.user?.address}</p>
        <button className='btn btn-outline-secondary' onClick={() => navigate("/dashboard/user/account")}>Update Address</button>
        </>) :(<>
        <div className='mb-3'>
            {
                authorization?.token && (   <button className='btn btn-outline-secondary' onClick={() => navigate("/dashboard/user/account")}>Add Address</button>)
            }
        </div>
        </>)}
        </div>
       </div>
        </>) : (<p className='text-center p-3'>Your cart is Empty</p>) }
        </>) : (<div className='text-center p-3'>
        <h5 className='text-center p-3'>Please Login first To Access Your Cart</h5>
        <button className='btn btn-outline-danger m-3' onClick={()=>navigate("/login")}>Go to Login Page</button>
        </div>)}
      </div>
    </Layout>
  )
}

export default Cart
