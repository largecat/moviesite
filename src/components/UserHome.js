import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../Firebase';
import { signOut } from 'firebase/auth';
import './styles/UserHome.css';
import { UserContext } from '../UserContext';
import MovieInfoVertical from './MovieInfoVertical';

const UserHome = () => {
  const { currentUser, setCurrentUser, favorites, watched, wantToWatch } =
    useContext(UserContext);

  let navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      await signOut(auth).then(async () => {
        setCurrentUser(null);
        console.log('user signed out');
        navigate('/');
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='UserHome'>
      {currentUser && (
        <>
          <div className='userHome-header'>
            <div className='userHome-userHeader'>
              <div className='userHome-userImage'></div>
              <div className='homeSignIn-message'>
                hello, {currentUser ? currentUser.displayName : 'User'}!
              </div>
            </div>
            <button
              className='btn btn-sm btn-warning'
              style={{
                margin: '0 0 0 0',
              }}
              onClick={handleLogOut}
            >
              Sign Out
            </button>
          </div>
          <div className='userHome-main'>
            <div className='userHome-list'>
              <h2>Favorites:</h2>
              <div className='home-movieContainer d-flex'>
                {favorites
                  ? favorites.map((movie, index) => {
                      return (
                        <MovieInfoVertical
                          key={index}
                          movie={movie}
                          title={movie.title}
                          overview={movie.overview}
                          release_date={movie.release_date}
                          poster_path={movie.poster_path}
                          vote_average={movie.vote_average}
                        />
                      );
                    })
                  : console.log('no favorites')}
              </div>
            </div>
            <div className='userHome-list'>
              <h2>Watched:</h2>
              <div className='home-movieContainer d-flex'>
                {watched
                  ? watched.map((movie, index) => {
                      return (
                        <MovieInfoVertical
                          key={index}
                          movie={movie}
                          title={movie.title}
                          overview={movie.overview}
                          release_date={movie.release_date}
                          poster_path={movie.poster_path}
                          vote_average={movie.vote_average}
                        />
                      );
                    })
                  : console.log('nothing watched')}
              </div>
            </div>
            <div className='userHome-list'>
              <h2>To Watch:</h2>
              <div className='home-movieContainer d-flex'>
                {console.log(wantToWatch)}
                {wantToWatch
                  ? wantToWatch.map((movie, index) => {
                      return (
                        <MovieInfoVertical
                          key={index}
                          movie={movie}
                          title={movie.title}
                          overview={movie.overview}
                          release_date={movie.release_date}
                          poster_path={movie.poster_path}
                          vote_average={movie.vote_average}
                        />
                      );
                    })
                  : console.log('nothing to watch')}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserHome;
