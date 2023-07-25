import React, { useState } from 'react';
import Layout from '../../Components/Layouts/Layout';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useAuth } from '../../Contexts/Authorization';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [authorization, setAuthorization] = useAuth();

  // validate email
  const validateEmail = (email) => {
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(email);
  };

    // validate password
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
  };

  const validateForm = () => {
    let isValid = true;

    // Validate email
    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Invalid email format');
      isValid = false;
    } else {
      setEmailError('');
    }

    // Validate password
    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (!validatePassword(password)) {
      setPasswordError(
        'Password should be at least 8 characters long and contain at least 1 letter, 1 number, 1 capital letter, and 1 small letter'
      );
      isValid = false;
     } else {
      setPasswordError('');
    }

    return isValid;
  };

  // submit form

  const submitForm = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
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
      <div className="register user-account">
        <h1 className='home-heading'>LOGIN</h1>
        <form onSubmit={submitForm}>
          <div className="mb-3 register-input">
            <input
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="Email"
              type="email"
              className={`form-control ${emailError ? 'is-invalid' : ''}`}
              id="exampleInputEmail1"
            />
            {emailError && <div className="invalid-feedback">{emailError}</div>}
          </div>
          <div className="mb-3 register-input">
            <input
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="Password"
              type="password"
              className={`form-control ${passwordError ? 'is-invalid' : ''}`}
              id="exampleInputPassword1"
            />
            {passwordError && <div className="invalid-feedback">{passwordError}</div>}
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
          <button type="submit" className="btn btn-warning">
            Login
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
