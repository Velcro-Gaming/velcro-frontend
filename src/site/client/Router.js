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
import RegisterScreenOne from './screens/auth/RegisterScreenOne';
import RegisterScreenTwo from './screens/auth/RegisterScreenTwo';

import AccountProfileScreen from './screens/AccountProfileScreen';

import PasswordResetRequest from './screens/auth/passwords/PasswordResetRequest';
import PasswordResetSent from './screens/auth/passwords/PasswordResetSent';
import PasswordReset from './screens/auth/passwords/PasswordReset';
import PhoneVerification from "./screens/auth/PhoneVerification";
import SearchScreen from "./screens/SearchScreen";
import OrderScreen from "./screens/OrderScreen";
import ProtectedRoute from "../../utils/ProtectedRoute";
// import ProtectedRoute from "../../utils/ProtectedRoute";

function RouterBase() {

    return (
        <Router>

            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}

            <Switch>
                {/* <ProtectedRoute>
                    <Route path="/account" component={AccountProfileScreen} />
                </ProtectedRoute> */}

                {/* <Route path="/account" component={AccountProfileScreen} /> */}
                <Route path="/account">
                    <ProtectedRoute>
                        <AccountProfileScreen />
                    </ProtectedRoute>
                </Route>

                {/* <Route path="/search" component={SearchScreen} /> */}
                <Route path="/search">
                    <ProtectedRoute>
                        <SearchScreen />
                    </ProtectedRoute>
                </Route>

                {/* <Route path="/order" component={OrderScreen} /> */}
                <Route path="/order">
                    <ProtectedRoute>
                        <OrderScreen />
                    </ProtectedRoute>
                </Route>
                
                <Route exact path="/login">
                    <LoginScreen />
                </Route>
                <Route exact path="/logout">
                    <LogoutScreen />
                </Route>
                <Route exact path="/register">
                    <RegisterScreenOne />
                </Route>
                <Route path="/register/extra-information">
                    <RegisterScreenTwo />
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