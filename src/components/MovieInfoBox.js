import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/MovieInfoBox.css';

const MovieInfoBoxToggle = (props) => {
  const { title, overview, release_date, poster_path, vote_average } =
    props.movie;

  const [img, setImg] = useState({});
  const [imgLoaded, setImgLoaded] = useState(false);

  // const [open, setOpen] = useState(false);
  // const [loadedImages, setLoadedImages] = useState(0);
  // const [showComponent, setShowComponent] = useState(false);

  // const handleImagesLoad = () => {
  //   setLoadedImages(loadedImages + 1);
  //   if (loadedImages === movies.length) setShowComponent(true);
  // };

  useEffect(() => {
    let img = new Image();
    img.src = `https://image.tmdb.org/t/p/original${poster_path}`;
    img.onload = async () => {
      await setImg(img);
      setImgLoaded(true);
    };
  }, [imgLoaded, poster_path]);

  return (
    <div className='MovieInfoBoxToggle d-flex flex-column'>
      <h4>{title}</h4>
      {/* {console.log(img)} */}
      {/* {img ? (
        
      ) : (
        // <img src={img} alt='img' onLoad={() => setImgLoaded(true)}></img>
        <></>
      )
      } */}
    </div>
    // <div>
    // {
    /* <img
          width={200}
          height={200}
          id='moviePosterButton'
          alt='movie poster'
          src={`https://image.tmdb.org/t/p/original${poster_path}`}
        ></img> */
    // {/* <div className='mov-info'>
    // <p></p>
    // </div> */}
  );

  // return (
  //   <div className='dropdown MovieInfoBoxToggle'>
  //     <img
  //       id='moviePosterButton'
  //       alt='movie poster'
  //       src={`https://image.tmdb.org/t/p/original${poster_path}`}
  //       data-toggle='dropdown'
  //       style={{ width: '200px' }}
  //     ></img>
  //     <div
  //       className='dropdown-menu'
  //       aria-labelledby='moviePosterButton'
  //       style={{ width: '200px' }}
  //     >
  //       <div className='dropdown-item'>
  //         <p>score: {vote_average}</p>
  //         <p>released: {release_date}</p>
  //         <p className='overview'>{overview}</p>
  //       </div>
  //     </div>
  //   </div>
  // );
};
export default MovieInfoBoxToggle;
