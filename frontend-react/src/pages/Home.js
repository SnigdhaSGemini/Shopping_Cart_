import React, {useState,useEffect} from 'react'
import Layout from '../Components/Layouts/Layout'
import axios from 'axios';
import { Checkbox, Radio } from 'antd';
import { Prices } from '../Components/Prices';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../Contexts/Cart';
import toast from 'react-hot-toast';
import { useAuth } from '../Contexts/Authorization';

// home page
const Home = () => {
  const [cart, setCart] = useCart();
  const [products,setProducts] = useState([]);
  const [allCategory, setAllCategory] = useState([]);
  const [total,setTotal] = useState(0);
  const [page,setPage] = useState(1);
  const [load, setLoad] = useState(false);
const [checked,setChecked] = useState([]);
const [radio , setRadio] = useState([]);
const [authorization , setAuthorization] = useAuth();

const navigate = useNavigate();
    // get all categories
    const getAllC = async () =>{
      try{
        const {data} = await axios.get("/api/category/all-category/");
        if(data?.success){
          setAllCategory(data?.getAllCategory)
        }
      }catch(err){
        console.log(err);
      }
    }
    useEffect(()=>{
      getAllC();
      getCount();
    },[])

  // get all Products
  const getAllP= async () =>{
    try{
      setLoad(true);
      const {data} = await axios.get(`/api/product/pagination/${page}`);
      setLoad(false);
      setProducts(data.products);
    }catch(err){
      setLoad(false);
      console.log(err)
    }
  }
  useEffect(()=>{
   if(page === 1) return;
    loadMore();

  },[page])
  // load data
  const loadMore = async (req,res) =>{
    try{
      setLoad(true)
      const {data} = await axios.get(`/api/product/pagination/${page}`);
      setLoad(false);
      setProducts([...products, ...data?.products])
    }catch(err){
      setLoad(false);
      console.log(err)
    }
  } 

    // product count
    const getCount = async () =>{
      try{
        const {data} = await axios.get(`/api/product/product-count`);
        setTotal(data?.all)
      }catch(err){
        console.log(err);
      }
    }

    // filter by category
  const filterOnCategory = async (val,id) =>{
    let selected = [...checked];
    if(val){
      selected.push(id)
    }
    else{
      selected = selected.filter(categ => categ!== id)
    }
    setChecked(selected);
  }
  useEffect(()=>{
    if(!checked.length || !radio.length) getAllP();
  },[checked.length,radio.length]);
  useEffect(()=>{
    if(checked.length || radio.length) filterProducts();
  },[checked,radio])

  // apply filter
  const filterProducts = async () =>{
    try{
      const {data} = await axios.post(`/api/product/product-filters`,{checked,radio});
      setProducts(data?.filteredProducts)
    }catch(err){
      console.log(err)
    }
  }



  return (
    <Layout title={"Home Page"}>
    <div className='d-flex justify-content-around'>
      <div className='col-3'>
        <h1 className='text-center mt-4 home-heading filter'>Filters</h1>
        <div className='d-flex flex-column p-3 m-2 card '>
        <h5 className='mb-5 home-filter'>Category</h5>
        {allCategory?.map(categ =>(
          <Checkbox className='filters' key={categ._id} onChange={(e) => filterOnCategory(e.target.checked,categ._id)}>{categ.name}</Checkbox>
        ))}
        </div>
        <div className='d-flex flex-column m-2 p-3 card'>
        <h5 className=' mb-5 home-filter ' >Price</h5>
        <Radio.Group onChange={(e) => setRadio(e.target.value)} className='d-flex flex-column filters'>
          {Prices?.map(prices => (
            <Radio key={prices._id} value={prices.arr}>{prices.name}</Radio>
          ))}
        </Radio.Group>
        </div>
      </div>
      <div className='col-8 d-flex flex-column'>
        <h1 className='text-center mt-4 mb-4 home-heading'>Our Products</h1>
        <div className='d-flex flex-wrap justify-content-around'>
        {products?.map(prod =>(<>
        <div className="card m-1 col-5"  >
  <img className="card-img-top" src={`/api/product/product-image/${prod._id}`} alt={prod.name} />
  <div className="card-body">
    <h5 className="card-title">{prod.name}</h5>
    <p className="card-text">{prod.description.substring(0,25)} ...</p>
    <p className="card-text card-price">$ {prod.price}</p>
  <div>
  <button href="#" className="btn btn-warning m-1 see-more-button" onClick={()=> navigate(`/product-details/${prod.slug}`)}>See More</button>
  { authorization?.token ? (<button href="#" className="btn btn-outline-secondary m-1" onClick={() => {setCart([...cart,prod]);
    localStorage.setItem("cart", JSON.stringify([...cart,prod]))
    toast.success("Item Added To Cart")}}>Add to Cart</button>) : (<button href="#" className="btn btn-outline-secondary m-1" onClick={() => { toast.error("Please Login to Add Items to Cart!");
   setTimeout(()=>{navigate("/login")},1000) }}>Add to Cart</button>) }
</div>

  </div>
</div>
</>
       ))}
        </div>
        <div className="m-2 p-2 text-center">{products && products.length < total && (
        <button className="btn btn-info load-button" onClick={(e) =>{
          e.preventDefault();
          setPage(page +1);
        }}>
          {load ? "Loading ..." : "Load More"}
        </button>
      )}</div>
      </div>
    </div>
    </Layout>
  )
}

export default Home
