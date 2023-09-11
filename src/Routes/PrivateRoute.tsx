import React from 'react';
import { useAuthContext } from '@lib/Context/AuthContext';
import { Navigate } from 'react-router-dom';


export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const { isAuthenticated } = useAuthContext();
    return (
        isAuthenticated
            ? children
            : <Navigate to="/login" replace={true} />
    )
};

interface PrivateRouteProps {
    // isAuthenticated: boolean;
    children: React.ReactElement;
}
