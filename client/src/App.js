import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';

import Header from './components/header/Header';
import Home from './pages/home/home';
import MovieList from './components/movieList/movieList';
import Movie from './pages/movieDetail/movie';
import UserProfile from './pages/userProfile/userProfile';
import Favorites from './pages/favorites/favorites';
import LoginPage from './pages/loginPage/loginPage';

function App() {

    const [loggedIn, setLoggedIn] = useState(false);
    const [validated, setValidated] = useState(false);

    return (
        <div className="App">
            <Router>
                <Header
                    loggedIn={ loggedIn }
                    validated={ validated }
                />
                <Routes>
                    <Route path="home" index element={ <Home/> }></Route>
                    <Route path="movie/:id" element={ <Movie/> }></Route>
                    <Route path="movies/:type" element={ <MovieList/> }></Route>
                    <Route path="user/profile" element={ <UserProfile/> }></Route>
                    <Route path="user/myFavorites" element={ <Favorites/> }></Route>
                    <Route path="user/logout" element={ <h1> Logout </h1> }></Route>
                    <Route path="user/login"
                           element={
                               <LoginPage
                                   loggedIn={ loggedIn }
                                   setLoggedIn={ setLoggedIn }
                                   validated={ validated }
                                   setValidated={ setValidated }
                               />
                           }></Route>
                    <Route path="/*" element={ <h1>Error</h1> }></Route>
                </Routes>
            </Router>
        </div>
    );
}

export default App;