import React,{useEffect, useState} from 'react'
import Layout from '../../Components/Layouts/Layout'
import AdminMenu from '../../Components/Layouts/AdminMenu'
import toast from 'react-hot-toast';
import axios from 'axios';
import CategoryForm from '../../Components/Forms/CategoryForm';
import { Modal } from 'antd';

// Create Category Page - To Apply CRUD operations on category

const CreateCategory = () => {
  const [allCategory, setAllCategory] = useState([]);
  const [category,setCategory] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [select , setSelect] = useState(null);
  const [update,setUpdate] = useState("");


  // To create category
  const submitForm = async (e) =>{
    e.preventDefault();
    try{
       const {data} = await axios.post("/api/category/create-category/", {name:category});
       if(data?.success){
        toast.success(`Category " ${category} " is created!`)
        getAll();
       }
       else{
        toast.error(data.message)
       }
    }catch(err){
      console.log(err);
      toast.error("Something Went Wrong while Adding New Category")
    }
  }

  // get all
  const getAll = async () =>{
    try{
      const {data} = await axios.get("/api/category/all-category/");
      if(data?.success){
        setAllCategory(data?.getAllCategory)
      }
    }catch(err){
      console.log(err);
      toast.error("Something Went Wrong In Getting Category");
    }
  }
  useEffect(()=>{
    getAll();
  },[])

  // to toggle Modal
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // To update category
  const updateCategory = async (e) =>{
    e.preventDefault();
    try{
      const {data} = await axios.put(`/api/category//update-category/${select.slug}`,{name: update})
      if(data.success){
        toast.success(data.message);
        setSelect(null);
        setUpdate("");
        setIsModalOpen(false);
        getAll();
      }
      else{
        toast.error(data.message)
      }
    }catch(err){
      toast.error("Something Went Wrong")
    }
  }

  // To delete category
  const deleteCategory = async (slug) =>{
    try{
      const {data} = await axios.delete(`/api/category/delete-category/${slug}`,)
      if(data.success){
        toast.success(data.message);
        getAll();
      }
      else{
        toast.error(data.message)
      }
    }catch(err){
      toast.error("Something Went Wrong")
    }
  }

  return (
    <Layout title={"Create Category"}>
       <div className='conatiner-fluid d-flex justify-content-around m-3 p-3'>
      <div className='col-3'>
       <AdminMenu/>
      </div>
      <div className='col-8'>
       <h1 className='home-heading'>Create Category</h1>
       <div className='p-3'>
        <CategoryForm submitForm={submitForm} newCategory={category} setNewCategory={setCategory}/>
       </div>
       <div>
       <table className="table table-bordered">
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
    {allCategory.map((row) => {
    console.log(row.name); 

    return <><tr><td key={row._id}>{row.name}</td>
    <td>
      <button className='btn btn-outline-secondary update-category' onClick={() => {setIsModalOpen(true); setUpdate(row.name); setSelect(row)}}>Update</button>
      <button className='btn btn-outline-warning update-category' onClick={() =>deleteCategory(row.slug)}>Delete</button>
      </td></tr></>;
  })}
  </tbody>
</table>

       </div>
       <Modal onCancel={() => setIsModalOpen(false)} footer={null} visible={isModalOpen}>
        <CategoryForm newCategory={update} setNewCategory={setUpdate} submitForm={updateCategory}/>
          </Modal>
      </div>
     </div>
    </Layout>
  )
}

export default CreateCategory
