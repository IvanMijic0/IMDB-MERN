import React from 'react';
import './profileHeader.css';

const profileHeader = () => {
    return (
        <div className="user-profile">
            <div className="profile-header">
                <div className="profile-avatar">
                    <img src="https://cdn.icon-icons.com/icons2/2468/PNG/512/user_icon_149329.png" alt="User Avatar"/>
                </div>
                <h2 className="profile-name">John Doe</h2>
                <p className="profile-bio">Frontend Developer</p>
            </div>
        </div>
    );
};

export default profileHeader;