import React, { useState, useEffect } from 'react'
import { colors } from '../../App.json'
import Button from '../../components/utils/Button'
import { BiCheck, BiUser } from 'react-icons/bi'

import IsDesktop from '../../components/utils/breakpoints/IsDesktop'
import IsTablet from '../../components/utils/breakpoints/IsTablet'
import IsPhone from '../../components/utils/breakpoints/IsPhone'
import GameCard from '../../components/main/GameCard'
import UploadGameModal from '../../components/main/UploadGameModal'
import { PostMan } from '../../Helpers'

function MyGamesScreen(props) {
    const [ShowUploadGameModal, setShowUploadGameModal] = useState(false)
    const [MyGames, setMyGames] = useState([
        // {
        //     name: "Fifa 20",
        //     numberOfOrders: 2,
        //     amountEarned: 20000,
        //     imageUrl: null,
        //     status: "swapped"
        // },
        // {
        //     name: "GTA V",
        //     numberOfOrders: 2,
        //     amountEarned: 20000,
        //     imageUrl: null,
        //     status: "rented"
        // },
        // {
        //     name: "Call of duty Modern Warfare",
        //     numberOfOrders: 2,
        //     amountEarned: 20000,
        //     imageUrl: null,
        //     status: "available"
        // },
    ])
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
                onClick: () => setShowUploadGameModal(true),
            },
            
        }
    })

    const {
        buttons
    } = ComponentState

    const FetchMyGames = async () => {
        const responseObject = await PostMan(`/myGames`, 'GET')
        if (responseObject.status === 'success') {
            let responseData = responseObject.data
            let myGames = responseData.data
            // Save Games to state
            await setMyGames(myGames)
        }
        else { }
    }

    useEffect(()=>{
        // Set Active screen
        props.setActiveScreen({
            name: 'myGames',
            path: '/'
        })

        // Fetch User Games
        FetchMyGames()
    }, [])

    const MainContent = (config) => {        
        if (MyGames.length > 0) {
            return (
                <div className="row">
                    {/* { gameArray } */}
                    {
                        MyGames.map(game => {
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
                    <img style={{ margin: '100px 0 0 0' }} src={require('../../assets/icons/caution.png')} />
    
                    <div style={{ ...styles.prompt, fontSize: config.promptSize }}>
                        You have not Uploaded any Games
                    </div>
    
                    <Button {...buttons.uploadGame} />
    
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

            {
                ShowUploadGameModal? (
                    <UploadGameModal hideModal={() => setShowUploadGameModal(false)} />
                ) : null
            }
            
        </div>
    )
}

const styles = {
    container: {
        padding: '0 0 100px 0',
        position: "relative",
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


export default (MyGamesScreen)