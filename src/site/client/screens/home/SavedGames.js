import React, { useState, useEffect } from 'react'
import { colors } from '../../../../App.json'
import Button from '../../../../utils/Button'
import { BiCheck, BiUser } from 'react-icons/bi'

import IsDesktop from '../../../../utils/breakpoints/IsDesktop'
import IsTablet from '../../../../utils/breakpoints/IsTablet'
import IsPhone from '../../../../utils/breakpoints/IsPhone'
import GameCard from '../../components/main/GameCard'

function SavedGameScreen(props) {
    const [SavedGames, setSavedGames] = useState([])
    const [ComponentState, setComponentState] = useState({
        activeScreen: {
            name: '',
            path: '/'
        },
        buttons: {
            myGames: {
                text: {
                    color: colors.black,
                    value: "My Games",
                },
                styles: {
                    height: '50px',
                    width: '150px',
                    margin: null,
                    backgroundColor: null,
                    fontSize: '14px',
                    border: {
                        width: null,
                        style: null,
                        color: null,
                        radius: null,
                    },
                    color: colors.white
                },
                onClick: () => setComponentState({
                    ...ComponentState,
                    activeScreen: {
                        name: 'myGames',
                        path: '/'
                    }
                }),
            },
            uploadGame: {
                text: {
                    color: colors.white,
                    value: "UPLOAD",
                },
                styles: {
                    height: '25px',
                    width: '115px',
                    margin: null,
                    backgroundColor: 'green',
                    fontSize: '10px',
                    border: {
                        width: null,
                        style: null,
                        color: null,
                        radius: '12.5px',
                    },
                    color: colors.white
                },
                onClick: () => setComponentState({
                    ...ComponentState,
                    activeScreen: {
                        name: 'myGames',
                        path: '/'
                    }
                }),
            },
            
        }
    })

    const {
        buttons
    } = ComponentState

    useEffect(()=>{
        props.setActiveScreen({
            name: 'savedGames',
            path: '/saved-games'
        })
    }, [])

    const MainContent = (config) => {
        if (SavedGames.length > 0) {
            return (
                <div className="row">
                    {
                        SavedGames.map(game => {
                            return (
                                <GameCard
                                    config={game}
                                />
                            )
                        })
                    }
                </div>
            )
        } else {
            return (
                <div style={{ 
                    margin: config.wrapperMargin,
                    backgroundColor: colors.white,
                    borderRadius: '15px',
    
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <img style={{ margin: '100px 0 0 0' }} src={require('../../../../assets/icons/caution.png')} />
    
                    <div style={{ ...styles.prompt, fontSize: config.promptSize }}>
                        You have not saved any Games
                    </div>
    
    
                    <div style={styles.alertWrapper}>
                        <BiUser />
                        <div style={styles.alert}>
                            Your accout is verified.
                        </div>
                        <BiCheck />
                    </div>
                </div>
            )
        }
        // const 
        
    }

    return (
        <div style={styles.container}>
            <IsDesktop>
                { 
                    MainContent({
                        promptSize: '35px',
                        wrapperMargin: '80px 150px',
                    })
                }
            </IsDesktop>

            <IsTablet>
                { 
                    MainContent({
                        promptSize: '25px',
                        wrapperMargin: '80px 100px',
                    })
                }
            </IsTablet>

            <IsPhone>
                { 
                    MainContent({
                        promptSize: '15px',
                        wrapperMargin: '50px 35px',
                    })
                }
            </IsPhone>  
        </div>
    )
}

const styles = {
    container: {
        padding: '0 0 100px 0'
    },
    prompt: {
        // fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: '36px',
        lineHeight: '42px',
        textAlign: 'center',
        color: colors.grey,
        margin: '50px 0',
    },
    alertWrapper: {
        margin: '50px 0',
        padding: '0 10px',
        height: '51px',
        display: 'flex',
        alignItems: 'center',
        background: '#E8FEE7',
        // backgroundColor: '#4CAF50'
    },
    alert: {
        margin: '50px 0',
        fontSize: '9px',
        padding: '0 10px',
    },
}


export default (SavedGameScreen)