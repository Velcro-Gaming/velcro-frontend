import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    withRouter
} from "react-router-dom";

import RootScreen from './screens/RootScreen';

import LoginScreen from './screens/auth/LoginScreen';
import LogoutScreen from './screens/auth/LogoutScreen';
import RegisterScreenOne from './screens/auth/RegisterScreenOne';
import RegisterScreenTwo from './screens/auth/RegisterScreenTwo';

import ProfileScreen from './screens/account/ProfileScreen';
import WalletScreen from './screens/account/WalletScreen';
import PhoneVerification from "./screens/account/PhoneVerification";

import PasswordResetRequest from './screens/auth/passwords/PasswordResetRequest';
import PasswordResetSent from './screens/auth/passwords/PasswordResetSent';
import PasswordReset from './screens/auth/passwords/PasswordReset';

import OrderScreen from "./screens/OrderScreen";
import OffersScreen from "./screens/OffersScreen";

import SearchScreen from "./screens/SearchScreen";

import ContactUs from './screens/ContactUs';
import TermsCondition from './screens/TermsCondition';

import ProtectedRoute from "../../utils/ProtectedRoute";


function RouterBase() {

    return (
        <Router>

            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}

            <Switch>
                {/* <ProtectedRoute>
                    <Route path="/account" component={ProfileScreen} />
                </ProtectedRoute> */}

                <Route path="/search">
                    <ProtectedRoute>
                        <SearchScreen />
                    </ProtectedRoute>
                </Route>

                <Route path="/order">
                    <ProtectedRoute>
                        <OrderScreen />
                    </ProtectedRoute>
                </Route>

                <Route path="/offers">
                    <ProtectedRoute>
                        <OffersScreen />
                    </ProtectedRoute>
                </Route>

                <Route path="/account">
                    <ProtectedRoute>
                        <ProfileScreen />
                    </ProtectedRoute>
                </Route>

                <Route path="/wallet">
                    <ProtectedRoute>
                        <WalletScreen />
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