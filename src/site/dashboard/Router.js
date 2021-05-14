import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    withRouter
} from "react-router-dom";

import ProtectedRoute from './utils/ProtectedRoute';

import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';


function RouterBase(props) {

    return (
        <Router>

            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}

            <Switch>

                <Route exact path="/login">
                    <LoginScreen />
                </Route>

                <Route path="/">
                    <ProtectedRoute>
                        <HomeScreen {...props} />
                    </ProtectedRoute>
                </Route>
                
            </Switch>

        </Router>
    );
}

export default withRouter(RouterBase)