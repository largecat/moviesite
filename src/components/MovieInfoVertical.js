import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
// import './styles/MovieInfoBox.css';

const MovieInfoVertical = (props) => {
  const { title, overview, release_date, poster_path, vote_average, imgStyle } =
    props.movie;

  const [img, setImg] = useState('');
  const [imgLoaded, setImgLoaded] = useState(false);
  const posterSrcLink = 'https://image.tmdb.org/t/p/original';

  useEffect(() => {
    let img = new Image();
    img.src = `${posterSrcLink}${poster_path}`;
    img.onload = async () => {
      await setImg(img);
      setImgLoaded(true);
    };
  }, [imgLoaded, poster_path]);

  return (
    <Card className='MovieInfoVertical'>
      <Card.Img id='moviePoster' src={`${posterSrcLink}${poster_path}`} />
    </Card>

    // style={`${
    //   'width ='(
    //     target.parentElement.parentElement.className === 'PopularMovies'
    //   )
    //     ? '200px'
    //     : '300px'
    // }`}
    //   ></Card.Img>
    // </Card>
    // <div className='MovieInfoVertical'>
    //   <img
    //     id='moviePoster'
    //     alt='movie poster'
    //     src={img}
    //     // src={`https://image.tmdb.org/t/p/original${poster_path}`}

    //     style={{ width: '200px' }}
    //   ></img>
    //   <div>{title}</div>
    // </div>
  );
};

export default MovieInfoVertical;
