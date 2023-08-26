import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router';
import axios from 'axios';

import LoginComponent from '../../components/loginComponent/loginComponent';

const LoginPage = ({ loggedIn, setLoggedIn, validated, setValidated }) => {
    const [formData, setFormData] = useState({});
    const [mode, setMode] = useState('login');

    useEffect(() => {
        const token = localStorage.getItem('jwt');

        if ( token ) {
            axios.post(
                'http://localhost:5000/auth/validate',
                { access_token: token },
                { headers: { Authorization: `Bearer ${ token }` } }
            )
                .then(() => {
                    setValidated(true);
                })
                .catch(() => {
                    localStorage.removeItem('jwt');
                    setLoggedIn(false);
                });
        }

    }, [mode, setValidated, validated, setLoggedIn, loggedIn]);

    const handleLogin = async (e) => {
        e.preventDefault();

        const { fullName, email, createPassword, password } = formData;

        try {
            if ( mode === 'login' ) {
                axios.post(`http://localhost:5000/auth/${ mode }`, { email, password })
                    .then((res) => {
                        const token = res.data.access_token;
                        localStorage.setItem('jwt', token);
                        setLoggedIn(true);
                    })
                    .catch((e) => console.log('Invalid Credentials' + e));
            } else if ( mode === 'register' ) {
                const requestData = {
                    email: email,
                    password: createPassword,
                    role: 'user',
                    UserInfo: {
                        firstName: fullName.split(' ')[0],
                        lastName: fullName.split(' ')[1]
                    }
                };
                const response = await axios.post(`http://localhost:5000/auth/${ mode }`, requestData);
                console.log(response.data);
                setMode('login');
            }
        } catch ( error ) {
            console.error('Error:', error);
        }
    };

    if ( loggedIn && validated ) {
        return <Navigate to="/home"/>;
    } else {
        return (
            <div className={ `app app--is-${ mode }` }>
                <LoginComponent
                    mode={ mode }
                    onSubmit={ handleLogin }
                    setFormData={ setFormData }
                />
            </div>
        );
    }
};

export default LoginPage;
