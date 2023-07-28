import Layout from '../Components/Layouts/Layout';
import React from 'react'
import { useSearch } from '../Contexts/Search';
import { useNavigate } from 'react-router-dom';

// product displayed after search page
const SearchProduct = () => {
    const [vals, setVals] = useSearch();
    const navigate = useNavigate();
  return (
    <Layout title={"Search Products"}>
      <div className='text-center h-100'>
        <h1 className='home-heading pt-4'>Search Results</h1>
        <h6 className='found-result mb-4'>{vals?.results.length < 1 ? "No Products Found" : `Found ${vals?.results.length} matching products`}</h6>
       <div className='d-flex flex-wrap justify-content-around'>
       {vals?.results.map(prod =>(<>
        <div className="card m-1 col-5"  >
  <img className="card-img-top" src={`/api/product/product-image/${prod._id}`} alt={prod.name} />
  <div className="card-body">
    <h5 className="card-title">{prod.name}</h5>
    <p className="card-text">{prod.description.substring(0,25)} ...</p>
    <p className="card-price">$ {prod.price}</p>
  <div>
  <button href="#" className="btn btn-outline-secondary m-1" onClick={()=> navigate(`/product-details/${prod.slug}`)}>See More</button>
</div>

  </div>
</div>
</>
       ))}
       </div>
        </div>
    </Layout>
  )
}

export default SearchProduct
