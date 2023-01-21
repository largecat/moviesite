import './App.css';
import React, { useEffect, useState } from 'react';
import MovieInfoBox from './components/MovieInfoBox';
import Home from './components/Home';
import Header from './components/Header';
import PopularMovies from './components/PopularMovies';
import RouteSwitch from './RouteSwitch';

function App() {
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

  return (
    <div className='App'>
      <Header />
      <RouteSwitch />

      {/* <PopularMovies /> */}
    </div>
  );
}

export default App;
