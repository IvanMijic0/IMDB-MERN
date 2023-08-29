import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router';
import { useAlert } from 'react-alert';
import axios from 'axios';

import Login from '../../components/login/login';

const LoginPage = ({ loggedIn, setLoggedIn }) => {
    const [formData, setFormData] = useState({});
    const [mode, setMode] = useState('login');
    const [validated, setValidated] = useState(false);

    const alert = useAlert();

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
    }, [mode, setValidated, setLoggedIn, loggedIn]);

    const handleLogin = async (e) => {
        e.preventDefault();

        const { fullName, email, createPassword, password } = formData;

        if ( mode === 'login' ) {
            axios.post(`http://localhost:5000/auth/${ mode }`, { email, password })
                .then((res) => {
                    const token = res.data.access_token;
                    localStorage.setItem('jwt', token);
                    setLoggedIn(true);
                })
                .catch(() => {
                    alert.error("Invalid Credentials");
                });
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
            await axios.post(`http://localhost:5000/auth/${ mode }`, requestData)
                .then(() => {
                    setMode('login');
                    alert.success('Successfully registered')
                    setTimeout(() => window.location.reload(), 2000)

                })
                .catch(() => {
                    console.log(e);
                    alert.error("User already exists")
                });
        }

    };

    if ( loggedIn && validated ) {
        return <Navigate to="/home"/>;
    } else {
        return (
            <div className={ `app app--is-${ mode }` }>
                <Login
                    mode={ mode }
                    setMode={ setMode }
                    onSubmit={ handleLogin }
                    setFormData={ setFormData }
                />
            </div>
        );
    }
};

export default LoginPage;
