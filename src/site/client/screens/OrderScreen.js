import React, { useState } from 'react'

import {
    Route,
    Switch,
    useRouteMatch,
    withRouter,
    Redirect
} from 'react-router-dom';

import Header from '../components/main/Header';
import {
    colors
} from '../../../App.json'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import GameRent from './order/GameRent';
import GameSwap from './order/GameSwap';
import GameBuy from './order/GameBuy';


function OrderScreen(props) {
    const {
        auth
    } = props

    const match = useRouteMatch();

    const [HeaderConfig, setHeaderConfig] = useState({
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
    })

    const NoRouteMatch = () => {
        return <Redirect to="/search" />
    }

    return (
        <div>
            <Header {...props} headerConfig={HeaderConfig} />


            <div style={styles.wrapper}>
                <div className={"container"} style={styles.container}>

                    <div style={{ margin: "35px 0", fontWeight: 600, fontFamily: 'Nunito Sans' }}>
                        Back
                    </div>

                    <div style={styles.orderSection}>
                        <Switch>
                            <Route exact path={`${match.path}/:gameSlug/rent`}>
                                <GameRent />
                            </Route>
                            <Route exact path={`${match.path}/:gameSlug/swap`}>
                                <GameSwap />
                            </Route>
                            <Route exact path={`${match.path}/:gameSlug/buy`}>
                                <GameBuy />
                            </Route>

                            <Route component={NoRouteMatch} />
                        </Switch>
                    </div>

                    <div style={{ margin: "35px 0", fontWeight: 600, fontFamily: 'Nunito Sans' }}>
                        Delivery Information
                    </div>

                    <div style={styles.deliverySection}>
                        <div>
                            <div>Pick-up Address</div>

                                Address

                                LGA

                                State
                            </div>
                        <div>
                            <div>Delivery Address</div>

                                Address

                                LGA

                                State
                            </div>
                    </div>
                
                    

                </div>
            </div>

        </div>
    )
}

const styles = {
    wrapper: {
        padding: "69px 0 0 0",
        backgroundColor: colors.background,
    },
    container: {
        // height: '500px',
        padding: "75px 100px",
    },
    orderSection: {
        
    },

    deliverySection: {
        display: 'flex',
        justifyContent: 'space-between',

        backgroundColor: colors.white,

        padding: "30px"
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(OrderScreen))