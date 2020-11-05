import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import LandingScreen from './LandingScreen';
import MyGamesScreen from './MyGamesScreen';

import Header from '../../components/main/Header';
import {
    colors
} from '../../App.json'

import { withRouter } from 'react-router-dom';

class HomeScreen extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isAuthenticated: false,
            isLoading: false,

            headerConfig: {
                headerButtons: [
                    {
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
        const { isAuthenticated } = this.state

        console.log("Home Props: ", this.props)

        return (
            <div>
                <Header {...this.props} headerConfig={this.state.headerConfig} />

                <Route render={() => isAuthenticated ? (
                    <MyGamesScreen {...this.props} />
                ) : (
                        <LandingScreen {...this.props} />
                    )
                } />
            </div>
        )
    }
}


export default withRouter(HomeScreen)