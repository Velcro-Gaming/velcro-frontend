import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    withRouter
} from "react-router-dom";

import RootScreen from './screens/RootScreen';

import ContactUs from './screens/ContactUs';
import TermsCondition from './screens/TermsCondition';

import LoginScreen from './screens/auth/LoginScreen';
import LogoutScreen from './screens/auth/LogoutScreen';
import RegisterScreen from './screens/auth/RegisterScreen';
import VerificationScreen from './screens/auth/VerificationScreen';

import PasswordResetRequest from './screens/auth/passwords/PasswordResetRequest';
import PasswordResetSent from './screens/auth/passwords/PasswordResetSent';
import PasswordReset from './screens/auth/passwords/PasswordReset';
import PhoneVerification from "./screens/auth/PhoneVerification";
import SearchScreen from "./screens/SearchScreen";
import OrderScreen from "./screens/OrderScreen";

function RouterBase() {

    return (
        <Router>

            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}

            <Switch>

                <Route path="/search" component={SearchScreen} />

                <Route path="/order" component={OrderScreen} />
                
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

                <Route exact path="/contact-us" component={ContactUs} />
                <Route exact path="/terms-and-conditions" component={TermsCondition} />

                <Route path="/" component={RootScreen} />
                
            </Switch>

        </Router>
    );
}

export default withRouter(RouterBase)