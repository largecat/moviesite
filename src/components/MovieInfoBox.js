import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/MovieInfoBox.css';

const MovieInfoBoxToggle = (props) => {
  const { overview, release_date, poster_path, vote_average } = props.movie;
  // const [open, setOpen] = useState(false);
  // const [loadedImages, setLoadedImages] = useState(0);
  // const [showComponent, setShowComponent] = useState(false);

  // const handleImagesLoad = () => {
  //   setLoadedImages(loadedImages + 1);
  //   if (loadedImages === movies.length) setShowComponent(true);
  // };

  return (
    <div className='dropdown MovieInfoBoxToggle'>
      <img
        id='moviePosterButton'
        alt='movie poster'
        src={`https://image.tmdb.org/t/p/w500${poster_path}`}
        data-toggle='dropdown'
        style={{ width: '200px' }}
      ></img>
      <div
        className='dropdown-menu'
        aria-labelledby='moviePosterButton'
        style={{ width: '200px' }}
      >
        <div className='dropdown-item'>
          <p>score: {vote_average}</p>
          <p>released: {release_date}</p>
          <p className='overview'>{overview}</p>
        </div>
      </div>
    </div>
  );
};
export default MovieInfoBoxToggle;
