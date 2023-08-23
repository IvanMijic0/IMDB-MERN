import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from './components/header/Header';
import Home from './pages/home/home';
import MovieList from './components/movieList/movieList';
import Movie from './pages/movieDetail/movie';
import UserProfile from './pages/userProfile/userProfile';
import Favorites from './pages/favorites/favorites';

function App() {
    return (
        <div className="App">
            <Router>
                <Header/>
                <Routes>
                    <Route index element={ <Home/> }></Route>
                    <Route path="movie/:id" element={ <Movie/> }></Route>
                    <Route path="movies/:type" element={ <MovieList/> }></Route>
                    <Route path="movies/profile" element={ <UserProfile/> }></Route>
                    <Route path="movies/myFavorites" element={ <Favorites/> }></Route>
                    <Route path="movies/logout" element={ <h1> Logout </h1> }></Route>
                    <Route path="/*" element={ <h1>Error</h1> }></Route>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
