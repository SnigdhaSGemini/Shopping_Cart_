import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ContactUs from "./pages/ContactUs";
import About from "./pages/About";
import PageNotFound from "./pages/PageNotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Register from "./pages/Authorization/Register";
import 'react-toastify/dist/ReactToastify.css';
import Login from "./pages/Authorization/Login";
import Dashboard from "./pages/Users/Dashboard";
import PrivateRoute from "./Routes/Private";
import ForgotPassword from "./pages/Authorization/ForgotPassword";
import AdminRoute from "./Routes/Admin";
import DashboardA from './pages/Admin/DashboardA';
import CreateCategory from "./pages/Admin/CreateCategory";
import CreateProduct from "./pages/Admin/CreateProduct";
import Orders from "./pages/Users/Orders";
import Account from "./pages/Users/Account";
import Products from "./pages/Admin/Products";
import UpdateProducts from "./pages/Admin/UpdateProducts";
import SearchProduct from "./pages/SearchProduct";
import ProductDetails from "./pages/ProductDetails";
import Categories from "./pages/Categories";
import CategoryFilter from "./pages/CategoryFilter";
import Cart from "./Components/Cart";
import EditOrders from "./pages/Admin/EditOrders";
function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/cart" element={<Cart/>}/>
      <Route path="/product-details/:slug" element={<ProductDetails/>}/>
      <Route path="/categories" element={<Categories/>}/>
      <Route path="/category/:slug" element={<CategoryFilter/>}/>
      <Route path="/search" element={<SearchProduct/>}/>
     <Route path="/dashboard" element={<PrivateRoute/>}>
      <Route path="user" element={<Dashboard/>}/>
      <Route path="user/orders" element={<Orders/>}/>
      <Route path="user/account" element={<Account/>}/>
     </Route>
     <Route path="/dashboard" element={<AdminRoute/>}>
      <Route path="admin" element={<DashboardA/>}/>
      <Route path="admin/create-category" element={<CreateCategory/>}/>
      <Route path="admin/create-product" element={<CreateProduct/>}/>
      <Route path="admin/update-product/:slug" element={<UpdateProducts/>}/>
      <Route path="admin/products" element={<Products/>}/>
      <Route path="admin/orders" element={<EditOrders/>}/>
     </Route>
      <Route path="/register" element={<Register/>}/>
      <Route path="/forgot-password" element={<ForgotPassword/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/contact-us" element={<ContactUs/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="*" element={<PageNotFound/>}/>
      <Route path="/privacy-policy" element={<PrivacyPolicy/>}/>
    </Routes>
    </>
  );
}

export default App;
