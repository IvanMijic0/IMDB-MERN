import React, { useState } from "react";
import { Link } from "react-router-dom";
import './dropdown.css';


const UserDropdown = () => {

    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [userRole, setUserRole] = useState("");

    return (
        <div
            className="user-dropdown-container"
            onMouseEnter={ () => setDropdownVisible(true) }
            onMouseLeave={ () => setDropdownVisible(false) }
        >
            <UserIcon/>
            <DropdownContent userRole={ userRole } visible={ dropdownVisible } setVisible={ setDropdownVisible }/>
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

const DropdownContent = ({ userRole, visible, setVisible }) => (
    <div
        className="userDropdown"
        style={ {
            opacity: visible ? 1 : 0,
            visibility: visible ? 'visible' : 'hidden'
        } }
    >
        { userRole === "" ? (
            <Link to="user/login" onClick={ () => setVisible(false) }>Login</Link>
        ) : (
            <>
                <Link to="user/profile">Profile</Link>
                <Link to="user/myfavorites">Favorites</Link>
                <button onClick={ handleLogout }>Logout</button>
            </>
        ) }
    </div>
);
const handleLogout = () => {
    console.log("Clicked");
};

export default UserDropdown;
