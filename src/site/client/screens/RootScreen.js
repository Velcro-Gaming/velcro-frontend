import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';

import HomeScreen from './HomeScreen';
import LandingScreen from './LandingScreen';

import Header from '../components/main/Header';
import {
    colors
} from '../../../App.json'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ProtectedRoute from '../../../utils/ProtectedRoute';

class RootScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // isAuthenticated: false,
            // isLoading: false,

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