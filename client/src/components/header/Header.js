import React from "react";
import { Link } from "react-router-dom";

import "./Header.css";
import UserDropdown from '../dropdown/dropdown';


const Header = () => {
    return (
        <div className="header">
            <div className="headerLeft">
                <Link to="/"><img className="header__icon" alt="Header icon"
                                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png"/></Link>
                <Link to="/movies/popular" style={ { textDecoration: "none" } }><span>Popular</span></Link>
                <Link to="/movies/top_rated" style={ { textDecoration: "none" } }><span>Top Rated</span></Link>
                <Link to="/movies/upcoming" style={ { textDecoration: "none" } }><span>Upcoming</span></Link>
            </div>
            <div className="headerRight">
                <div className="userIcon">
                    <img
                        className="userIcon__image"
                        alt="User icon"
                        src="https://cdn.icon-icons.com/icons2/2468/PNG/512/user_icon_149329.png"/>
                    <UserDropdown/>
                </div>
            </div>
        </div>
    );
};

export default Header;