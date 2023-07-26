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
  const [secretKeyError, setSecretKeyError] = useState('');
  const [addressError, setaddressError] = useState('');

  const validateEmail = (email) => {
    // email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const validatePassword = (password) => {
    // password regex
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
  };

  const validateName = (name) => {
    // name regex
    const nameRegex = /^[A-Za-z\s]+$/;
    return nameRegex.test(name);
  };

  const validateMobile = (mobile) => {
    // mobile regex
    const mobileRegex = /^[6-9]\d{9}$/;
    return mobileRegex.test(mobile);
  };

  const handleEmailChange = (e) => {
    setemail(e.target.value);
    if (!validateEmail(e.target.value)) {
      setEmailError('Invalid email format');
    } else {
      setEmailError('');
    }
  };

  const handleNameChange = (e) => {
    setname(e.target.value);
    if (!validateName(e.target.value)) {
      setNameError('Name should contain only letters and spaces');
    } else {
      setNameError('');
    }
  };

  const handleSecretKeyChange = (e) => {
    setSecretKey(e.target.value);
    if (!e.target.value.trim()) {
      setSecretKeyError('Secret Key is required');
    } else {
      setSecretKeyError('');
    }
  };

  const handleaddressChange = (e) => {
    setaddress(e.target.value);
    if (!e.target.value.trim()) {
      setaddressError('Address is required');
    } else {
      setaddressError('');
    }
  };

  const handleMobileChange = (e) => {
    setmobile(e.target.value);
    if (!validateMobile(e.target.value)) {
      setMobileError('Invalid mobile format');
    } else {
      setMobileError('');
    }
  };

  const handlePasswordChange = (e) => {
    setpassword(e.target.value);
    if (!validatePassword(e.target.value)) {
      setPasswordError( 'Password should be at least 8 characters and contain at least 1 letter, 1 number, 1 capital letter, and 1 small letter');
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
}

else if (!validateEmail(email)) {
  setEmailError('Invalid email format');
}

if (!name.trim()) {
  setNameError('Name is required');
}

else if (!validateName(name)) {
  setNameError('Invalid Name format');
}

if (!secretKey.trim()) {
  setSecretKeyError('Secret Key is required');
}

if (!address.trim()) {
  setaddressError(' Address is required');
}


if (!mobile.trim()) {
  setMobileError('Mobile is required');
}

else if (!validateMobile(mobile)) {
  setMobileError('Invalid Mobile format');
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
      <div className="register user-account d-flex flex-column">
        <h1 className='home-heading pb-2 pt-2'>REGISTER</h1>
        <form onSubmit={submitForm}>
          <div className="mb-1 register-input">
            <input
   
              onChange={handleNameChange}
              value={name}
              placeholder="Name"
              type="text"
              className={`form-control ${nameError ? 'is-invalid' : ''}`}
              id="exampleInputName1"
            />
            {nameError && <div className="invalid-feedback">{nameError}</div>}
          </div>
          <div className='mb-1 register-input'>
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
          <div className="mb-1 register-input">
            <input

              onChange={handlePasswordChange}
              value={password}
              placeholder="Password"
              type="password"
              className={`form-control ${passwordError ? 'is-invalid' : ''}`}
              id="exampleInputPassword1"
            />
            {passwordError && <div className="invalid-feedback">{passwordError}</div>}
          </div>
          <div className="mb-1 register-input">
            <input
 
              onChange={handleMobileChange}
              value={mobile}
              placeholder="Mobile Number"
              type="number"
              className={`form-control ${mobileError ? 'is-invalid' : ''}`}
              id="exampleInputMobile1"
            />
            {mobileError && <div className="invalid-feedback">{mobileError}</div>}
          </div>
          <div className="mb-1 register-input">
            <input
          
              onChange={handleaddressChange}
              value={address}
              placeholder="Address"
              type="text"
              className={`form-control ${addressError ? 'is-invalid' : ''}`}
              id="exampleInputAddress1"
            />
             {addressError && <div className="invalid-feedback">{addressError}</div>}
          </div>
          <div className="mb-1 register-input">
            <input
        
              onChange={handleSecretKeyChange}
              value={secretKey}
              placeholder="Add a Secret Key"
              type="text"
              className={`form-control ${secretKeyError ? 'is-invalid' : ''}`}
              id="exampleInputSecretKey1"
            />
             {secretKeyError && <div className="invalid-feedback">{secretKeyError}</div>}
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
