import React, { useEffect } from 'react'
import { NavLink , Link} from 'react-router-dom'
import {BsFillHandbagFill} from 'react-icons/bs'
import { useAuth } from '../../Contexts/Authorization'
import useCategory from '../../CustomHooks/useCategory'
import toast from 'react-hot-toast';
import SearchInput from '../Forms/SearchInput';
import { useCart } from '../../Contexts/Cart'
import { Badge } from 'antd';

// Header Component
const Header = () => {
  const [authorization,setAuthorization] = useAuth();
  const [cart,setCart] = useCart();
  const categories = useCategory();

  

  // Logout Functionality
  const logout = ()=>{
    setAuthorization({
      ...authorization,
      user: null,
      token:""
    })
    localStorage.removeItem('auth');
    localStorage.setItem(`${authorization?.user.name}`, localStorage.getItem("cart"));
    localStorage.setItem("cart",JSON.stringify([]));
    setCart([]);
    toast.success("User Logged Out!");
  }
  
  return <>
  <nav className="navbar navbar-expand-lg bg-dark text-light p-3">
  <div className="container-fluid">
    <Link to="/" className="navbar-brand"><BsFillHandbagFill/> Shopping Cart</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <SearchInput/>
        <li className="nav-item">
          <NavLink to="/" className="nav-link" >Home</NavLink>
        </li>
        <li className="nav-item dropdown">
          <Link className="nav-link dropdown-toggle" to={"/categories"} data-bs-toggle="dropdown"> Categories </Link>
          <ul className="dropdown-menu">
          <li>
          <Link className="dropdown-item text-light category-dropdown" to={"/categories"}>All Categories</Link>
        </li>
        {categories?.map((categ) => (
        <li>
          <Link className="dropdown-item text-light category-dropdown" to={`/category/${categ.slug}`}> {categ.name} </Link>
        </li>
                  ))}
                </ul>
              </li>
       {
        !authorization.user ? (<>
         <li className="nav-item">
          <NavLink to="/register" className="nav-link" href="#">Register</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/login" className="nav-link" href="#">Log In</NavLink>
        </li>
        </>) : (<>
          <li className="nav-item dropdown bg-dark text-light">
                    <NavLink className="nav-link dropdown-toggle" href="#" role="button"  data-bs-toggle="dropdown"   style={{ border: "none" }}>
                      {authorization?.user?.name}
                    </NavLink>
                    <ul className="dropdown-menu">
                      <li>
                      <NavLink className="dropdown-item bg-dark text-light nav-link" to={`/dashboard/${authorization?.user?.role === "admin" ? "admin" : "user"}`}>Dashboard</NavLink>
                      </li>
                      <li>
                      <NavLink className="dropdown-item bg-dark text-light nav-link" onClick={logout} to="/login"  href="#">Logout</NavLink>
                      </li>
                    </ul>
                  </li>

          <li className="nav-item">
         
        </li>
        </>)
       }
        <li className="nav-item">
        <Badge count={cart?.length} showZero>
        <NavLink to="/cart" className="nav-link" href="#">Cart</NavLink>
    </Badge>
        </li>
        
      </ul>
      
    </div>
  </div>
</nav>

  </>
}

export default Header
