import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import LandingScreen from './LandingScreen';
import MyGamesScreen from './MyGamesScreen';

import Header from '../../components/main/Header';
import {
    colors
} from '../../App.json'

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class HomeScreen extends Component {
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
                            color: colors.black,
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

                <Route render={() => auth.loggedIn ? (
                    <MyGamesScreen {...this.props} />
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HomeScreen))