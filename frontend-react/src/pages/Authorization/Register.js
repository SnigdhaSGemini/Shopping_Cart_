import React, { useState } from 'react';
import Layout from '../../Components/Layouts/Layout';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [mobile, setmobile] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [address, setaddress] = useState('');

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [mobileError, setMobileError] = useState('');

  // validate form
  const validateForm = () => {
    let isValid = true;

    // Validate name
    if (!name) {
      setNameError('Name is required');
      isValid = false;
    } else if (!/^[A-Za-z\s]+$/.test(name)) {
      setNameError('Name should contain only letters and spaces');
      isValid = false;
    } else {
      setNameError('');
    }

    // Validate email
    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError('Invalid email format');
      isValid = false;
    } else {
      setEmailError('');
    }

    // Validate mobile
    if (!mobile) {
      setMobileError('Mobile Number is required');
      isValid = false;
    } else if (!/^[6-9]\d{9}$/.test(mobile)) {
      setMobileError('Invalid mobile format');
      isValid = false;
    } else {
      setMobileError('');
    }

    // Validate password
    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password)) {
      setPasswordError(
        'Password should be at least 8 characters long and contain at least 1 character, 1 number, 1 capital letter, and 1 small letter'
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
      const res = await axios.post(`/api/auth/register`, {
        name,
        email,
        password,
        mobile,
        secretKey,
        address,
      });
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
    <Layout title="Register">
      <div className="register user-account">
        <h1 className='home-heading'>REGISTER</h1>
        <form onSubmit={submitForm}>
          <div className="mb-3 register-input">
            <input
              required
              onChange={(e) => setname(e.target.value)}
              value={name}
              placeholder="Name"
              type="text"
              className={`form-control ${nameError ? 'is-invalid' : ''}`}
              id="exampleInputName1"
            />
            {nameError && <div className="invalid-feedback">{nameError}</div>}
          </div>
          <div className="mb-3 register-input">
            <input
              required
              onChange={(e) => setemail(e.target.value)}
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
              onChange={(e) => setpassword(e.target.value)}
              value={password}
              placeholder="Password"
              type="password"
              className={`form-control ${passwordError ? 'is-invalid' : ''}`}
              id="exampleInputPassword1"
            />
            {passwordError && <div className="invalid-feedback">{passwordError}</div>}
          </div>
          <div className="mb-3 register-input">
            <input
              required
              onChange={(e) => setmobile(e.target.value)}
              value={mobile}
              placeholder="Mobile Number"
              type="number"
              className={`form-control ${mobileError ? 'is-invalid' : ''}`}
              id="exampleInputMobile1"
            />
            {mobileError && <div className="invalid-feedback">{mobileError}</div>}
          </div>
          <div className="mb-3 register-input">
            <input
              required
              onChange={(e) => setaddress(e.target.value)}
              value={address}
              placeholder="Address"
              type="text"
              className="form-control"
              id="exampleInputAddress1"
            />
          </div>
          <div className="mb-3 register-input">
            <input
              required
              onChange={(e) => setSecretKey(e.target.value)}
              value={secretKey}
              placeholder="Add a Secret Key"
              type="text"
              className="form-control"
              id="exampleInputSecretKey1"
            />
          </div>
          <button type="submit" className="btn btn-warning">
            Register
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
