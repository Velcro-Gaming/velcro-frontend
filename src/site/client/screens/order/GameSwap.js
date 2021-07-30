import React, { useState, useEffect } from 'react'
import { colors } from '../../../../App.json'

import {
    useRouteMatch,
    useLocation,
    Redirect
} from 'react-router-dom';

import IsDesktop from '../../../../utils/breakpoints/IsDesktop'
import IsTablet from '../../../../utils/breakpoints/IsTablet'
import IsPhone from '../../../../utils/breakpoints/IsPhone'

import FormField from '../../../../utils/FormField';


export default function GameSwap(props) {
    const [SwapGames, setSwapGames] = useState([])
    const match = useRouteMatch();
    const gameSlug = match.params.gameSlug;
    // console.log("gameSlug: ", gameSlug)
    const { state } = useLocation()
    const {
        setListing,
        setActiveForm,
        orderFormData,
        updateOrderFormData
    } = props
    // console.log("props: ", props)

    useEffect(() => {
        // Set Listing in Parent Component State
        if (state) { setListing(state.listing) }
        // Set Form Meta in Parent Component State
        setActiveForm({
            title: 'swap'
        })

    }, [])

    const GoBackToScratch = () => {
        return <Redirect to={`/search/${gameSlug}`} />
    }

    // Redirect if missing state
    if (!state || !state.game || !state.listing) {
        return GoBackToScratch()
    }

    const {
        game: Game,
        listing: Listing
    } = state

    const MainContent = (config) => {
        const {
            container,
            wrapper,
            gameWrapper
        } = config

        return (
            <div style={{ ...styles.container, padding: container.padding }}>
                <div style={{
                    color: colors.primary,
                    fontWeight: 800,
                    fontSize: '20px',
                    margin: '0 0 30px',
                    textAlign: 'center'
                }}>
                    GAME SWAP
                </div>

                <div style={{ display: "flex", flexDirection: wrapper.flexDirection }}>
                    <div style={{ ...styles.gameWrapper, alignItems: gameWrapper.alignItems, }}>
                        <div style={styles.gameCover}>
                            <img src={Game && Game.image} style={styles.gameCoverImage} />
                        </div>
                        <div style={styles.gameName}>
                            {Game && Game.name}
                        </div>

                        <div style={styles.gameAttrib}>
                            owner: <p style={{ color: colors.grey3, margin: '0 5px' }}>{Listing && Listing.owner.username}</p>
                        </div>

                        <div style={styles.gameAttrib}>
                            console: <p style={{ color: colors.grey3, margin: '0 5px' }}>{Listing && Listing.console.name}</p>
                        </div>
                    </div>


                    <div style={styles.orderInfoWrapper}>
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                {
                                    SwapGames.length > 0 ? (
                                        <div style={styles.gameCover}>
                                            <img src={Game && Game.image} style={styles.gameCoverImage} />
                                        </div>
                                    ) : (
                                        <div style={styles.gameSwapPlaceholder}>
                                            {/* <img src={Game && Game.image} style={styles.gameCoverImage} /> */}
                                        </div>
                                    )
                                }
                            </div>

                            <div style={{ margin: '30px 0' }}>
                                <FormField
                                    formData={orderFormData}
                                    change={(newFormData) => updateOrderFormData({ ...newFormData })}
                                    field={{
                                        id: 'duration',
                                        config: orderFormData.duration
                                    }}
                                />

                                <FormField
                                    formData={orderFormData}
                                    change={(newFormData) => updateOrderFormData({ ...newFormData })}
                                    field={{
                                        id: 'swap_amount',
                                        config: orderFormData.swap_amount
                                    }}
                                />
                            </div>
                        </div>

                        <p style={{ fontFamily: 'Nunito Sans', fontSize: '11px', textAlign: 'center', color: colors.primary }}>
                            Every Order on Velcro Gaming is entitled to a “Grace” Period  (24 Hours) after an order has been completed during which an order can be terminated and after which the order period begins. During this period you are required to use the game to determine its condition. The user is required to test the game initiate a  return if the Item is in poor condition or does not work to satisfaction.
                        </p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            <IsDesktop>
                {
                    MainContent({
                        container: {
                            padding: "50px 100px",
                        },
                        wrapper: {
                            flexDirection: 'row',
                        },
                        gameWrapper: {
                            alignItems: "start"
                        }

                    })
                }
            </IsDesktop>

            <IsTablet>
                {
                    MainContent({
                        container: {
                            padding: "50px 50px",
                        },
                        wrapper: {
                            flexDirection: 'column',
                        },
                        gameWrapper: {
                            alignItems: "center"
                        }

                    })
                }
            </IsTablet>

            <IsPhone>
                {
                    MainContent({
                        container: {
                            padding: "50px 10px",
                        },
                        wrapper: {
                            flexDirection: 'column',
                        },
                        gameWrapper: {
                            alignItems: "center"
                        }

                    })
                }
            </IsPhone>
        </div>
    )
}

const styles = {
    container: {
        backgroundColor: colors.white,
    },
    gameWrapper: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        margin: "0 0 50px"
    },
    gameCover: {
        borderRadius: "14px",
        border: "2px solid #7F3F98",
        width: 'fit-content',
    },
    gameCoverImage: {
        width: "160px",
        height: "200px",
        objectFit: "cover",
        borderRadius: "10px",
        margin: "3px"
    },
    gameName: {
        fontFamily: 'Roboto',
        fontStyle: "normal",
        textTransform: "uppercase",
        fontSize: "20px",
        lineHeight: "32px",
        margin: "10px 0 5px",
    },
    gameAttrib: {
        display: 'flex',
        color: colors.grey,
        fontSize: "14px",
        fontFamily: 'Nunito Sans',
        fontStyle: 'normal',
        fontWeight: 600,
    },
    orderInfoWrapper: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: 'space-between',
        padding: "0 30px"
    },

    gameSwapPlaceholder: {
        borderRadius: "14px",
        border: "2px dashed #7F3F98",
        width: "160px",
        height: "200px",
    }
}
