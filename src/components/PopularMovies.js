import { Carousel } from 'react-bootstrap';
import React, { useEffect, useMemo, useState } from 'react';
import MovieInfoBoxToggle from './MovieInfoBox';
import './styles/PopularMovies.css';

const API_URL =
  'https://api.themoviedb.org/3/movie/popular?api_key=2125c2b4e21021eaa1aee35d9c0fe191';

const PopularMovies = (props) => {
  const [movies, setMovies] = useState([]);
  const [loadedImages, setLoadedImages] = useState(0);
  const [showComponent, setShowComponent] = useState(false);

  const moviesMemo = useMemo(
    () => ({
      movies,
      setMovies,
    }),
    [movies, setMovies]
  );

  useEffect(() => {
    const movieData = async () => {
      const res = await fetch(API_URL);
      const data = await res.json();
      console.log(data);
      setMovies(data.results);
    };
    movieData();
  }, []);

  return (
    <div className='PopularMovies'>
      {movies.map((movie) => {
        return (
          <MovieInfoBoxToggle
            as={Carousel.Item}
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
