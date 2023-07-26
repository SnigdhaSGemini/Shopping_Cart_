import React, { useEffect, useState } from 'react';
import Layout from '../../Components/Layouts/Layout';
import UserMenu from '../../Components/Layouts/UserMenu';
import { useAuth } from '../../Contexts/Authorization';
import axios from 'axios';
import toast from 'react-hot-toast';

const Account = () => {
  const [authorization, setAuthorization] = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');

   const [nameError, setNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [mobileError, setMobileError] = useState('');
  const [addressError, setaddressError] = useState('');

  useEffect(() => {
    const { name, email, mobile, address } = authorization?.user;
    setName(name);
    setEmail(email);
    setMobile(mobile);
    setAddress(address);
  }, [authorization?.user]);

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


  const handleNameChange = (e) => {
    setName(e.target.value);
    if (!validateName(e.target.value)) {
      setNameError('Name should contain only letters and spaces');
    } else {
      setNameError('');
    }
  };


  const handleaddressChange = (e) => {
    setAddress(e.target.value);
    if (!e.target.value.trim()) {
      setaddressError('Address is required');
    } else {
      setaddressError('');
    }
  };

  const handleMobileChange = (e) => {
    setMobile(e.target.value);
    if (!validateMobile(e.target.value)) {
      setMobileError('Invalid mobile format');
    } else {
      setMobileError('');
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
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


if (!name.trim()) {
  setNameError('Name is required');
}

else if (!validateName(name)) {
  setNameError('Invalid Name format');
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
      const { data } = await axios.put(`/api/auth/account`, {
        name,
        email,
        password,
        mobile,
        address,
      });

      if (data?.error) {
        // Handle the specific error response from the server if needed
        console.log(data?.error);
        return;
      }

      setAuthorization({ ...authorization, user: data?.updateUser });
      let storage = localStorage.getItem('auth');
      storage = JSON.parse(storage);
      storage.user = data.updateUser;
      localStorage.setItem('auth', JSON.stringify(storage));
      console.log('Account Details Updated!');
      toast.success('Account Details Updated!')
    } catch (err) {
      console.log(err);
      console.log('Something Went Wrong!');
      toast.error("Something Went Wrong!")
    }
  };

  return (
    <Layout title={'Account'}>
      <div className='column-fluid  d-flex  '>
        <div className='col-3 m-3 p-3'>
          <UserMenu />
        </div>
        <div className='col-9 user-account register'>
          <div className='register '>
            <h1 className='home-heading mb-3 '>Edit Account Details</h1>
            <form onSubmit={submitForm} >
              <div className='mb-3 register-input'>
                <input
                  onChange={handleNameChange}
                  value={name}
                  placeholder='Name'
                  type='text'
                  className={`form-control ${nameError ? 'is-invalid' : ''}`}
                  id='exampleInputName1'
                />
                {nameError && <div className='invalid-feedback'>{nameError}</div>}
              </div>
              <div className='mb-3 register-input'>
            <input
      
             disabled
              value={email}
              placeholder='Email'
              type='email'
              className={`form-control `}
              id='exampleInputEmail1'
            />
          </div>
          <div className="mb-3 register-input">
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
          <div className="mb-3 register-input">
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
          <div className="mb-3 register-input">
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
              <button type='submit' className='btn btn-warning'>
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Account;
