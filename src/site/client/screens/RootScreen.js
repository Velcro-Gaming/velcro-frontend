import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';

import LandingScreen from './LandingScreen';
import HomeScreen from './HomeScreen';

import Header from '../components/main/Header';
import {
    colors
} from '../../../App.json'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ProtectedRoute from '../../../utils/ProtectedRoute';
import SearchScreen from './SearchScreen';

class RootScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isAuthenticated: false,
            isLoading: false,

            headerConfig: {
                headerButtons: [
                    {
                        isProtected: false,
                        text: {
                            color: colors.white,
                            value: "Sign in",
                        },
                        styles: {
                            backgroundColor: colors.primary,
                            border: {
                                width: null,
                                style: null,
                                color: null,
                                radius: null,
                            },
                            color: colors.white
                        },
                        linkTo: "/login",
                    },
                ],
                headerStyles: {
                    backgroundColor: colors.black
                }
            }
        }
    }

    render() {
        const {
            auth
        } = this.props

        // console.log("Home Props: ", this.props)

        return (
            <div>
                <Header {...this.props} headerConfig={this.state.headerConfig} />

                <Route render={() => auth.user ? (
                    <ProtectedRoute>
                        <HomeScreen {...this.props} />
                    </ProtectedRoute>
                ) : (
                        <LandingScreen {...this.props} />
                    )
                } />

                {/* <Switch>
                    <Route path={'/search'}>
                        <SearchScreen />
                    </Route>

                    <Route path={'/'}>
                        <Route path={'/'} render={() => auth.user ? (
                            <ProtectedRoute>
                                <HomeScreen {...this.props} />
                            </ProtectedRoute>
                        ) : (
                            <LandingScreen {...this.props} />
                        )
                        } />
                    </Route>

                    
                </Switch> */}
            </div>
        )
    }
}



const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        // register
    }, dispatch)
}

const mapStateToProps = state => {
    const {
        auth
    } = state
    return {
        auth
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RootScreen))