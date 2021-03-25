import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import LandingScreen from './LandingScreen';
import HomeScreen from './HomeScreen';

import Header from '../../components/main/Header';
import {
    colors
} from '../../App.json'

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ProtectedRoute from '../../components/utils/ProtectedRoute';

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
                            value: "Get Started",
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
                        linkTo: "/register",
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

        console.log("Home Props: ", this.props)

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