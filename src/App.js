import './App.css';
import React, { useEffect, useState, useMemo } from 'react';
import Home from './components/Home';
import Header from './components/Header';
import PopularPage from './components/PopularPage';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, doc, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from './Firebase';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom';
import UserHome from './components/UserHome';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import { UserContext } from './UserContext';
import SearchPage from './components/SearchPage';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [watchedMovies, setWatchedMovies] = useState([]);
  const [recentlyWatched, setRecentlyWatched] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const value = useMemo(
    () => ({
      currentUser,
      setCurrentUser,
      watchedMovies,
      setWatchedMovies,
      recentlyWatched,
      setRecentlyWatched,
      favorites,
      setFavorites,
    }),
    [currentUser, watchedMovies, recentlyWatched, favorites]
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (credential) => {
      if (credential) {
        await setCurrentUser(credential);
        console.log(credential.uid);
        let userId = credential.uid;
        let userData = await getData(userId);
      } else {
        setCurrentUser(null);
        navigate('/');
      }
    });
    return () => unsubscribe();
  }, []);

  const getData = async (userId) => {
    const userRef = doc(db, 'users', userId);
    const qFavs = query(
      collection(userRef, 'movies'),
      where('isFavorite', '==', true)
    );

    const favsDb = [];
    const favsSnap = await getDocs(qFavs);
    favsSnap.forEach((doc) => {
      favsDb.push(doc.data());
    });
    const qRecent = query(
      collection(userRef, 'movies'),
      where('recentlyWatched', '==', true)
    );

    const recentsDb = [];
    const recentSnap = await getDocs(qRecent);
    recentSnap.forEach((doc) => {
      recentsDb.push(doc.data());
    });

    setFavorites(favsDb);
    setRecentlyWatched(recentsDb);
  };

  const addMovieToList = (e, userId) => {
    // console.log(listType);
    console.log('addMovieToList');
    console.log('user', currentUser.uid);
    console.log('favs:', favorites);
    console.log('recents:', recentlyWatched);
    // try {
    //   const docRef = doc(db, 'users', userId);
    //   console.log(docRef);
    //   );
    // } catch (error) {
    //   console.log(error.message);
    //   console.log(error.code);
    // }
  };
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

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/userhome' element={<UserHome />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/popular' element={<PopularPage />} />
          <Route
            path='/search'
            element={<SearchPage addMovieToList={addMovieToList} />}
          />
        </Routes>
      </UserContext.Provider>
    </div>
  );
};

export default App;
