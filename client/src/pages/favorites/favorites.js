import React, { useEffect, useState } from "react";
import axios from 'axios';

import Cards from '../../components/card/card';
import './favorites.css';

const UserFavorites = () => {
    const [favList, setFavList] = useState([]);

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('jwt');
            const userDataResponse = await axios.get('http://localhost:5000/users/info', {
                headers: { Authorization: `Bearer ${ token }` }
            });
            const userId = userDataResponse.data.userData._id;

            const favoritesResponse = await axios.get(
                `http://localhost:5000/favorites/${ userId }`,
                { headers: { Authorization: `Bearer ${ token }` } }
            );

            const favoriteMovies = favoritesResponse.data.favoriteMovies;
            setFavList(favoriteMovies);
        } catch ( error ) {
            console.log("Could not retrieve favorite movies. " + error);
        }
    };

    useEffect(() => {
        fetchData().then();
    }, []);

    return (
        <div className="favMovie__list">
            <h2 className="favList__title">Favorites</h2>
            { favList.length > 0 ? (
                <div className="favList__cards">
                    { favList.map(movie => (
                        <Cards key={ movie._id } movie={ movie } movieId={ movie._id }/>
                    )) }
                </div>
            ) : (
                <div className="emptyFavorites">
                    <img className="emptyFavorites__logo" src={ require('../../assets/nothing.png') } alt="Empty Favorites"/>
                    <p className="emptyFavorites__text">Your favorites list is empty.</p>
                </div>
            ) }
        </div>
    );
};

export default UserFavorites;
