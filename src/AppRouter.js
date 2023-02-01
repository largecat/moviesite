import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from './UserContext';
import Home from './components/Home';
import PopularPage from './components/PopularPage';
import Search from './components/Search';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import UserHome from './components/UserHome';
import Header from './components/Header';

const AppRouter = (props) => {
  const { user, setUser } = useContext(UserContext);

  return (
    <Router>
      <UserContext.Provider>
        <Header />
        <Routes>
          <Route index path='/' element={<Home />} />
          <Route path='/popular' element={<PopularPage />} />
          <Route path='/search' element={<Search />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route
            path='/userhome'
            element={
              <UserHome
              // value={(user, setUser)}
              />
            }
          />
        </Routes>
      </UserContext.Provider>
    </Router>
  );
};

// // const router = createBrowserRouter([
// //   {
// //     path: '/',
// //     element: <Home />,
// //   },
// // ]);

export default AppRouter;
