import React, { useContext, useEffect, useState } from 'react';
import './styles/Home.css';
import imgSrc from '../images/denise-jans-OaVJQZ-nFD0-unsplash.jpg';
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContext';

const Home = () => {
  const { currentUser } = useContext(UserContext);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = imgSrc;
    img.onload = async () => {
      setLoaded(true);
    };
  }, [loaded]);

  return (
    <div className='Home'>
      {loaded ? (
        <div className='homeSignIn-message card bg-dark mx-auto shadow'>
          <img className='card-img' src={imgSrc} alt='theater seats'></img>
          <div className='card-img-overlay d-flex flex-column justify-content-sm-around '>
            <div className='cardveil'>
              <h1 className='card-title'>Welcome to MovieSite</h1>
              <h2 className='card-text'>
                Keep track of and rate the movies you watch
              </h2>
              {!currentUser && (
                <div className='card-btns'>
                  <Link to='/signin'>
                    <button className='btn btn-primary btn-lg'>Sign in</button>
                  </Link>
                  <Link to='/signup'>
                    <button className='btn btn-primary btn-lg'>Sign up</button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className='loading'>
          <h1>Loading...</h1>
        </div>
      )}
    </div>
  );
};

export default Home;
