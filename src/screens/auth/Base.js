import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import LoginScreen from './Login';
import RegisterScreen from './Register';


export default function AuthBase() {

    return (
        <Switch>
            <Route exact path="/login">
                <LoginScreen />
            </Route>
            <Route exact path="/register">
                <RegisterScreen />
            </Route>
            <Route exact path="/register">
                <RegisterScreen />
            </Route>
        </Switch>
    );
}


