import React from 'react';
import { Form } from 'react-bootstrap';
import './styles/SignUp.css';
import './styles/Search.css';

const Search = (props) => {
  const { handleSearch, handleInputChange } = props;

  return (
    <div className='Search-component'>
      <Form
        className='mb-3 group-form form-group-sm d-flex flex-column'
        onSubmit={(e) => {
          handleSearch(e);
        }}
      >
        <h1>Movie Search</h1>

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
