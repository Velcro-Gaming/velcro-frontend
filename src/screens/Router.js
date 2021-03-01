import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import AuthScreen from './auth/Base';
import RootScreen from './main/RootScreen';
import ContactUs from './main/ContactUs';
import TermsCondition from './main/TermsCondition';

import LoginScreen from './auth/Login';
import LogoutScreen from './auth/Logout';
import RegisterScreen from './auth/Register';
import VerificationScreen from './auth/VerificationScreen';

import PasswordResetRequest from './auth/passwords/PasswordResetRequest';
import PasswordResetSent from './auth/passwords/PasswordResetSent';
import PasswordReset from './auth/passwords/PasswordReset';
import PhoneVerification from "./auth/PhoneVerification";

export default function RouterBase() {

    return (
        <Router>

            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}

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
                <Route path="/register/verification">
                    <VerificationScreen />
                </Route>


                <Route path="/phone-verification">
                    <PhoneVerification />
                </Route>


                <Route exact path="/password-reset/request">
                    <PasswordResetRequest />
                </Route>
                <Route exact path="/password-reset/sent">
                    <PasswordResetSent />
                </Route>                
                <Route exact path="/password-reset/">
                    <PasswordReset />
                </Route>

                <Route path="/contact-us" component={ContactUs} />
                <Route path="/terms-and-conditions" component={TermsCondition} />

                <Route path="/" component={RootScreen} />
                
            </Switch>

        </Router>
    );
}