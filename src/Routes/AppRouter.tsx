import React from 'react'
import {
    Route,
    Routes
} from 'react-router-dom';


// import ForgotPassword from '@pages/PasswordReset/ForgotPassword';

import { SideMenuRoutes } from './SideMenuRoutes';
import { PrivateRoute } from './PrivateRoute';
import Login from './../Pages/Login';
import CreateUser from '@components/CreateUser/CreateUser';
import NotFound from './../Pages/NoFound';

export const AppRouter = () => {
    return (
        <>
            <Routes>
                <Route path="/login/*" element={
                    <Routes>
                        <Route path="/*" element={<Login />} />
                    </Routes>
                }
                />
                {<Route path="/createUser" element={
                    <Routes>
                        <Route path="/*" element={<CreateUser />} />
                    </Routes>

                }
                />}
                {<Route path="/notFound" element={
                    <Routes>
                        <Route path="/*" element={<NotFound />} />
                    </Routes>

                }
                />}
                <Route path="/*" element={
                    <PrivateRoute>
                        <SideMenuRoutes />
                    </PrivateRoute>
                } />
            </Routes>
        </>
    )
}
