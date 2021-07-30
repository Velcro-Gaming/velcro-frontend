import React, { useState } from 'react'
import {
    Switch,
    Route,
    useRouteMatch,
    Redirect
} from "react-router-dom";
import { colors } from '../../../App.json'
import Button from '../../../utils/Button'

import IsDesktop from '../../../utils/breakpoints/IsDesktop'
import IsTablet from '../../../utils/breakpoints/IsTablet'
import IsPhone from '../../../utils/breakpoints/IsPhone'

import MyGames from './home/MyGames'
import SavedGames from './home/SavedGames';
import MyOrders from './home/MyOrders';

import { IoIosCart, IoLogoGameControllerB, IoMdHeart } from 'react-icons/io'


function HomeScreen() {
    const [redirect, setRedirect] = useState(null)
    const [ActiveScreen, setActiveScreen] = useState({
        name: 'myGames',
        path: '/'
    })
    const [Buttons, setButtons] = useState({
        myGames: {
            text: {
                color: colors.grey,
                value: <div><IoLogoGameControllerB style={{ margin: '0 2px 0 0' }} /> MY GAMES</div>
            },
            styles: {
                height: '50px',
                width: '130px',
                margin: '0 5px',
                backgroundColor: null,
                fontSize: '10px',
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
                width: '130px',
                margin: '0 5px',
                backgroundColor: null,
                fontSize: '10px',
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
                width: '130px',
                margin: '0 5px',
                backgroundColor: null,
                fontSize: '10px',
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
    })
    
    // const [ComponentState, setComponentState] = useState({
    //     redirect: null,
    //     activeScreen: {
    //         name: 'myGames',
    //         path: '/'
    //     },
    //     buttons: {
    //         myGames: {
    //             text: {
    //                 color: colors.grey,
    //                 value: <div><IoLogoGameControllerB style={{ margin: '0 2px 0 0' }} /> MY GAMES</div>
    //             },
    //             styles: {
    //                 height: '50px',
    //                 width: '130px',
    //                 margin: '0 5px',
    //                 backgroundColor: null,
    //                 fontSize: '10px',
    //                 border: {
    //                     width: null,
    //                     style: null,
    //                     color: null,
    //                     radius: null,
    //                 },
    //                 color: colors.white
    //             },
    //             linkTo: '/'
    //         },
    //         savedGames: {
    //             text: {
    //                 color: colors.grey,
    //                 value: <div><IoMdHeart style={{ margin: '0 2px 0 0' }} /> SAVED GAMES</div>
    //             },
    //             styles: {
    //                 height: '50px',
    //                 width: '130px',
    //                 margin: '0 5px',
    //                 backgroundColor: null,
    //                 fontSize: '10px',
    //                 border: {
    //                     width: null,
    //                     style: null,
    //                     color: null,
    //                     radius: null,
    //                 },
    //                 color: colors.white
    //             },
    //             linkTo: '/saved-games'
    //         },
    //         myOrders: {
    //             text: {
    //                 color: colors.grey,
    //                 value: <div><IoIosCart style={{ margin: '0 2px 0 0' }} /> MY ORDERS</div>
    //             },
    //             styles: {
    //                 height: '50px',
    //                 width: '130px',
    //                 margin: '0 5px',
    //                 backgroundColor: null,
    //                 fontSize: '10px',
    //                 border: {
    //                     width: null,
    //                     style: null,
    //                     color: null,
    //                     radius: null,
    //                 },
    //                 color: colors.white
    //             },
    //             linkTo: '/my-orders'
    //         },
    //     },
    // })

    const match = useRouteMatch()

    // const {
    //     activeScreen,
    //     buttons,
    //     redirect
    // } = ComponentState

    console.log(`${match.path}/saved-games`)

    if (redirect) {
        return <Redirect to={redirect} />
    }

    const SetActiveScreen = (config, screenSize='mobile') => {
        console.log(Buttons[config.name])
        
        let newButtonState = Buttons
        for (let btn in newButtonState) {
            let buttonConfig = newButtonState[btn]
            if (btn === config.name) {
                buttonConfig.text.color = colors.primary
            } else {
                buttonConfig.text.color = colors.grey
            }
        }

        //
        setActiveScreen(config)
        //
        setButtons({ ...newButtonState })
    }

    console.log("ActiveScreen: ", ActiveScreen)

    const MainContent = (config) => {
        return (
            <div style={styles.container}>
                <div className="container">
                    <div style={styles.bannerWrapper} />

                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '35px 0 20px 0' }}>
                        <div style={{ height: '4px', width: '21px', backgroundColor: ActiveScreen.name === 'myGames' ? colors.primary : colors.grey, margin: '0 5px' }} />
                        <div style={{ height: '4px', width: '21px', backgroundColor: ActiveScreen.name === 'savedGames' ? colors.primary : colors.grey, margin: '0 5px' }} />
                        <div style={{ height: '4px', width: '21px', backgroundColor: ActiveScreen.name === 'myOrders' ? colors.primary : colors.grey, margin: '0 5px' }} />
                    </div>

                    <div style={{ display: 'flex', flexFlow: 'row noWrap', justifyContent: 'center', alignItems: 'center', backgroundColor: colors.white, margin: '20px 0' }}>
                        <Button {...Buttons.myGames}  {...{
                            styles: {
                                height: '50px',
                                width: config.navButton.width,
                                margin: config.navButton.margin,
                                backgroundColor: null,
                                fontSize: config.navButton.fontSize,
                                border: {
                                    width: null,
                                    style: null,
                                    color: null,
                                    radius: null,
                                },
                                color: colors.white
                            },
                        }} />

                        <Button {...Buttons.savedGames}  {...{
                            styles: {
                                height: '50px',
                                width: config.navButton.width,
                                margin: config.navButton.margin,
                                backgroundColor: null,
                                fontSize: config.navButton.fontSize,
                                border: {
                                    width: null,
                                    style: null,
                                    color: null,
                                    radius: null,
                                },
                                color: colors.white
                            },
                        }} />
                        
                        <Button {...Buttons.myOrders}  {...{
                            styles: {
                                height: '50px',
                                width: config.navButton.width,
                                margin: config.navButton.margin,
                                backgroundColor: null,
                                fontSize: config.navButton.fontSize,
                                border: {
                                    width: null,
                                    style: null,
                                    color: null,
                                    radius: null,
                                },
                                color: colors.white
                            },
                        }} />
                    </div>

                    <Switch>
                        <Route exact path={`${match.path}`}>
                            <MyGames setActiveScreen={(config) => SetActiveScreen(config)} />
                        </Route>
                        <Route exact path={'/saved-games'}>
                            <SavedGames setActiveScreen={(config) => SetActiveScreen(config)} />
                        </Route>
                        <Route exact path={'/my-orders'}>
                            <MyOrders setActiveScreen={(config) => SetActiveScreen(config)} />
                        </Route>
                    </Switch>
                </div>
            </div>
        )
    }

    return (
        <div>
            <IsDesktop>
                {
                    MainContent({
                        navButton: {
                            width: "140px",
                            fontSize: "12px",
                            margin: "0 5px"
                        },
                    })
                }
            </IsDesktop>

            <IsTablet>
                {
                    MainContent({
                        navButton: {
                            width: "130px",
                            fontSize: "10px",
                            margin: "0 5px"
                        },
                    })
                }
            </IsTablet>

            <IsPhone>
                {
                    MainContent({
                        navButton: {
                            width: "115px",
                            fontSize: "9px",
                            margin: "0"
                        },
                    })
                }
            </IsPhone>
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
        backgroundImage: `url(${require('../../../assets/images/bg-5.png')})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    },
}


export default (HomeScreen)