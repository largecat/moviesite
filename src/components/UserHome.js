import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../Firebase';
import { signOut } from 'firebase/auth';
import './styles/UserHome.css';
import { UserContext } from '../UserContext';

const UserHome = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);

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
              <h2>Recently Watched:</h2>
            </div>
            <div className='userHome-list'>
              <h2>Want to Watch:</h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserHome;