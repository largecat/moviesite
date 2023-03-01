import './App.css';
import React, { useEffect, useState, useMemo } from 'react';
import Home from './components/Home';
import Header from './components/Header';
import PopularPage from './components/PopularPage';
import { onAuthStateChanged } from 'firebase/auth';
import {
  collection,
  doc,
  getDoc,
  query,
  setDoc,
  updateDoc,
  where,
  onSnapshot,
} from 'firebase/firestore';
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
  const [watched, setWatched] = useState([]);
  const [wantToWatch, setWantToWatch] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  const value = useMemo(
    () => ({
      currentUser,
      setCurrentUser,
      favorites,
      setFavorites,
      wantToWatch,
      watched,
    }),
    [currentUser, favorites, wantToWatch, watched]
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (credential) => {
      if (credential) {
        await setCurrentUser(credential);
        let userId = credential.uid;
      } else {
        setCurrentUser(null);
        navigate('/');
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const getData = async () => {
      if (currentUser) {
        const userRef = doc(db, 'users', currentUser.uid);

        const qFavs = query(
          collection(userRef, 'movies'),
          where('isFavorite', '==', true)
        );
        const qWatched = query(
          collection(userRef, 'movies'),
          where('watched', '==', true)
        );
        const qWantToWatch = query(
          collection(userRef, 'movies'),
          where('wantToWatch', '==', true)
        );

        const unsubscribeFavs = onSnapshot(qFavs, (snapshot) => {
          const favsDb = [];
          snapshot.forEach((doc) => {
            favsDb.push(doc.data());
          });
          setFavorites(favsDb);
        });

        const unsubscribeWatched = onSnapshot(qWatched, (snapshot) => {
          const watchedDb = [];
          snapshot.forEach((doc) => {
            watchedDb.push(doc.data());
          });
          setWatched(watchedDb);
        });

        const unsubscribeWantToWatch = onSnapshot(qWantToWatch, (snapshot) => {
          const wantToWatchDb = [];
          snapshot.forEach((doc) => {
            wantToWatchDb.push(doc.data());
          });
          setWantToWatch(wantToWatchDb);
        });

        return () => {
          unsubscribeFavs();
          unsubscribeWatched();
          unsubscribeWantToWatch();
        };
      }
    };
    getData();
  }, [currentUser]);

  const checkAndUpdateMovie = async (e, list, movie) => {
    const movieRef = doc(
      db,
      'users',
      currentUser.uid,
      'movies',
      movie.id.toString()
    );
    const userMoviesRef = collection(db, 'users', currentUser.uid, 'movies');
    const movieDoc = await getDoc(movieRef);

    if (movieDoc.exists()) {
      await updateDoc(movieRef, {
        [list]: !e.target.checked,
      });
    } else {
      await setDoc(doc(userMoviesRef, movie.id.toString()), {
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        isFavorite: false,
        watched: false,
        wantToWatch: false,
      });
      await updateDoc(movieRef, {
        [list]: !e.target.checked,
      });
    }
  };

  return (
    <div className='App'>
      <UserContext.Provider
        value={value}
        checkAndUpdateMovie={checkAndUpdateMovie}
      >
        <Header />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/userhome' element={<UserHome />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/popular' element={<PopularPage />} />
          <Route
            path='/search'
            element={<SearchPage checkAndUpdateMovie={checkAndUpdateMovie} />}
          />
        </Routes>
      </UserContext.Provider>
    </div>
  );
};

export default App;
