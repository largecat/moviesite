import React, { useContext } from 'react';
import { Card, Header, Form } from 'react-bootstrap';
import { UserContext } from '../UserContext';

const MovieInfoHorizontal = (props) => {
  const { currentUser, recentlyWatched, setRecentlyWatched } =
    useContext(UserContext);
  const {
    id,
    isFavorite,
    onFav,
    title,
    overview,
    release_date,
    poster_path,
    vote_average,
    addMovieToList,
  } = props;

  const posterSrcLink = 'https://image.tmdb.org/t/p/original';

  const isWatched = recentlyWatched.some((movie) => {
    console.log(movie.id);
    return movie.id === id;
  });

  const handleCheck = (e, title, poster_path) => {
    console.log('checkedd');
    console.log(e.target.checked);
    console.log(title);
    console.log(poster_path);
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
            id='seen-switch'
            onChange={(e) => {
              addMovieToList();
            }}
            label={isWatched ? 'already seen' : 'already seen it?'}
            checked={isWatched}
            // checked={isRecentlyWatched ? true : false}
            role='switch'
          />
          <Form.Check
            type='switch'
            id='wantto-switch'
            label='wanna watch?'
            role='switch'
          />
        </div>
      </Card.Body>
    </Card>
  );
};

export default MovieInfoHorizontal;
