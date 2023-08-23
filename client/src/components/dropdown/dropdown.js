import React from "react";
import { Link } from "react-router-dom";
import './dropdown.css';

const UserDropdown = () => {
    return (
        <div className="userDropdown">
            <Link to="movies/profile">Profile</Link>
            <Link to="movies/myfavorites">Favorites</Link>
            <button onClick={ handleLogout }>Logout</button>
        </div>
    );
};

const handleLogout = () => {
    console.log("Clicked");
};

export default UserDropdown;
