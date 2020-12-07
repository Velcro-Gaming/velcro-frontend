import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import LoginScreen from './Login';
import LogoutScreen from './Logout';
import RegisterScreen from './Register';


export default function AuthBase() {

    return (
        <Switch>
            <Route exact path="/login">
                <LoginScreen />
            </Route>
            <Route exact path="/logout">
                <LogoutScreen />
            </Route>
            <Route exact path="/register">
                <RegisterScreen />
            </Route>
        </Switch>
    );
}


