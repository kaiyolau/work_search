import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const AuthRoute = ({ isAuthenticated, component:Component, ...rest  }) => {
    if (isAuthenticated){
        // ...rest props take care of the reat of props that being props from parent's component
        return <Route render={(props) => <Component {...props} {...rest} />} />
    } else {
        return <Redirect to='/sign_in' />
    }
}

export default AuthRoute;

