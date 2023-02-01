import React from 'react';

const Search = () => {
  return (
    <div>
      <h1>Movie Search</h1>
      <label htmlFor='movieSearch'>Search for a movie</label>
      <input type='text' placeholder='Search for a movie' />
      <button type='submit' className='btn btn-primary'>
        submit
      </button>
    </div>
  );
};

export default Search;
