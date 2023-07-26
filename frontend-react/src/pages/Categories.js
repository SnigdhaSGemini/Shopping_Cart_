import React, {useState, useEffect} from 'react'
import Layout from '../Components/Layouts/Layout'
import useCategory from '../CustomHooks/useCategory';
import { Link } from 'react-router-dom';

// all categories page
const Categories = () => {
    const categories = useCategory()
  return (
    <Layout title={"All Categories"}>
      <div className='d-flex justify-content-around align-items-center h-100 flex-wrap p-5 all-category'>
        {categories.map(categ =>(
             <div className="col-4 text-center m-3" key={categ._id}>
                <Link to={`/category/${categ.slug}`} className='btn btn-outline-primary pt-3 pb-3 category category-name'>{categ.name}</Link>
         </div>
        ))}
      </div>
    </Layout>
  )
}

export default Categories
