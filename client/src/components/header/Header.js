import React from "react";
import { Link } from "react-router-dom";

import "./Header.css";
import UserDropdown from '../dropdown/dropdown';


const Header = ({ loggedIn, validated }) => {
    return (
        <div className="header">
            <div className="headerLeft">
                <Link to="/home"><img className="header__icon" alt="Header icon"
                                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png"/></Link>
                <Link to="/movies/popular" style={ { textDecoration: "none" } }><span>Popular</span></Link>
                <Link to="/movies/top_rated" style={ { textDecoration: "none" } }><span>Top Rated</span></Link>
                <Link to="/movies/upcoming" style={ { textDecoration: "none" } }><span>Upcoming</span></Link>
            </div>
            <div className="headerRight">
                <UserDropdown
                    loggedIn={ loggedIn }
                    validated={ validated }
                />
            </div>
        </div>
    );
};

export default Header;