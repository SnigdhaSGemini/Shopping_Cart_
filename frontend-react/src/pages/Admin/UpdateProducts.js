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

    const [productNameError, setProductNameError] = useState('');
    const [productPriceError, setProductPriceError] = useState('');
    const [productQuantityError, setProductQuantityError] = useState('');
    const [DescriptionError,setDescriptionError] = useState('');

    const navigate = useNavigate();
    const params = useParams();

    // get
    const getProduct = async () =>{
        try{
            const {data} = await axios.get( `/api/product/get-product/${params.slug}`)
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
    const handleDescriptionChange = (e) => {
      const inputValue = e.target.value;
      setDescription(inputValue);
    
      if (!inputValue.trim()) {
        setDescriptionError('Description is required');
      } else {
        setDescriptionError('');
      }
    };
    const handleNameChange = (e) => {
      const inputValue = e.target.value.trim();
      setName(inputValue);
  
      if (!inputValue) {
        setProductNameError('Product Name is required');
      } else if (!/^[a-zA-Z\s]+$/.test(inputValue)) {
        setProductNameError('Product Name should only contain spaces and letters');
      } else {
        setProductNameError('');
      }
    };
  
    const handlePriceChange = (e) => {
      const inputValue = e.target.value;
      setPrice(inputValue);
  
      if (!inputValue) {
        setProductPriceError('Product Price is required and should be a number');
      } else if (!/^\d{1,7}$/.test(inputValue)) {
        setProductPriceError('Product Price should be a number not more than 7 characters');
      } else {
        setProductPriceError('');
      }
    };
  
    const handleQuantityChange = (e) => {
      const inputValue = e.target.value;
      setQuantity(inputValue);
  
      if (!inputValue) {
        setProductQuantityError('Product Quantity is required and should be a number');
      } else if (!/^\d{1,7}$/.test(inputValue)) {
        setProductQuantityError('Product Quantity should be a number not more than 7 characters');
      } else {
        setProductQuantityError('');
      }
    };
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
  
    const validateForm = () => {
      let isValid = true;

    if(!description.trim()){
      setDescriptionError("Description is required");
      isValid = false;
    }
    else{
      setDescriptionError('');
    }
      
      // Validate product name
      if (!name.trim()) {
        setProductNameError('Product Name is required');
        isValid = false;
      } else if (!/^[a-zA-Z\s]+$/.test(name)) {
        setProductNameError('Product Name should only contain spaces and letters');
        isValid = false;
      } else {
        setProductNameError('');
      }
  
      // Validate product price
      if (!price) {
        setProductPriceError('Product Price is required and should be a number');
        isValid = false;
      } else if (!/^\d{1,7}$/.test(price)) {
        setProductPriceError('Product Price should be a number not more than 7 characters');
        isValid = false;
      } else {
        setProductPriceError('');
      }
  
      // Validate product quantity
      if (!quantity) {
        setProductQuantityError('Product Quantity is required and should be a number');
        isValid = false;
      } else if (!/^\d{1,7}$/.test(quantity)) {
        setProductQuantityError('Product Quantity should be a number not more than 7 characters');
        isValid = false;
      } else {
        setProductQuantityError('');
      }
  
      return isValid;
    };

    // update
    const updateProduct = async (e) =>{
      e.preventDefault();
      if (!validateForm()) {
        return;
      }
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
    <div className='conatiner-fluid d-flex justify-content-around m-3 p-3 h-100'>
      <div className='col-3'>
        <AdminMenu />
      </div>
      <div className='col-8'>
        <h1 className='home-heading'>Update Product Details</h1>
        <div className='m-1 d-flex align-items-center flex-column'>
          <Select
            bordered={false}
            placeholder="Select Category"
            size='small'
            showSearch
            className='form-select mb-3 w-100'
            onChange={(value) => setCategory(value)}
            value={category.name}
            disabled
          >
            {allCategory?.map(val => (
              <Option key={val._id} value={val._id}>
                {val.name}
              </Option>
            ))}
          </Select>
          <div className='mb-3 w-100'>
            <label className='btn btn-outline-danger col-12'>
              {image ? image.name : " Upload Image" }
            <input type='file' name='image' accept='image/*' onChange={(e) => setimage(e.target.files[0])} hidden disabled/>
            </label>
          </div>
          <div className='mb-3 w-50'>
            {image ? (
              <div className='text-center'>
                <img src={URL.createObjectURL(image)} alt='product_image' height={"100px"} className='img img-responsive'/>
              </div>
            ) : ( <div className='text-center'>
             <img className="card-img-top" src={`/api/product/product-image/${id}`} height="200vw"  alt={name} />
          </div>)}
          </div>
          <div className='mb-3 w-100'>
          <input
                type="text"
                value={name}
                placeholder="Product Name"
                className={`form-control ${productNameError ? 'is-invalid' : ''}`}
                onChange={handleNameChange} // Updated onChange event handler for name input
              />
              {productNameError && <div className="invalid-feedback">{productNameError}</div>}
          </div>
          <div className='mb-3 w-100'>
          <textarea
                type="text"
                value={description}
                placeholder="Product Description"
                className={`form-control ${DescriptionError ? 'is-invalid' : ''}`}
                onChange={handleDescriptionChange}
              />
                 {DescriptionError && <div className="invalid-feedback">{DescriptionError}</div>}
          </div>
          <div className='mb-3 w-100'>
          <input
                type="number"
                value={price}
                placeholder="Product Price"
                className={`form-control ${productPriceError ? 'is-invalid' : ''}`}
                onChange={handlePriceChange} // Updated onChange event handler for price input
              />
              {productPriceError && <div className="invalid-feedback">{productPriceError}</div>}
          </div>
          <div className='mb-3 w-100'>
          <input
                type="number"
                value={quantity}
                placeholder="Product Quantity"
                className={`form-control ${productQuantityError ? 'is-invalid' : ''}`}
                onChange={handleQuantityChange} // Updated onChange event handler for quantity input
              />
              {productQuantityError && <div className="invalid-feedback">{productQuantityError}</div>}
          </div>
          <div className="mb-3 w-100">
              <Select bordered={false} placeholder="Select Shipping "  size="small"  showSearch  className="form-select mb-3"  onChange={(value) => {   setShipping(value);}} value={shipping ? "Yes" : "No"} disabled>
                <Option value="0">No</Option>
                <Option value="1">Yes</Option>
              </Select>
            </div>
            <div className='mb-3'>
              <button className='btn btn-outline-warning m-2' onClick={updateProduct}> Update</button>
              <button className='btn btn-danger m-2' onClick={deleteProduct}> Delete</button>
            </div>
        </div>
      </div>
    </div>
  </Layout>
  )
}

export default UpdateProducts
