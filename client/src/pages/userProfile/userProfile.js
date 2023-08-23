import React from 'react';

import './userProfile.css';
import ProfileHeader from '../../components/profileHeader/profileHeader';
import ProfileTable from '../../components/profileTable/profileTable';

const UserProfile = () => {
    return (
        <>
            <ProfileHeader/>
            <ProfileTable/>
        </>
    );
};

export default UserProfile;
