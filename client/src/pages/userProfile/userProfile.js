import React, { useEffect, useState } from 'react';
import { BeatLoader } from 'react-spinners';
import axios from 'axios';

import ProfileHeader from '../../components/profileHeader/profileHeader';
import ProfileTable from '../../components/profileTable/profileTable';

const UserProfile = () => {
    const [userData, setUserData] = useState(null);
    const [fullName, setFullName] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('jwt');

        if ( token ) {
            axios.get('http://localhost:5000/users/info', { headers: { Authorization: `Bearer ${ token }` } })
                .then((res) => {
                    setUserData(res.data.userData);
                    const fullName = res.data.userData.UserInfo.firstName + ' ' + res.data.userData.UserInfo.lastName;
                    setFullName(fullName);
                    setIsLoading(false);
                })
                .catch(() => {
                    console.log('Could not retrieve data');
                    setIsLoading(false);
                });
        }
    }, []);

    const spinnerContainerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50vh',
    };

    return (
        <>
            { isLoading ? (
                <div className="loading-spinner" style={ spinnerContainerStyle }>
                    <BeatLoader color="#f0ad4e" loading={ true } size={ 15 }/>
                </div>
            ) : (
                <>
                    <ProfileHeader
                        fullName={ fullName }
                    />
                    <ProfileTable
                        userData={ userData }
                    />
                </>
            ) }
        </>
    );
};

export default UserProfile;