import React, { useContext } from 'react';
import { Card, Form } from 'react-bootstrap';
import { UserContext } from '../UserContext';

const MovieInfoHorizontal = (props) => {
  const { watched, favorites, wantToWatch } = useContext(UserContext);
  const {
    movie,
    id,
    title,
    overview,
    release_date,
    poster_path,
    vote_average,
    checkAndUpdateMovie,
  } = props;

  const posterSrcLink = 'https://image.tmdb.org/t/p/original';

  const isWatched = watched.some((movie) => {
    return movie.id === id;
  });

  const isFav = favorites.some((movie) => {
    return movie.id === id;
  });

  const isWantToWatch = wantToWatch.some((movie) => {
    return movie.id === id;
  });

  const handleCheck = (e) => {
    if (e.target.id === 'watched-switch') {
      checkAndUpdateMovie(e, 'watched', movie);
    } else if (e.target.id === 'wantto-switch') {
      checkAndUpdateMovie(e, 'wantToWatch', movie);
    } else if (e.target.id === 'fav-switch') {
      checkAndUpdateMovie(e, 'isFavorite', movie);
    }
  };

  return (
    <Card className='MovieInfoHorizontal d-flex flex-row' width='200px'>
      <Card.Header className=' d-flex flex-column align-content-center'>
        <Card.Title>
          {title} - {`(${release_date})`}
        </Card.Title>
        {poster_path ? (
          <Card.Img
            id='moviePoster'
            alt='movie poster'
            src={`${posterSrcLink}${poster_path}`}
          ></Card.Img>
        ) : (
          <div style={{ width: '200px' }}>No Poster</div>
        )}
      </Card.Header>
      <Card.Body
        className='d-flex flex-column justify-content-between'
        align-items='flex-end'
      >
        <div>{overview}</div>

        <div className='d-flex flex-column align-items-end'>
          <Form.Check
            type='switch'
            id='watched-switch'
            onChange={(e) => {
              handleCheck(e);
            }}
            label={isWatched ? 'already seen' : 'already seen it?'}
            checked={isWatched}
            role='switch'
          />
          <Form.Check
            type='switch'
            id='wantto-switch'
            onChange={(e) => {
              handleCheck(e);
            }}
            label={isWantToWatch ? 'on your watch list' : 'wanna watch?'}
            checked={isWantToWatch}
            role='switch'
          />
          <Form.Check
            type='switch'
            id='fav-switch'
            onChange={(e) => {
              handleCheck(e);
            }}
            label={isFav ? 'one of your faves!' : 'add to favorites?'}
            checked={isFav}
            role='switch'
          />
        </div>
      </Card.Body>
    </Card>
  );
};

export default MovieInfoHorizontal;
