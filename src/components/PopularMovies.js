import { Carousel } from 'react-bootstrap';
import React, { useEffect, useMemo, useState } from 'react';
import MovieInfoBoxToggle from './MovieInfoBox';
// import './styles/MovieInfoBox.css';
import './styles/PopularMovies.css';
import { TMDB_API_KEY } from '../api';
import MovieInfoHorizontal from './MovieInfoHorizontal';
import MovieInfoVertical from './MovieInfoVertical';
const API_URL = 'https://api.themoviedb.org/3/movie/popular?api_key=';

const PopularMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loadedImages, setLoadedImages] = useState(0);

  useEffect(() => {
    const movieData = async () => {
      const res = await fetch(`${API_URL}${TMDB_API_KEY}`);
      const data = await res.json();
      console.log('popularmoviespage loaded');
      console.log(data);
      setMovies(data.results);
    };
    movieData();
  }, []);

  useMemo(
    () => ({
      movies,
      setMovies,
    }),
    [movies, setMovies]
  );

  return (
    <div className='PopularMovies'>
      {movies.map((movie) => {
        return (
          <MovieInfoVertical
            // img-style={{ width: '200px' }}
            // as={Carousel.Item}
            movie={movie}
            movies={movies}
            key={movie.id}
            title={movie.title}
            overview={movie.overview}
            release_date={movie.release_date}
            poster_path={movie.poster_path}
            vote_average={movie.vote_average}
          />
        );
      })}
    </div>
  );
};
export default PopularMovies;
