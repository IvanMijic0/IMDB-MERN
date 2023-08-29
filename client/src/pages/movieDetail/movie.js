import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAlert } from 'react-alert';

import "./movie.css";
import axios from 'axios';
import { BeatLoader } from 'react-spinners';

const Movie = () => {
    const [currentMovieDetail, setMovie] = useState();
    const [favorited, setFavorited] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const { id } = useParams();
    const alert = useAlert();

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('jwt');
            const userDataResponse = await axios.get('http://localhost:5000/users/info', {
                headers: { Authorization: `Bearer ${ token }` }
            });
            const userId = userDataResponse.data.userData._id;

            return { userId, token };
        } catch ( e ) {
            console.log(`Could not get data: ${ e }`);
            return {};
        }
    };

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${ id }?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`)
            .then(res => res.json())
            .then(data => {
                setMovie(data);
                setIsLoading(false);
            });
        window.scrollTo(0, 0);
    }, [id]);

    useEffect(() => {
        const fetchDataAndCheckFavorites = async () => {
            const { userId, token } = await fetchData();

            if ( userId && currentMovieDetail.id && token ) {
                try {
                    setFavorited((await axios.get(
                        `http://localhost:5000/favorites/${ userId }/${ currentMovieDetail.id }`, {
                            headers: { Authorization: `Bearer ${ token }` }
                        })).data.isFavorited);

                } catch ( e ) {
                    console.log('Could not retrieve data.');
                }
            }
        };

        if ( currentMovieDetail ) {
            fetchDataAndCheckFavorites().then(() => {
            });
        }

    }, [id, currentMovieDetail]);

    const toggleFavorite = async () => {
        setFavorited(!favorited);
        try {
            const { userId, token } = await fetchData();

            if ( !favorited ) {
                await axios.post('http://localhost:5000/favorites', {
                    userId,
                    movieId: currentMovieDetail.id
                }, {
                    headers: { Authorization: `Bearer ${ token }` }
                });

                await axios.post('http://localhost:5000/movies', {
                    _id: currentMovieDetail.id,
                    poster_path: currentMovieDetail.poster_path,
                    original_title: currentMovieDetail.original_title,
                    release_date: currentMovieDetail.release_date,
                    vote_average: currentMovieDetail.vote_average,
                    overview: currentMovieDetail.overview
                }, {
                    headers: { Authorization: `Bearer ${ token }` }
                });

                alert.success('Favorited', { timeout: 1500 });
            } else {
                await axios.delete(
                    `http://localhost:5000/favorites/${ userId }/${ currentMovieDetail.id }`,
                    { headers: { Authorization: `Bearer ${ token }` } }
                );

                await axios.delete(
                    `http://localhost:5000/movies/${ currentMovieDetail.id }`,
                    { headers: { Authorization: `Bearer ${ token }` } }
                );
                alert.success('unFavorited', { timeout: 1500 });
            }
        } catch ( e ) {
            console.log(e);
        }
    };

    const spinnerContainerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh',
    };

    return (
        isLoading ?
            (
                <div className="loading-spinner" style={ spinnerContainerStyle }>
                    <BeatLoader color="#f0ad4e" loading={ true } size={ 15 }/>
                </div>
            )
            :
            (
                <div className="movie">
                    <div className="movie__intro">
                        <img className="movie__backdrop" alt="Movie backdrop"
                             src={ `https://image.tmdb.org/t/p/original${ currentMovieDetail ? currentMovieDetail.backdrop_path : "" }` }/>
                    </div>
                    <button
                        className={ `favorite-button ${ favorited ? "favorite-button--active" : "" }` }
                        onClick={ toggleFavorite }
                    >
                        <i className="fas fa-star"></i>
                    </button>
                    <div className="movie__detail">
                        <div className="movie__detailLeft">
                            <div className="movie__posterBox">
                                <img className="movie__poster" alt="Movie poster"
                                     src={ `https://image.tmdb.org/t/p/original${ currentMovieDetail ? currentMovieDetail.poster_path : "" }` }/>
                            </div>
                        </div>
                        <div className="movie__detailRight">
                            <div className="movie__detailRightTop">
                                <div
                                    className="movie__name">{ currentMovieDetail ? currentMovieDetail.original_title : "" }</div>
                                <div
                                    className="movie__tagline">{ currentMovieDetail ? currentMovieDetail.tagline : "" }</div>
                                <div className="movie__rating">
                                    { currentMovieDetail ? currentMovieDetail.vote_average : "" } <i
                                    className="fas fa-star"/>
                                    <span
                                        className="movie__voteCount">{ currentMovieDetail ? "(" + currentMovieDetail.vote_count + ") votes" : "" }</span>
                                </div>
                                <div
                                    className="movie__runtime">{ currentMovieDetail ? currentMovieDetail.runtime + " mins" : "" }</div>
                                <div
                                    className="movie__releaseDate">{ currentMovieDetail ? "Release date: " + currentMovieDetail.release_date : "" }</div>
                                <div className="movie__genres">
                                    { currentMovieDetail && currentMovieDetail.genres
                                        ? currentMovieDetail.genres.map(genre => (
                                            <span
                                                key={ genre.id }><span className="movie__genre">{ genre.name }</span>
                                    </span>
                                        ))
                                        : null }
                                </div>
                            </div>
                            <div className="movie__detailRightBottom">
                                <div className="synopsisText">Synopsis</div>
                                <div>{ currentMovieDetail ? currentMovieDetail.overview : "" }</div>
                            </div>

                        </div>
                    </div>
                    <div className="movie__links">
                        {
                            currentMovieDetail && currentMovieDetail.homepage &&
                            <a href={ currentMovieDetail.homepage } target="_blank" rel="noreferrer"
                               style={ { textDecoration: "none" } }>
                                <p><span className="movie__homeButton movie__Button">Trailer<i
                                    className="newTab fas fa-external-link-alt"></i></span>
                                </p>
                            </a>
                        }
                        {
                            currentMovieDetail && currentMovieDetail.imdb_id &&
                            <a href={ "https://www.imdb.com/title/" + currentMovieDetail.imdb_id } target="_blank"
                               rel="noreferrer" style={ { textDecoration: "none" } }>
                                <p><span className="movie__imdbButton movie__Button">IMDb <i
                                    className="newTab fas fa-external-link-alt"></i></span>
                                </p>
                            </a>
                        }
                    </div>
                    <div className="movie__heading">Production companies</div>
                    <div className="movie__production">
                        { currentMovieDetail && currentMovieDetail.production_companies
                            ? currentMovieDetail.production_companies.map(company => (
                                <span key={ company.id }>
                { company.logo_path && (
                    <span className="productionCompanyImage">
                        <img
                            className="movie__productionComapany"
                            alt="Production company"
                            src={ "https://image.tmdb.org/t/p/original" + company.logo_path }
                        />
                        <span>{ company.name }</span>
                    </span>
                ) }
            </span>)) : null }
                    </div>
                </div>
            )
    );
};

export default Movie;