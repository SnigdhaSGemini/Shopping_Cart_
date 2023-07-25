import React, { useState, useEffect } from 'react';
import Layout from '../../Components/Layouts/Layout';
import AdminMenu from '../../Components/Layouts/AdminMenu';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Select } from 'antd';
import { useNavigate } from 'react-router-dom';

// To create dropdown Menu
const { Option } = Select;

const CreateProduct = () => {
  const [allCategory, setAllCategory] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setimage] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [imageNameError, setImageNameError] = useState('');
  const [productNameError, setProductNameError] = useState('');
  const [productPriceError, setProductPriceError] = useState('');
  const [productQuantityError, setProductQuantityError] = useState('');

  const navigate = useNavigate();

  // get all category
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

  // for create product form validation - only desired format accepted
  const validateForm = () => {
    let isValid = true;

    // Validate image
    if (!image) {
      setImageNameError('Image is required');
      isValid = false;
    } else if (!/\.(jpg|jpeg|png)$/.test(image.name.toLowerCase())) {
      setImageNameError('Accepted file formats are only .jpg, .jpeg, .png');
      isValid = false;
    } else {
      setImageNameError('');
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

  // create new product
  const createProduct = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const newData = new FormData();
      newData.append("name", name);
      newData.append("description", description);
      newData.append("price", price);
      newData.append("quantity", quantity);
      newData.append("category", category);
      newData.append("image", image);
      const { data } = await axios.post('/api/product/create-product', newData);
      if (data?.success) {
        toast.success("Product Added!");
        setTimeout(() => { navigate("/dashboard/admin/products") }, 1000)
      } else {
        toast.error(data?.message)
      }
    } catch (err) {
      console.log(err)
      toast.error("Something Went Wrong While Product Creation")
    }
  };

  return (
    <Layout title={"Create Product"}>
      <div className='conatiner-fluid d-flex justify-content-around m-3 p-3'>
        <div className='col-3'>
          <AdminMenu />
        </div>
        <div className='col-8'>
          <h1 className='home-heading'>Create Product</h1>
          <div className='m-1'>
            <Select
              bordered={false}
              placeholder="Select Category"
              size='small'
              showSearch
              className='form-select mb-3'
              onChange={(value) => setCategory(value)}
            >
              {allCategory?.map(val => (
                <Option key={val._id} value={val._id}>
                  {val.name}
                </Option>
              ))}
            </Select>
            <div className="mb-3">
              <label className={`btn btn-outline-danger col-12 ${imageNameError ? 'is-invalid' : ''}`}>
                {image ? image.name : ' Upload Image'}
                <input type="file" name="image" accept=".jpg,.jpeg,.png" onChange={(e) => setimage(e.target.files[0])} hidden />
              </label>
              {imageNameError && <div className="invalid-feedback">{imageNameError}</div>}
            </div>
            <div className="mb-3">
              {image && (
                <div className="text-center">
                  <img src={URL.createObjectURL(image)} alt="product_image" height={"100px"} className="img img-responsive" />
                </div>
              )}
            </div>
            <div className="mb-3">
              <input
                type="text"
                value={name}
                placeholder="Product Name"
                className={`form-control ${productNameError ? 'is-invalid' : ''}`}
                onChange={(e) => setName(e.target.value)}
              />
              {productNameError && <div className="invalid-feedback">{productNameError}</div>}
            </div>
            <div className="mb-3">
              <textarea
                type="text"
                value={description}
                placeholder="Product Description"
                className="form-control"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="number"
                value={price}
                placeholder="Product Price"
                className={`form-control ${productPriceError ? 'is-invalid' : ''}`}
                onChange={(e) => setPrice(e.target.value)}
              />
              {productPriceError && <div className="invalid-feedback">{productPriceError}</div>}
            </div>
            <div className="mb-3">
              <input
                type="number"
                value={quantity}
                placeholder="Product Quantity"
                className={`form-control ${productQuantityError ? 'is-invalid' : ''}`}
                onChange={(e) => setQuantity(e.target.value)}
              />
              {productQuantityError && <div className="invalid-feedback">{productQuantityError}</div>}
            </div>
            <div className="mb-3">
              <Select
                bordered={false}
                placeholder="Select Shipping "
                size="small"
                showSearch
                className="form-select mb-3"
                onChange={(value) => { setShipping(value); }}
              >
                <Option value="0">No</Option>
                <Option value="1">Yes</Option>
              </Select>
            </div>
            <div className="mb-3">
              <button className="btn btn-secondary" onClick={createProduct}>Create</button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
