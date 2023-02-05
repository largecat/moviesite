import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import './styles/SignUp.css';
import './styles/Search.css';
// import { TMDB_API_KEY } from '../api';

const Search = (props) => {
  const { handleSearch, results, setResults, handleInputChange } = props;
  // const [results, setResults] = useState([]);

  // const handleSearch = async (e) => {
  //   e.preventDefault();
  //   const searchValue = e.target.searchInput.value;
  //   console.log(e.target);
  //   console.log(searchValue);

  //   if (searchValue) {
  //     try {
  //       let res = await fetch(
  //         `${API_URL}api_key=${TMDB_API_KEY}&query=${searchValue}`
  //       );
  //       let data = await res.json();

  //       console.log(data);
  //     } catch (error) {
  //       console.log(error.code);
  //       console.log(error.message);
  //     }
  //   }
  // };

  return (
    <div className='Search-component'>
      <Form
        className='mb-3 group-form form-group-sm d-flex flex-column'
        onSubmit={(e) => {
          handleSearch(e);
        }}
      >
        <h1>Movie Search</h1>
        {/* <label htmlFor='movieSearch' className='form-label'>
          Search for a movie
        </label> */}
        <div className='d-flex'>
          <input
            id='searchInput'
            className='form-control'
            type='search'
            placeholder='Search for a movie'
            onChange={(e) => handleInputChange(e)}
          />
          <button type='submit' className='btn btn-primary'>
            Search
          </button>
        </div>
      </Form>
    </div>
  );
};

export default Search;
