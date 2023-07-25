import React, { useState } from 'react';
import Layout from '../../Components/Layouts/Layout';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (email) => {
    // email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    // Password should be at least 8 characters long and contain at least 1 letter, 1 number, 1 capital letter, and 1 small letter
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
  };

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
    setNewPassword(e.target.value);
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

    // all fields required validation
    if (!email.trim()) {
      setEmailError('Email is required');
      return;
    }

    if (!validateEmail(email)) {
      setEmailError('Invalid email format');
      return;
    }

    if (newPassword && !validatePassword(newPassword)) {
      setPasswordError(
        'Password should be at least 8 characters and contain at least 1 letter, 1 number, 1 capital letter, and 1 small letter'
      );
      return;
    }

    try {
      const res = await axios.post(`/api/auth/forgot-password`, { email, newPassword, secretKey });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error('Something Went Wrong!');
    }
  };

  return (
    <Layout title={'Forgot Password'}>
      <div className='register user-account'>
        <h1 className='home-heading'>RESET PASSWORD</h1>
        <form onSubmit={submitForm}>
          <div className='mb-3 register-input'>
            <input
              required
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
              required
              onChange={(e) => setSecretKey(e.target.value)}
              value={secretKey}
              placeholder='Secret Key'
              type='text'
              className='form-control'
              id='exampleInputSecretKey1'
            />
          </div>
          <div className='mb-3 register-input'>
            <input
              required
              onChange={handlePasswordChange}
              value={newPassword}
              placeholder='New Password'
              type='password'
              className={`form-control ${passwordError ? 'is-invalid' : ''}`}
              id='exampleInputPassword1'
            />
            {passwordError && <div className='invalid-feedback'>{passwordError}</div>}
          </div>
          <button type='submit' className='btn btn-warning'>
            Reset
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
