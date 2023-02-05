import React, { useState, useEffect } from 'react';

const MovieInfoVertical = (props) => {
  const { title, overview, release_date, poster_path, vote_average } =
    props.movie;
  //   const [img, setImg] = useState({});
  //   const [imgLoaded, setImgLoaded] = useState(false);

  // const [open, setOpen] = useState(false);
  // const [loadedImages, setLoadedImages] = useState(0);
  // const [showComponent, setShowComponent] = useState(false);

  // const handleImagesLoad = () => {
  //   setLoadedImages(loadedImages + 1);
  //   if (loadedImages === movies.length) setShowComponent(true);
  // };

  //   useEffect(() => {
  //     let img = new Image();
  //     img.src = `https://image.tmdb.org/t/p/original${poster_path}`;
  //     img.onload = async () => {
  //       //   await setImg(img);
  //     };
  //   }, [imgLoaded]);

  return (
    <div className='MovieInfoVertical'>
      <img
        id='moviePoster'
        alt='movie poster'
        src={`https://image.tmdb.org/t/p/original${poster_path}`}
        style={{ width: '200px' }}
      ></img>
      <div>{title}</div>
    </div>
  );
};

export default MovieInfoVertical;
