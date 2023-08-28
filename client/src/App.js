import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Navigate } from 'react-router';
import { useState } from 'react';
import { positions, Provider as AlertProvider, transitions } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

import UserFavorites from './pages/favorites/favorites';
import UserProfile from './pages/userProfile/userProfile';
import Home from './pages/home/home';
import Header from './components/header/Header';
import { isAuthenticated } from './utils/authUtils';
import Movie from './pages/movieDetail/movie';
import MovieList from './components/movieList/movieList';
import LoginPage from './pages/loginPage/loginPage';

const alertOptions = {
    position: positions.TOP_RIGHT,
    timeout: 3000,
    transition: transitions.SCALE,
};

const App = () => {
    const storedToken = localStorage.getItem('jwt');

    const [loggedIn, setLoggedIn] = useState(false);
    const userIsAuthenticated = isAuthenticated(storedToken);

    return (
        <AlertProvider template={ AlertTemplate } { ...alertOptions }>
            <div className="App">
                <Router>
                    <Header
                        authenticated={ userIsAuthenticated }
                        loggedIn={ loggedIn }
                    />
                    <Routes>
                        <Route path="/home" index element={ <Home/> }/>
                        <Route path="movie/:id" element={ <Movie/> }/>
                        <Route path="movies/:type" element={ <MovieList/> }/>

                        {/* Redirect to profile if already logged in */ }
                        <Route
                            path="user/login"
                            element={
                                userIsAuthenticated ? (
                                    <Navigate to="/home"/>
                                ) : (
                                    <LoginPage
                                        loggedIn={ loggedIn }
                                        setLoggedIn={ setLoggedIn }
                                    />
                                )
                            }
                        />

                        {/* Protect routes */ }
                        <Route
                            path="user/profile"
                            element={ userIsAuthenticated ? <UserProfile/> : <Navigate to="/user/login"/> }
                        />
                        <Route
                            path="user/myFavorites"
                            element={ userIsAuthenticated ? <UserFavorites/> : <Navigate to="/user/login"/> }
                        />
                        <Route
                            path="user/logout"
                            element={ userIsAuthenticated ? <h1>Logout</h1> : <Navigate to="/user/login"/> }
                        />

                        <Route path="/*" element={ <h1>Redirecting...</h1> }/>
                    </Routes>
                </Router>
            </div>
        </AlertProvider>
    );
};

export default App;
