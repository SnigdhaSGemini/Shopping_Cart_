import React, { useState, useEffect } from 'react';
import Layout from '../../Components/Layouts/Layout';
import AdminMenu from '../../Components/Layouts/AdminMenu';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Select } from 'antd';
import { useNavigate , useParams} from 'react-router-dom';

const { Option } = Select;

const UpdateProducts = () => {
    const [id, setid] = useState("");
    const [allCategory, setAllCategory] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [image, setimage] = useState("");
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState("");
    const [shipping, setShipping] = useState("");

    const navigate = useNavigate();
    const params = useParams();

    // get
    const getProduct = async () =>{
        try{
            const {data} = await axios.get( `/api/product//get-product/${params.slug}`)
            setName(data.getProduct.name);
            setid(data.getProduct._id);
            setDescription(data.getProduct.description)
            setPrice(data.getProduct.price)
            setQuantity(data.getProduct.quantity)
            setCategory(data.getProduct.category)
            setShipping(data.getProduct.shipping)
        }catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{
        getProduct();
        // eslint-disable-next-line
    },[])
  
    const getAll = async () => {
      try {
        const { data } = await axios.get("/api/category/all-category/");
        if (data?.success) {
          setAllCategory(data?.getAllCategory);
        }
      } catch (err) {
        console.log(err);
        toast.error("Something Went Wrong In Getting Category");
      }
    };
  
    useEffect(() => {
      getAll();
    }, []);
  
    // update
    const updateProduct = async (e) =>{
      e.preventDefault();
      try{
        const newData =new FormData();
        newData.append("name",name);
        newData.append("description",description);
        newData.append("price",price);
        newData.append("quantity",quantity);
        newData.append("category",category._id);
        image && newData.append("image",image);
        const {data} = axios.put(`/api/product/update-product/${id}`,newData);
        if(data?.success){
          toast.error(data?.message)
        }
        else{
          toast.success("Product Updated!");
        setTimeout(()=>{  navigate("/dashboard/admin/products")},1000)
        }
      }catch(err){
        console.log(err)
        toast.error("Something Went Wrong While Product Updation")
      }
    }

    // delete
    const deleteProduct = async () =>{
        try{
            const {data} = await axios.delete(`/api/product//delete-product/${id}`);
            toast.success("Product Deleted!");
            navigate("/dashboard/admin/products")
        }catch(err){
            console.log(err)
            toast.error("Something Went Wrong While Product Deletion")
          }
    }
  return (
    <Layout title={"Create Product"}>
    <div className='conatiner-fluid d-flex justify-content-around m-3 p-3'>
      <div className='col-3'>
        <AdminMenu />
      </div>
      <div className='col-8'>
        <h1 className='home-heading'>Update Product Details</h1>
        <div className='m-1'>
          <Select
            bordered={false}
            placeholder="Select Category"
            size='small'
            showSearch
            className='form-select mb-3'
            onChange={(value) => setCategory(value)}
            value={category.name}
          >
            {allCategory?.map(val => (
              <Option key={val._id} value={val._id}>
                {val.name}
              </Option>
            ))}
          </Select>
          <div className='mb-3'>
            <label className='btn btn-outline-danger col-12'>
              {image ? image.name : " Upload Image" }
            <input type='file' name='image' accept='image/*' onChange={(e) => setimage(e.target.files[0])} hidden/>
            </label>
          </div>
          <div className='mb-3'>
            {image ? (
              <div className='text-center'>
                <img src={URL.createObjectURL(image)} alt='product_image' height={"100px"} className='img img-responsive'/>
              </div>
            ) : ( <div className='text-center'>
             <img className="card-img-top" src={`/api/product/product-image/${id}`} alt={name} />
          </div>)}
          </div>
          <div className='mb-3'>
            <input type='text' value={name} placeholder='Product Name' className='form-control' onChange={(e) => setName(e.target.value)}/>
          </div>
          <div className='mb-3'>
            <textarea type='text' value={description} placeholder='Product Description' className='form-control' onChange={(e) => setDescription(e.target.value)}/>
          </div>
          <div className='mb-3'>
            <input type='number' value={price} placeholder='Product Price' className='form-control' onChange={(e) => setPrice(e.target.value)}/>
          </div>
          <div className='mb-3'>
            <input type='number' value={quantity} placeholder='Product Quantity' className='form-control' onChange={(e) => setQuantity(e.target.value)}/>
          </div>
          <div className="mb-3">
              <Select bordered={false} placeholder="Select Shipping "  size="small"  showSearch  className="form-select mb-3"  onChange={(value) => {   setShipping(value);}} value={shipping ? "Yes" : "No"}>
                <Option value="0">No</Option>
                <Option value="1">Yes</Option>
              </Select>
            </div>
            <div className='mb-3'>
              <button className='btn btn-outline-warning' onClick={updateProduct}> Update</button>
            </div>
            <div className='mb-3'>
              <button className='btn btn-danger' onClick={deleteProduct}> Delete</button>
            </div>
        </div>
      </div>
    </div>
  </Layout>
  )
}

export default UpdateProducts
