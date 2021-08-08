import React, { useEffect, useState } from 'react'
import ModalOverlay from '../../../../utils/overlay/ModalOverlay'
import {
    colors,
} from '../../../../App.json'

import Button from '../../../../utils/Button';
import { PostMan } from '../../../../Helpers';
import GameCard from '../../components/main/GameCard'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


function UploadGameModal(props) {
    const{
        auth,
        hideModal,
        swapItems,
        updateSwapItems
    } = props

    const [MyGames, setMyGames] = useState(null)
    const [SwapItems, setSwapItems] = useState(null)

    const [Buttons, setButtons] = useState({
        updateSwapItems: {
            text: {
                color: colors.white,
                value: "Continue",
            },
            styles: {
                height: '50px',
                width: '100%',
                margin: '20px 0',
                backgroundColor: colors.primary,
                border: {
                    width: "1px",
                    style: "solid",
                    color: colors.white,
                    radius: "3px",
                },
                color: colors.white
            },
            onClick: () => { },
            loader: {
                isLoading: false,
                size: 15,
                color: colors.white,
            },
        },
        cancel: {
            text: {
                color: colors.primary,
                value: "cancel",
            },
            styles: {
                height: '30px',
                width: null,
                margin: null,
                backgroundColor: null,
                border: {
                    width: null,
                    style: null,
                    color: null,
                    radius: null,
                },
                color: colors.white
            },
            onClick: () => hideModal(),
            loader: null,
        },
    })

    
    const FetchMyGames = async () => {
        const responseObject = await PostMan(`listing/all/?status=available`, 'GET')
        if (responseObject.status === 'success') {
            let myGames = responseObject.data
            // Save Games to state
            await setMyGames(myGames)
        }
        else { }
    }

    const AttemptUpdateSwapItems = (swap_items) => {
        // Set selected items to order payload
        updateSwapItems(swap_items)
        // Hide modal
        hideModal()
    }

    const ToggleSwapItem = (game) => {
        // let newSwapItems = SwapItems
        let newSwapItems = SwapItems.filter(swap_item => {
            return swap_item.id !== game.id
        })
        if (newSwapItems.length === SwapItems.length) {
            newSwapItems.push(game)
        }
        setSwapItems(newSwapItems)
        return newSwapItems
        
    }

    function isSwapItem(game) {
        let filterset = SwapItems.filter(swap_item => {
            return swap_item.id === game.id
        })
        if (filterset.length > 0) {
            return true
        } else { return false }
    }

    useEffect(() => {
        // Set existing swap items
        setSwapItems(swapItems)

        // Fetch User Games
        FetchMyGames()
    }, [])

    

    return (
        <ModalOverlay>
            <div style={styles.wrapper}>
                <div style={styles.container}>
                    <div style={styles.header} className="text-center">Select Game(s) to Swap</div>

                    <span style={{ display: 'flex', justifyContent: 'flex-end', margin: "0 0 15px"}}>
                        <Button {...Buttons.cancel} />
                    </span>

                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

                        {
                            MyGames && MyGames.length > 0 ? (
                                <>
                                    <div>
                                        Select game(s) to swap:
                                    </div>
                                    <div 
                                        className={"horizontal-scrolling-wrapper"}
                                        style={styles.gameSwapWrapper}
                                    >
                                        <div className={"tray"}>
                                            {
                                                MyGames.map(game => {
                                                    return (
                                                        <div style={{ margin: '20px 5px', maxWidth:'250px' }}>
                                                            <GameCard
                                                                self={game.game}
                                                                listing={game}
                                                                showListingStatus={false}
                                                            >
                                                                <Button {...{
                                                                    text: {
                                                                        color: colors.white,
                                                                        value: isSwapItem(game) ? "Remove" : "Select",
                                                                    },
                                                                    styles: {
                                                                        height: '30px',
                                                                        width: '100%',
                                                                        margin: '10px 0',
                                                                        backgroundColor: isSwapItem(game) ? colors.primary : colors.grey3,
                                                                        border: {
                                                                            width: "1px",
                                                                            style: "solid",
                                                                            color: colors.white,
                                                                            radius: "3px",
                                                                        },
                                                                        color: colors.white
                                                                    },
                                                                    onClick: ()=>ToggleSwapItem(game),
                                                                    loader: null
                                                                }} />
                                                            </GameCard>
                                                        </div>
                                                    )
                                                })
                                            }
                                            
                                        </div>
                                    </div>

                                    <Button
                                        {...Buttons.updateSwapItems}
                                        {...{ onClick: () => AttemptUpdateSwapItems(SwapItems), }}
                                    />
                                </>
                            ) : (
                                <p>
                                    {/* <img src={Game && Game.image} style={styles.gameCoverImage} /> */}
                                    Game swap requires you to have uploaded a game for swap. 
                                    Click the "+ Upload" button to add your available games now.
                                </p>
                            )
                        }
                    </div>
                </div>
            </div>

            <ToastContainer />

        </ModalOverlay>
    )
}


const styles = {
    wrapper: { // Centered Content
        display: "flex",
        justifyContent: "center",
        alignItems: 'center',
        width: "100%",
        height: "100%",
    },

    container: {
        backgroundColor: colors.white,
        width: "450px",
        padding: "20px 30px"
    },
    gameSwapWrapper: {
        borderRadius: "14px",
        // border: "2px dashed #7F3F98",
        // height: "150px",
        width: "auto",
        // maxWidth: "480px",
    },
    header: {
        fontFamily: "Nunito Sans",
        fontStyle: "normal",
        fontWeight: 600,
        fontSize: "17px",
        lineHeight: "24px",
        color: colors.black,
        margin: "20px"
    },
    paragrapgh: {
        fontSize: "14px",
        textAlign: "justify"
    },
}



const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        
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

export default connect(mapStateToProps, mapDispatchToProps)(UploadGameModal)