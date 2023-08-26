import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from 'axios';

import './dropdown.css';

const UserDropdown = ({ loggedIn, validated }) => {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [userRole, setUserRole] = useState("guest");
    const [logoutSuccess, setLogoutSuccess] = useState(false);

    useEffect(() => {
        if ( loggedIn && validated && userRole === 'guest' ) {
            const token = localStorage.getItem("jwt");

            console.log("DropDown");

            if ( token ) {
                axios.get("http://localhost:5000/users/role", { headers: { Authorization: `Bearer ${ token }` } })
                    .then(res => {
                        setUserRole(res.data.role);
                    })
                    .catch(error => {
                        console.error("Error fetching user role:", error);
                    });
            }
        }
    }, [loggedIn, validated, userRole]);

    const handleLogout = async () => {
        await localStorage.removeItem("jwt");
        await setUserRole("guest");
        await setLogoutSuccess(true);
        window.location.reload();
    };

    return (
        <div
            className="user-dropdown-container"
            onMouseEnter={ () => setDropdownVisible(true) }
            onMouseLeave={ () => setDropdownVisible(false) }
        >
            <UserIcon/>
            <DropdownContent
                userRole={ userRole }
                visible={ dropdownVisible }
                setVisible={ setDropdownVisible }
                handleLogout={ handleLogout }
            />
            { logoutSuccess && <Navigate to="home"/> }
        </div>
    );
};

const UserIcon = () => (
    <div className="userIcon">
        <img
            className="userIcon__image"
            alt="User icon"
            src="https://cdn.icon-icons.com/icons2/2468/PNG/512/user_icon_149329.png"
        />
    </div>
);

const DropdownContent = ({ userRole, visible, setVisible, handleLogout }) => (
    <div
        className="userDropdown"
        style={ {
            opacity: visible ? 1 : 0,
            visibility: visible ? 'visible' : 'hidden'
        } }
    >
        { userRole === "user" ? (
            <>
                <Link to="user/profile">Profile</Link>
                <Link to="user/myfavorites">Favorites</Link>
                <Link to="home" onClick={ handleLogout }>Logout</Link>
            </>
        ) : (
            <Link to="user/login" onClick={ () => {
                setVisible(false);
            } }>Login</Link>
        ) }
    </div>
);

export default UserDropdown;
