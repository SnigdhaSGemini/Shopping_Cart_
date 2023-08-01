import React, { useState } from 'react';
import Layout from '../../Components/Layouts/Layout';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useAuth } from '../../Contexts/Authorization';
import { useCart } from '../../Contexts/Cart';
import { validateEmail, validatePassword } from '../../Components/Validations';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [authorization, setAuthorization] = useAuth();
  const [cart,setCart] = useCart();


     // validation on email change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (!validateEmail(e.target.value)) {
      setEmailError('Invalid email format');
    } else {
      setEmailError('');
    }
  };
      // validation on password change
      const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        if (e.target.value && !validatePassword(e.target.value)) {
          setPasswordError(
            'Password should be at least 8 characters and contain at least 1 letter, 1 number, 1 capital letter, and 1 small letter'
          );
        } else {
          setPasswordError('');
          
        }
      };

  
  // submit form

  const submitForm = async (e) => {
    e.preventDefault();


    if (!email.trim()) {
      setEmailError('Email is required');
    }

    else if (!validateEmail(email)) {
      setEmailError('Invalid email format');
    }

    if(!password.trim()){
      setPasswordError('Password is required')
    }

    else if (password && !validatePassword(password)) {
      setPasswordError(
        'Password should be at least 8 characters and contain at least 1 letter, 1 number, 1 capital letter, and 1 small letter'
      );
    }

    try {
      const res = await axios.post(`/api/auth/login`, { email, password });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setTimeout(() => {
          setAuthorization({
            ...authorization,
            user: res.data.user,
            token: res.data.createToken,
          });
          localStorage.setItem('auth', JSON.stringify(res.data));
          navigate(location.state || '/');
        }, 2000);

         if(localStorage.getItem(res.data.user.name) === null){
          localStorage.setItem("cart",JSON.stringify([]));
          setCart([]);
         }
         else{
          localStorage.setItem("cart",localStorage.getItem(res.data.user.name));
           setCart(JSON.parse(localStorage.getItem(res.data.user.name)));
         }
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error('Invalid User!');
    }
  };

  return (
    <Layout title="Register">
      <div className="register user-account h-100">
        <h1 className='home-heading pt-2'>LOGIN</h1>
        <form onSubmit={submitForm}>
        <div className='mb-3 register-input'>
            <input
              onChange={handleEmailChange}
              value={email}
              placeholder='Email'
              type='email'
              className={`form-control ${emailError ? 'is-invalid' : ''}`}
              id='exampleInputEmail1'
            />
            {emailError && <div className='invalid-feedback'>{emailError}</div>}
          </div>
          <div className='mb-3 register-input'>
            <input
              onChange={handlePasswordChange}
              value={password}
              placeholder='New Password'
              type='password'
              className={`form-control ${passwordError ? 'is-invalid' : ''}`}
              id='exampleInputPassword1'
            />
            {passwordError && <div className='invalid-feedback'>{passwordError}</div>}
          </div>
          <button
            type="button"
            className="btn btn-secondary forgot-password"
            onClick={() => {
              navigate('/forgot-password');
            }}
          >
            Forgot Password
          </button>

          <button type="submit" className="btn btn-warning" >
            Login
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
