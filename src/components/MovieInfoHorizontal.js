import React from 'react';
import { Card, Header, Form } from 'react-bootstrap';

const MovieInfoHorizontal = (props) => {
  const { title, overview, release_date, poster_path, vote_average } =
    props.movie;

  const posterSrcLink = 'https://image.tmdb.org/t/p/original';

  const handleCheck = (e, title, poster_path) => {
    console.log('checkedd');
    console.log(e.target.checked);
    console.log(title);
    console.log(poster_path);
  };

  return (
    <Card className='MovieInfoHorizontal d-flex flex-row'>
      <Card.Header className=' d-flex flex-column align-content-center'>
        <Card.Title>
          {title} - {`(${release_date})`}
        </Card.Title>
        {poster_path ? (
          <Card.Img
            id='moviePoster'
            alt='movie poster'
            src={`${posterSrcLink}${poster_path}`}
            style={{ width: '200px' }}
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
            onChange={(e) => handleCheck(e, title, poster_path)}
            type='switch'
            role='switch'
            id='seen-switch'
            label='Already seen it?'
          />
          <Form.Check
            onChange={(e) => handleCheck(e)}
            type='switch'
            role='switch'
            id='wantto-switch'
            label='Wanna see?'
          />
        </div>
        {/* <Form.Check type='switch' id='custom-switch' label='Already seen it?' /> */}
      </Card.Body>
    </Card>
  );
};

export default MovieInfoHorizontal;
