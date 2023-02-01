import React, { useState } from 'react';
import './styles/SignUp.css';
import { auth, registerNewUser } from '../Firebase';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState('');

  const verifyPw = (password, password2) => {
    return password === password2 ? true : false;
  };

  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (verifyPw(password, password2)) {
      try {
        await registerNewUser(auth, email, password, name);
        navigate('/');
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log('passwords do not match');
    }

    setPassword('');
    setEmail('');
    setName('');
    setPassword2('');
  };

  const handleChange = async (e) => {
    let inputId = e.target.id;
    if (inputId === 'name') {
      setName(e.target.value);
    } else if (inputId === 'email') {
      setEmail(e.target.value);
    } else if (inputId === 'password') {
      setPassword(e.target.value);
    } else if (inputId === 'password2') {
      setPassword2(e.target.value);
    }
  };

  return (
    <form
      className='form-signUp d-flex flex-column justify-content-center mx-auto'
      autoComplete='off'
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(e);
      }}
    >
      <h1>Sign Up</h1>
      <div className='mb-3 group-form form-group-sm'>
        <label htmlFor='name' className='form-label'>
          Name:
        </label>
        <input
          onChange={(e) => {
            handleChange(e);
          }}
          type='name'
          className='form-control'
          id='name'
        ></input>
      </div>
      <div className='mb-3'>
        <label htmlFor='email' className='form-label '>
          Email:
        </label>
        <input
          onChange={(e) => {
            handleChange(e);
          }}
          type='email'
          className='form-control'
          id='email'
          aria-describedby='emailHelp'
        />
        <div id='emailHelp' className='form-text'>
          {' '}
          We'll never share your email with anyone else.{' '}
        </div>
      </div>
      <div className='mb-3'>
        <label htmlFor='password' className='form-label'>
          Password:
        </label>
        <p
          style={{ display: 'inline-block', marginLeft: '20px', color: 'red' }}
        >
          {password && password.length < 8
            ? 'Password must be at least 8 characters long'
            : ''}
        </p>
        <input
          onChange={(e) => {
            handleChange(e);
          }}
          type='password'
          className='form-control'
          id='password'
        />
      </div>
      <div className='mb-3'>
        <label htmlFor='password2' className='form-label'>
          Confirm it:
        </label>
        <input
          onChange={(e) => {
            handleChange(e);
          }}
          type='password'
          className='form-control '
          id='password2'
        />
      </div>
      {/* <div className='mb-3 form-check'>
        <input type='checkbox' className='form-check-input' id='check' />
        <label className='form-check-label' htmlFor='check'>
          I agree (just click it don't worry)
        </label>
      </div> */}

      <button type='submit' className=' btn btn-primary w-50'>
        Submit
      </button>
    </form>
  );
};

export default SignUp;
