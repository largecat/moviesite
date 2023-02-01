import './App.css';
import React, { useEffect, useState, useMemo } from 'react';
import Home from './components/Home';
import Header from './components/Header';
import PopularPage from './components/PopularPage';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './Firebase';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom';
import UserHome from './components/UserHome';
import Search from './components/Search';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import { UserContext } from './UserContext';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const value = useMemo(
    () => ({ currentUser, setCurrentUser }),
    [currentUser, setCurrentUser]
  );

  // const [movies, setMovies] = useState([]);

  // useEffect(() => {
  //   const movieData = async () => {
  //     const res = await fetch(API_URL);
  //     const data = await res.json();
  //     console.log(data);
  //     setMovies(data.results);
  //   };
  //   movieData();

  //   // fetch(API_URL)
  //   //   .then((res) => res.json())
  //   //   .then((data) => {
  //   //     setMovies(data.results);
  //   //   });
  // }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (credential) => {
      if (credential) {
        setCurrentUser(credential);
      } else {
        setCurrentUser(null);
        navigate('/');
      }
    });
    return () => unsubscribe();
  }, []);

  // function onRenderCallback(
  //   id, // the "id" prop of the Profiler tree that has just committed
  //   phase, // either "mount" (if the tree just mounted) or "update" (if it re-rendered)
  //   actualDuration, // time spent rendering the committed update
  //   baseDuration, // estimated time to render the entire subtree without memoization
  //   startTime, // when React began rendering this update
  //   commitTime, // when React committed this update
  //   interactions // the Set of interactions belonging to this update
  // ) {
  //   console.log('id', id);
  //   console.log('phase', phase);
  //   console.log('actualDuration', actualDuration);
  //   console.log('baseDuration', baseDuration);
  //   console.log('startTime', startTime);
  //   console.log('commitTime', commitTime);
  //   console.log('interactions', interactions);
  // }

  return (
    <div className='App'>
      <UserContext.Provider value={value}>
        <Header />
      </UserContext.Provider>

      <UserContext.Provider value={value}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/userhome' element={<UserHome />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/popular' element={<PopularPage />} />
          <Route path='/search' element={<Search />} />
        </Routes>
      </UserContext.Provider>
    </div>
  );
};

export default App;
