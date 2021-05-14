import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import LoginScreen from './LoginScreen';
import LogoutScreen from './LogoutScreen';
import RegisterScreen from './RegisterScreen';


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


