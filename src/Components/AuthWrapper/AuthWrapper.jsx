// src/Components/AuthWrapper/AuthWrapper.jsx
import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

const AuthWrapper = ({isAuthenticated, children}) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/signin');
        }
    }, [isAuthenticated, navigate]);

    return <>{children}</>;
};

export default AuthWrapper;