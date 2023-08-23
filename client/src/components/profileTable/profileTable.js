import React from 'react';
import './profileTable.css';

const ProfileTable = () => {
    return (
        <div className="profile-table">
            <div className="table-container">
                <div className="table-row">
                    <div className="table-label">Username:</div>
                    <div className="table-value">john_doe</div>
                </div>
                <div className="table-row">
                    <div className="table-label">Email:</div>
                    <div className="table-value">john.doe@example.com</div>
                </div>
                <div className="table-row">
                    <div className="table-label">Password:</div>
                    <div className="table-value">********</div>
                </div>
                <div className="table-row">
                    <div className="table-label">Job:</div>
                    <div className="table-value">Frontend Developer</div>
                </div>
                <div className="table-row">
                    <div className="table-label">Role:</div>
                    <div className="table-value">User</div>
                </div>
            </div>
        </div>
    );
};

export default ProfileTable;
