import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, signInUser } from '../Firebase';
import { UserContext } from '../UserContext';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInUser(auth, email, password);
      navigate('/userhome');
    } catch (error) {
      setError(error.message);
      console.log(error);
    }

    setEmail('');
    setPassword('');
  };

  const handleChange = (e) => {
    const inputId = e.target.id;
    if (inputId === 'email') {
      setEmail(e.target.value);
    } else if (inputId === 'password') {
      setPassword(e.target.value);
    }
  };

  return (
    <form
      className='form-signUp d-flex flex-column w-50 mx-auto'
      onSubmit={(e) => handleSubmit(e)}
    >
      <h1>Sign In</h1>
      <div className='mb-3'>
        <label htmlFor='email' className='form-label'>
          Email:
        </label>
        <input
          onChange={(e) => handleChange(e)}
          type='email'
          className='form-control'
          id='email'
        ></input>
      </div>
      <div className='mb-3'>
        <label htmlFor='password' className='form-label'>
          Password:
        </label>
        <input
          onChange={(e) => handleChange(e)}
          type='password'
          className='form-control'
          id='password'
        ></input>
      </div>
      <button type='submit' className='btn btn-primary w-50'>
        Submit
      </button>
    </form>
  );
};

export default SignIn;
