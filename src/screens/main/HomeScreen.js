import React, { useState } from 'react'
import {
    Switch,
    Route,
    useRouteMatch,
    Redirect
} from "react-router-dom";
import { colors } from '../../App.json'
import Button from '../../components/utils/Button'

import MyGames from './MyGames'
import SavedGames from './SavedGames';
import MyOrders from './MyOrders';

import { IoIosCart, IoLogoGameControllerB, IoMdHeart } from 'react-icons/io'


function HomeScreen() {
    const [ComponentState, setComponentState] = useState({
        redirect: null,
        activeScreen: {
            name: 'myGames',
            path: '/'
        },
        buttons: {
            myGames: {
                text: {
                    color: colors.grey,
                    value: <div><IoLogoGameControllerB style={{ margin: '0 2px 0 0' }} /> MY GAMES</div>
                },
                styles: {
                    height: '50px',
                    width: '110px',
                    margin: '0 5px',
                    backgroundColor: null,
                    fontSize: '11px',
                    border: {
                        width: null,
                        style: null,
                        color: null,
                        radius: null,
                    },
                    color: colors.white
                },
                linkTo: '/'
            },
            savedGames: {
                text: {
                    color: colors.grey,
                    value: <div><IoMdHeart style={{ margin: '0 2px 0 0' }} /> SAVED GAMES</div>
                },
                styles: {
                    height: '50px',
                    width: '120px',
                    margin: '0 5px',
                    backgroundColor: null,
                    fontSize: '11px',
                    border: {
                        width: null,
                        style: null,
                        color: null,
                        radius: null,
                    },
                    color: colors.white
                },
                linkTo: '/saved-games'
            },
            myOrders: {
                text: {
                    color: colors.grey,
                    value: <div><IoIosCart style={{ margin: '0 2px 0 0' }} /> MY ORDERS</div>
                },
                styles: {
                    height: '50px',
                    width: '110px',
                    margin: '0 5px',
                    backgroundColor: null,
                    fontSize: '11px',
                    border: {
                        width: null,
                        style: null,
                        color: null,
                        radius: null,
                    },
                    color: colors.white
                },
                linkTo: '/my-orders'
            },
        },
    })

    const match = useRouteMatch()

    const {
        activeScreen,
        buttons,
        redirect
    } = ComponentState

    console.log(`${match.path}/saved-games`)

    if (redirect) {
        return <Redirect to={redirect} />
    }

    const SetActiveScreen = (config, screenSize='mobile') => {
        // console.log("SetActiveScreen: ", SetActiveScreen)
        console.log(buttons[config.name])
        
        let newButtonState = buttons

        for (let btn in newButtonState) {
            let buttonConfig = newButtonState[btn]
            if (btn === config.name) {
                buttonConfig.text.color = colors.primary
            } else {
                buttonConfig.text.color = colors.grey
            }
        }

        //
        setComponentState({
            ...ComponentState,
            activeScreen: config,
            buttons: newButtonState,
        })
    }

    return (
        <div style={styles.container}>
            <div className="container">
                <div style={styles.bannerWrapper} />

                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '35px 0 20px 0' }}>
                    <div style={{ height: '4px', width: '21px', backgroundColor: activeScreen.name === 'myGames' ? colors.primary : colors.grey, margin: '0 5px' }}/>
                    <div style={{ height: '4px', width: '21px', backgroundColor: activeScreen.name === 'savedGames' ? colors.primary : colors.grey, margin: '0 5px' }}/>
                    <div style={{ height: '4px', width: '21px', backgroundColor: activeScreen.name === 'myOrders' ? colors.primary : colors.grey, margin: '0 5px' }}/>
                </div>

                <div style={{ display: 'flex', flexFlow: 'row noWrap', justifyContent: 'center', alignItems: 'center', backgroundColor: colors.white, margin: '20px 0' }}>
                    <Button {...buttons.myGames} />
                    <Button {...buttons.savedGames} />
                    <Button {...buttons.myOrders} />
                </div>

                <Switch>
                    <Route exact path={`${match.path}`}>
                        <MyGames setActiveScreen={(config)=> SetActiveScreen(config)} />
                    </Route>
                    <Route exact path={'/saved-games'}>
                        <SavedGames setActiveScreen={(config)=> SetActiveScreen(config)} />
                    </Route>
                    <Route exact path={'/my-orders'}>
                        <MyOrders setActiveScreen={(config)=> SetActiveScreen(config)} />
                    </Route>
                </Switch>
            </div>
        </div>
    )
}

const styles = {
    container: {
        // height: '800px',
        padding: "69px 0 0 0",
        backgroundColor: colors.background,
    },
    bannerWrapper: {
        height: '275px',
        // overflow: 'hidden',
        // position: 'relative',
        backgroundImage: `url(${require('../../assets/images/bg-5.png')})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    },
}


export default (HomeScreen)