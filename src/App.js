import "./App.css";
import api from "./api/axiosConfig";
import { useState, useEffect } from "react";
import Layout from "./components/Layout";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Header from "./components/header/Header";
import Trailer from "./components/trailer/Trailer";
import Reviews from "./components/reviews/Reviews.js";
import NotFound from "./components/notFound/NotFound";
import Auth from "./components/controllers/Auth";

function App() {
  // State management
  const [movies, setMovies] = useState();
  const [movie, setMovie] = useState();
  const [reviews, setReviews] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Initialize isLoggedIn based on localStorage
    return !!localStorage.getItem("token");
  });

  // Fetch movies
  const getMovies = async () => {
    try {
      const response = await api.get("/api/v1/movies");
      setMovies(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Fetch data for a specific movie
  const getMovieData = async (movieId) => {
    try {
      const response = await api.get(`/api/v1/movies/${movieId}`);
      const singleMovie = response.data;
      setMovie(singleMovie);
      setReviews(singleMovie.reviews);
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch movies on component mount
  useEffect(() => {
    getMovies();
  }, []);

  // Sync isLoggedIn with localStorage
  useEffect(() => {
    const tokenExists = !!localStorage.getItem("token");
    if (isLoggedIn !== tokenExists) {
      setIsLoggedIn(tokenExists);
    }
  }, [isLoggedIn]);

  return (
    <div className="App">
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home movies={movies} />} />
          <Route path="/Trailer/:ytTrailerId" element={<Trailer />} />
          <Route
            path="/Reviews/:movieId"
            element={
              <Reviews
                getMovieData={getMovieData}
                movie={movie}
                reviews={reviews}
                setReviews={setReviews}
                isLoggedIn={isLoggedIn}
              />
            }
          />
          <Route
            path="/register"
            element={<Auth isRegister={true} setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route
            path="/login"
            element={<Auth isRegister={false} setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

// import './App.css';
// import api from './api/axiosConfig';
// import {useState, useEffect} from 'react';
// import Layout from './components/Layout';
// import {Routes, Route} from 'react-router-dom';
// import Home from './components/home/Home';
// import Header from './components/header/Header';
// import Trailer from './components/trailer/Trailer';
// import Reviews from './components/reviews/Reviews';
// import NotFound from './components/notFound/NotFound';
// import Auth from './components/controllers/Auth';

// function App() {
//   const [movies, setMovies] = useState();
//   const [movie, setMovie] = useState();
//   const [reviews, setReviews] = useState([]);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const getMovies = async () => {
//     try {
//       const response = await api.get('/api/v1/movies');
//       setMovies(response.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const getMovieData = async (movieId) => {
//     try {
//       const response = await api.get(`/api/v1/movies/${movieId}`);
//       const singleMovie = response.data;
//       setMovie(singleMovie);
//       setReviews(singleMovie.reviews);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     getMovies();
//   }, []);

//   return (
//     <div className="App">
//       <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
//       <Routes>
//         <Route path="/" element={<Layout />}>
//           <Route path="/" element={<Home movies={movies} />} />
//           <Route path="/Trailer/:ytTrailerId" element={<Trailer />} />
//           <Route
//             path="/Reviews/:movieId"
//             element={
//               <Reviews
//                 getMovieData={getMovieData}
//                 movie={movie}
//                 reviews={reviews}
//                 setReviews={setReviews}
//                 isLoggedIn={isLoggedIn}
//               />
//             }
//           />
//           <Route path="/register" element={<Auth isRegister={true} />} />
//           <Route
//             path="/login"
//             element={<Auth isRegister={false} setIsLoggedIn={setIsLoggedIn} />}
//           />
//           <Route path="*" element={<NotFound />} />
//         </Route>
//       </Routes>
//     </div>
//   );
// }

// export default App;