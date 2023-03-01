import React, { useMemo, useState } from 'react';
import Search from './Search';
import { TMDB_API_KEY } from '../api';
import './styles/SearchPage.css';
import MovieInfoHorizontal from './MovieInfoHorizontal';
import { updateUserData } from '../Firebase';
const API_URL = 'https://api.themoviedb.org/3/search/movie?';

const SearchPage = (props) => {
  const { toggleChecked, checkAndUpdateMovie } = props;

  const [results, setResults] = useState([]);
  const [searchQ, setSearchQ] = useState('');

  useMemo(
    () => ({
      results,
      setResults,
    }),
    [results, setResults]
  );

  const handleInputChange = (e) => {
    setSearchQ(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      let res = await fetch(
        `${API_URL}api_key=${TMDB_API_KEY}&query=${searchQ}`
      );
      let data = await res.json();

      let resArray = data.results.map((item) => {
        return item;
      });
      setResults(resArray);
    } catch (error) {
      console.log(error.code);
      console.log(error.message);
    }
    e.target.reset();
  };

  return (
    <div className='SearchPage'>
      <Search
        handleSearch={handleSearch}
        handleInputChange={handleInputChange}
        results={results}
        setResults={setResults}
      />

      <div className='results-display'>
        {results.length > 0 && <h4>Results for "{searchQ}"</h4>}
        {results.map((movie) => {
          return (
            <MovieInfoHorizontal
              key={movie.id}
              movie={movie}
              id={movie.id}
              title={movie.title}
              overview={movie.overview}
              release_date={movie.release_date}
              poster_path={movie.poster_path}
              vote_average={movie.vote_average}
              isFavorite={movie.isFavorite}
              checkAndUpdateMovie={checkAndUpdateMovie}
            />
          );
        })}
      </div>
    </div>
  );
};
export default SearchPage;
