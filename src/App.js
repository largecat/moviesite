import './App.css';
import React, { useEffect, useState, useMemo } from 'react';
import Home from './components/Home';
import Header from './components/Header';
import PopularPage from './components/PopularPage';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, doc, getDoc, getDocs, query } from 'firebase/firestore';
import { auth, db } from './Firebase';
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
    const unsubscribe = onAuthStateChanged(auth, async (credential) => {
      if (credential) {
        await setCurrentUser(credential);
        console.log(credential.uid);
        let userId = credential.uid;
        let userData = await getData(userId);
        // console.log(userData);
      } else {
        setCurrentUser(null);
        navigate('/');
      }
    });
    return () => unsubscribe();
  }, []);

  const getData = async (userId) => {
    const docRef = doc(db, 'users', userId);

    const favRef = collection(db, 'users', userId, 'favorites');
    const favDocs = await getDocs(favRef);
    // const docSnap = await getDoc(docRef);

    const favsDb = [];
    favDocs.forEach((item) => {
      favsDb.push(item.data());
    });

    const recentRef = collection(db, 'users', userId, 'recentlyWatched');
    const recentDocs = await getDocs(recentRef);
    const recentsDb = [];
    recentDocs.forEach((item) => {
      recentsDb.push(item.data());
    });

    // const favsDb = colDocs.forEach((item) => {
    //   console.log(item.data());
    // });

    setFavorites(favsDb);
    setRecentlyWatched(recentsDb);
    // if (colDocs.exists()) {
    //   const userData = docSnap.data();
    //   console.log(docSnap.data());
    //   const favs = userData.favorites;

    //   // setRecentlyWatched([...recent]);

    //   console.log(favs);
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
      {console.log(favorites)}
      {console.log(recentlyWatched)}
      {/* <UserContext.Provider value={value}> */}
      <UserContext.Provider value={value}>
        <Header />
        {/* </UserContext.Provider> */}

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/userhome' element={<UserHome />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/popular' element={<PopularPage />} />
          <Route path='/search' element={<SearchPage />} />
        </Routes>
      </UserContext.Provider>
    </div>
  );
};

export default App;
