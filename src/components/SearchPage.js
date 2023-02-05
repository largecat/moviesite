import React, { useMemo, useState } from 'react';
import Search from './Search';
import { TMDB_API_KEY } from '../api';
import MovieInfoBoxToggle from './MovieInfoBox';
import './styles/SearchPage.css';
import MovieInfoHorizontal from './MovieInfoHorizontal';

const API_URL = 'https://api.themoviedb.org/3/search/movie?';

const SearchPage = () => {
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
    // const searchValue = e.target.searchInput.value;
    console.log(searchQ);
    if (searchQ) {
      try {
        let res = await fetch(
          `${API_URL}api_key=${TMDB_API_KEY}&query=${searchQ}`
        );
        let data = await res.json();

        let resArray = data.results.map((item) => {
          return item;
        });
        setResults(resArray);
        console.log(resArray);
        console.log(data.results);
      } catch (error) {
        console.log(error.code);
        console.log(error.message);
      }
      e.target.reset();
    }
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
        {searchQ && <h4>Results for "{searchQ}"</h4>}
        {results.map((movie) => {
          return (
            // <div key={movie.id}>
            <MovieInfoHorizontal
              key={movie.id}
              movie={movie}
              // movies={movies}
              // key={movie.id}
              title={movie.title}
              overview={movie.overview}
              release_date={movie.release_date}
              poster_path={movie.poster_path}
              vote_average={movie.vote_average}
            />
            // </div>
          );
          //   return <p key={item.id}>{item.original_title}</p>;
        })}
      </div>
    </div>
  );
};
export default SearchPage;
