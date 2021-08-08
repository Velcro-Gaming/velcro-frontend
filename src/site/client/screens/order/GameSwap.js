import React, { useState, useEffect } from 'react'
import { colors } from '../../../../App.json'

import {
    useRouteMatch,
    useLocation,
    Redirect
} from 'react-router-dom';

import SwapIcon from '../../../../assets/icons/swap_icon.png'

import IsDesktop from '../../../../utils/breakpoints/IsDesktop'
import IsTablet from '../../../../utils/breakpoints/IsTablet'
import IsPhone from '../../../../utils/breakpoints/IsPhone'

import Button from '../../../../utils/Button';
import FormField from '../../../../utils/FormField';

import { BiPlusMedical } from 'react-icons/bi'
import ModalSelectMyGames from '../../components/main/ModalSelectMyGames';

import GameCard from '../../components/main/GameCard'


export default function GameSwap(props) {
    const [ShowModalSelectMyGames, setShowModalSelectMyGames] = useState(false)
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

    const SetSwapItems = (games) => {
        let newOrderFormData = orderFormData
        let swap_items = orderFormData.swap_items
        console.log("swap_items: ", swap_items)
        newOrderFormData.swap_items.value = []
        games.map(game => {
            newOrderFormData.swap_items.value.push(game)
        })
        return updateOrderFormData({ ...newOrderFormData })
    }

    const RemoveSwapItem = (game) => {
        let newOrderFormData = orderFormData
        let swap_items = orderFormData.swap_items
        console.log("swap_items: ", swap_items)
        newOrderFormData.swap_items = []
        if (game in swap_items) {
            newOrderFormData.swap_items = swap_items.filter(swap_item => {
                return swap_item.id !== game.id
            })
        }
        return updateOrderFormData({ ...newOrderFormData })
    }

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

        const SwapItems = orderFormData.swap_items.value

        const removeSwapItem = (game) => {
            // let newSwapItems = SwapItems
            let newSwapItems = SwapItems.filter(swap_item => {
                return swap_item.id !== game.id
            })
            SetSwapItems(newSwapItems)
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

                <div style={{ display: "flex", flexDirection: wrapper.flexDirection, margin: "0 0 50px" }}>
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


                    <img src={SwapIcon} style={{
                        height: '50px',
                        // width: '100px',
                        margin: '80px 20px',
                        ...config.swapIcon
                    }} />


                    <div style={styles.orderInfoWrapper}>
                        <div>
                            <div style={{ display: 'flex', ...config.gameSwapWrapper }}>
                                {
                                    SwapItems.length > 0 ? (
                                        <div style={styles.gameSwapWrapper}>
                                            <div className={"horizontal-scrolling-wrapper"}>
                                                <div className={"tray"}>
                                                    <div
                                                        className={"hover-primary"}
                                                        onClick={() => setShowModalSelectMyGames(true)}
                                                        style={styles.gameSwapButton}
                                                    >
                                                        <BiPlusMedical size={20} color={colors.primary} />
                                                    </div>

                                                    {
                                                        SwapItems.map(swap_item => {
                                                            return (
                                                                <div style={{ margin: '5px 3px', maxWidth: '180px' }}>
                                                                    <GameCard
                                                                        self={swap_item.game}
                                                                        listing={swap_item}
                                                                        showListingStatus={false}
                                                                    >
                                                                        <Button {...{
                                                                            text: {
                                                                                color: colors.white,
                                                                                value: isSwapItem(swap_item) ? "Remove" : "Select",
                                                                            },
                                                                            styles: {
                                                                                height: '30px',
                                                                                width: '100%',
                                                                                margin: '10px 0',
                                                                                backgroundColor: isSwapItem(swap_item) ? colors.primary : colors.grey3,
                                                                                border: {
                                                                                    width: "1px",
                                                                                    style: "solid",
                                                                                    color: colors.white,
                                                                                    radius: "3px",
                                                                                },
                                                                                color: colors.white
                                                                            },
                                                                            onClick: () => removeSwapItem(swap_item),
                                                                            loader: null
                                                                        }} />
                                                                    </GameCard>
                                                                </div>
                                                            )
                                                        })
                                                    }

                                                    {/* <img src={Game && Game.image} style={styles.gameCoverImage} /> */}
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div style={styles.gameSwapWrapper}>
                                            <div
                                                className={"hover-primary"}
                                                onClick={() => setShowModalSelectMyGames(true)}
                                                style={styles.gameSwapButton}
                                            >
                                                <BiPlusMedical size={20} color={colors.primary} />
                                            </div>
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
            {
                ShowModalSelectMyGames ? (
                    <ModalSelectMyGames
                        swapItems={orderFormData.swap_items.value}
                        updateSwapItems={(games) => SetSwapItems(games)}
                        hideModal={() => setShowModalSelectMyGames(false)}
                    />
                ) : null
            }

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
                        },
                        gameSwapWrapper: {
                            justifyContent: 'flex-end'
                        },
                        swapIcon: { }
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
                        },
                        gameSwapWrapper: {
                            justifyContent: 'flex-end'
                        },
                        swapIcon: { }
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
                        },
                        gameSwapWrapper: {
                            justifyContent: 'center'
                        },
                        swapIcon: {
                            alignSelf: 'center',
                            transform: "rotate(90deg)",
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
        margin: "5px"
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

    gameSwapWrapper: {
        borderRadius: "14px",
        border: "2px dashed #7F3F98",
        minHeight: "200px",
        minWidth: "160px",
        maxWidth: "480px",
        padding: "5px",
    },
    gameSwapButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.grey2,
        width: "160px",
        minHeight: "200px",
        borderRadius: "10px",
        margin: "5px 3px"
    }
}
