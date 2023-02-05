import React from 'react';
import './styles/PopularPage.css';
import PopularMovies from './PopularMovies';

const PopularPage = React.memo(() => {
  return (
    <div className='PopularPage'>
      <h1>Popular now</h1>
      <PopularMovies />
    </div>
  );
});
export default PopularPage;
