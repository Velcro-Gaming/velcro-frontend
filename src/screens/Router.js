import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import AuthScreen from './auth/Base';
import HomeScreen from './main/HomeScreen';
import ContactUs from './main/ContactUs';
import TermsCondition from './main/TermsCondition';

export default function AuthBase() {

    return (
        <Router>

            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}

            <Switch>
                <Route exact path="/" component={HomeScreen} />

                <Route path="/contact-us" component={ContactUs} />
                <Route path="/terms-and-conditions" component={TermsCondition} />

                <Route path="/login" component={AuthScreen} />
                <Route path="/register" component={AuthScreen} />
            </Switch>

        </Router>
    );
}