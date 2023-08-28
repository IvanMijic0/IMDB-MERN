import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import { isTokenExpired } from '../utils/authUtils';

const ProtectedRoute = ({ component: Component, token, ...rest }) => (
    <Route
        { ...rest }
        render={ (props) =>
            token && !isTokenExpired(token) ? (
                <Component { ...props } />
            ) : (
                <Navigate to="/login"/>
            )
        }
    />
);

export default ProtectedRoute;